const express = require('express');
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getServices)
  .post(protectAdmin, createService);

router.route('/:id')
  .put(protectAdmin, updateService)
  .delete(protectAdmin, deleteService);

module.exports = router;
