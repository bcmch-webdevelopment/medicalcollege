const express = require('express');
const router = express.Router();
const { getFacilities, createFacility, updateFacility, deleteFacility } = require('../controllers/facilityController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getFacilities)
  .post(protect, admin, createFacility);

router.route('/:id')
  .put(protect, admin, updateFacility)
  .delete(protect, admin, deleteFacility);

module.exports = router;
