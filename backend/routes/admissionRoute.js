const express = require('express');
const router = express.Router();

const {
  getAdmissions,
  getAdmissionBySlug,
  createAdmission,
  updateAdmission,
  deleteAdmission,
  addStudentList,
  getStudentLists,
  getStudentListsByYear,
  updateStudentList,
  deleteStudentList
} = require('../controllers/admissionController');

router.get('/', getAdmissions);
router.post('/', createAdmission);

// Student list routes MUST be before /:slug to prevent slug collision
router.get('/student-list', getStudentLists);
router.post('/student-list', addStudentList); // The prompt specified POST /admissions/student-list
router.get('/student-list/:year', getStudentListsByYear);
router.put('/student-list/:id', updateStudentList);
router.delete('/student-list/:id', deleteStudentList);

router.get('/:slug', getAdmissionBySlug);
router.put('/:id', updateAdmission);
router.delete('/:id', deleteAdmission);

module.exports = router;
