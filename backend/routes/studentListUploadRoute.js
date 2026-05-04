const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

const {
  uploadStudentList,
  getStudentLists,
  getStudentListById,
  updateStudentList,
  deleteStudentList
} = require('../controllers/studentListUploadController');

// We use typical REST setup
router.get('/', getStudentLists);
router.get('/:id', getStudentListById);

router.post('/', protect, admin, upload.single('file'), uploadStudentList);
router.put('/:id', protect, admin, upload.single('file'), updateStudentList); // Added file support for updates too
router.delete('/:id', protect, admin, deleteStudentList);

module.exports = router;
