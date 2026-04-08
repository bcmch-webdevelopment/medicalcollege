const express = require('express');
const router = express.Router();
const {
  getAllAcademics,
  getAcademicBySlug,
  createAcademic,
  updateAcademic,
  deleteAcademic
} = require('../controllers/academicController');

router.get('/', getAllAcademics);
router.get('/slug/:slug', getAcademicBySlug);

router.post('/', createAcademic);
router.put('/:id', updateAcademic);
router.delete('/:id', deleteAcademic);

module.exports = router;
