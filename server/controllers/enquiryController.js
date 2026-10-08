const Enquiry = require('../models/Enquiry');
const { sendAdminEmailNotification } = require('../utils/notifier');

// @desc    Submit new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, product, message } = req.body;

    if (!name || !phone || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required enquiry fields' });
    }

    const enquiry = new Enquiry({
      name,
      phone,
      email,
      product: product || 'General Enquiry',
      message,
      status: 'new'
    });

    const savedEnquiry = await enquiry.save();
    
    // Trigger Admin Email Notification to admin@luckycommunication.com / luckycommunication@gmail.com
    sendAdminEmailNotification({ name, phone, email, product, message });

    // Generate Admin WhatsApp & SMS alert links targeting 8220915902
    const adminPhone = process.env.ADMIN_PHONE || '9876543210';
    const notifyText = encodeURIComponent(
      `🚨 *NEW CUSTOMER ENQUIRY ALERT*\n\n` +
      `👤 *Customer Name:* ${name}\n` +
      `📞 *Phone Number:* ${phone}\n` +
      `✉️ *Email:* ${email}\n` +
      `📦 *Product/Service:* ${product || 'General Enquiry'}\n` +
      `💬 *Message:* ${message}`
    );
    const whatsappNotifyUrl = `https://wa.me/91${adminPhone}?text=${notifyText}`;
    const smsNotifyUrl = `sms:91${adminPhone}?body=${notifyText}`;

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our team will contact you shortly.',
      enquiry: savedEnquiry,
      whatsappNotifyUrl,
      smsNotifyUrl
    });
  } catch (error) {
    console.error('Create Enquiry Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
const getEnquiries = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private (Admin)
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    enquiry.status = status;
    await enquiry.save();

    return res.status(200).json({
      success: true,
      message: 'Enquiry status updated successfully',
      enquiry
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    await Enquiry.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
};
