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

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Express Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedData();
    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 Lucky Communication Server running on port ${PORT}`);
      console.log(`👉 API Base: http://localhost:${PORT}/api`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
