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

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', getAllAboutUs);
router.get('/slug/:slug', getAboutUsBySlug);

router.post('/', upload.single('image'), createAboutUs);
router.put('/:id', upload.single('image'), updateAboutUs);

module.exports = router;
