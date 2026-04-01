const express = require('express');
const router = express.Router();
const {
  getAllAboutUs,
  getAboutUsBySlug,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs
} = require('../controllers/aboutUsController');

// We are assuming auth token is simply passed or there is no strict middleware in place for now
// based on the provided ManageFacilities example which doesn't explicitly use an authMiddleware here,
// but rather checks `Bearer ${token}` on the frontend.
// If there's an authMiddleware, it should be imported here (e.g., const auth = require('../middleware/auth')).

router.get('/', getAllAboutUs);
router.get('/slug/:slug', getAboutUsBySlug);

router.post('/', createAboutUs);
router.put('/:id', updateAboutUs);
router.delete('/:id', deleteAboutUs);

module.exports = router;
