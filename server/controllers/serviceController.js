const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status === 'all') {
      // Admin view
    } else {
      query.status = 'active';
    }

    const services = await Service.find(query).sort({ createdAt: 1 }).lean();
    return res.status(200).json({ success: true, count: services.length, services });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private (Admin)
const createService = async (req, res) => {
  try {
    const { title, description, icon, features, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const service = new Service({ title, description, icon, features, status });
    await service.save();

    return res.status(201).json({ success: true, message: 'Service created successfully', service });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
const updateService = async (req, res) => {
  try {
    const { title, description, icon, features, status } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    if (title) service.title = title;
    if (description) service.description = description;
    if (icon) service.icon = icon;
    if (features) service.features = features;
    if (status) service.status = status;

    await service.save();
    return res.status(200).json({ success: true, message: 'Service updated successfully', service });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    await Service.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};
