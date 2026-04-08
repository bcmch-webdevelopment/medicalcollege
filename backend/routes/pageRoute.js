const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  getPagesBySection,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage
} = require('../controllers/pageController');

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

router.get('/:section', getPagesBySection);
router.get('/:section/:slug', getPageBySlug);
router.post('/:section', upload.single('image'), createPage);
router.put('/:section/:id', upload.single('image'), updatePage);
router.delete('/:section/:id', deletePage);

module.exports = router;

