const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedData = require('./utils/seed');

// Routes imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    app: 'Lucky Communication API',
    time: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/admin', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/services', serviceRoutes);

const path = require('path');
const fs = require('fs');

// Serve static frontend build files if dist folder exists
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}

// SPA Catch-All Route: Fallback all non-API GET requests to index.html to prevent 404 on refresh / desktop view
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.json({
    message: 'Lucky Communication CCTV API is running',
    status: 'success'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Express Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const { execSync } = require('child_process');

const PORT = process.env.PORT || 5000;

// Auto-free port on local development to prevent EADDRINUSE crashes
const freePortIfInUse = (port) => {
  if (process.env.NODE_ENV === 'production') return;
  try {
    if (process.platform === 'win32') {
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      const lines = output.trim().split('\n');
      for (const line of lines) {
        if (line.includes('LISTENING')) {
          const parts = line.trim().split(/\s+/);
          const pid = Number(parts[parts.length - 1]);
          if (pid && pid !== process.pid && pid > 0) {
            try {
              execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
              console.log(`⚡ Released port ${port} from previous process PID ${pid}`);
            } catch (e) {}
          }
        }
      }
    }
  } catch (e) {
    // Port not in use, continue cleanly
  }
};

const startServer = async () => {
  try {
    freePortIfInUse(PORT);
    await connectDB();
    await seedData();
    
    const server = app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 Lucky Communication Server running on port ${PORT}`);
      console.log(`👉 API Base: http://localhost:${PORT}/api`);
      console.log(`=======================================================`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${PORT} is busy, releasing and retrying...`);
        freePortIfInUse(PORT);
        setTimeout(() => {
          server.close();
          server.listen(PORT);
        }, 1200);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
