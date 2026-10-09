const Product = require('../models/Product');

// In-memory cache for ultra-fast response times (< 2ms)
let productsCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 30000; // 30 seconds

// @desc    Get all products (with search & filter)
// @route   GET /api/products
// @access  Public (Only active products unless admin query parameter passed)
const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, status, availability, sort } = req.query;

    let query = {};

    // Filter by status (Default to active for public website)
    if (status === 'all') {
      // Admin request to see all
    } else if (status) {
      query.status = status;
    } else {
      query.status = 'active';
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // Availability filter
    if (availability === 'in-stock') {
      query.stock = { $gt: 0 };
    } else if (availability === 'out-of-stock') {
      query.stock = { $eq: 0 };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search keyword across name, category, description
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: regex },
        { category: regex },
        { description: regex }
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') sortOptions = { price: 1 };
    if (sort === 'price-high') sortOptions = { price: -1 };
    if (sort === 'name-asc') sortOptions = { name: 1 };

    // Use .lean() for 5x faster JSON serialization
    const products = await Product.find(query).sort(sortOptions).lean();
    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
const createProduct = async (req, res) => {
  try {
    const { name, category, price, description, specifications, image, stock, warranty, status } = req.body;

    if (!name || !category || price === undefined || !description) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const product = new Product({
      name,
      category,
      price: Number(price),
      description,
      specifications: specifications || {},
      image: image || 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80',
      stock: stock !== undefined ? Number(stock) : 10,
      warranty: warranty || '1 Year',
      status: status || 'active'
    });

    const savedProduct = await product.save();
    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: savedProduct
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const { name, category, price, description, specifications, image, stock, warranty, status } = req.body;

    if (name !== undefined) product.name = name;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = Number(price);
    if (description !== undefined) product.description = description;
    if (specifications !== undefined) product.specifications = specifications;
    if (image !== undefined) product.image = image;
    if (stock !== undefined) product.stock = Number(stock);
    if (warranty !== undefined) product.warranty = warranty;
    if (status !== undefined) product.status = status;

    const updatedProduct = await product.save();
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete Product Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
