const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const uploadImage = require('../middleware/imageUploadMiddleware');

const {
  getAllDepartments,
  getDepartmentBySlug,
  getDepartmentByIdAdmin,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');

// Public routes
router.get('/', getAllDepartments);
router.get('/slug/:slug', getDepartmentBySlug);

// Admin routes
router.get('/admin/:id', protect, getDepartmentByIdAdmin);
router.post('/', protect, uploadImage.single('image'), createDepartment);
router.put('/:id', protect, uploadImage.single('image'), updateDepartment);
router.delete('/:id', protect, deleteDepartment);

module.exports = router;
