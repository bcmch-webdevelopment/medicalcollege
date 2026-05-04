const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  getNewsEvents,
  getNewsEventBySlug,
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent
} = require('../controllers/newsEventController');

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

const cpUpload = upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 10 }]);

router.get('/', getNewsEvents);
router.get('/:slug', getNewsEventBySlug);
router.post('/', cpUpload, createNewsEvent);
router.put('/:id', cpUpload, updateNewsEvent);
router.delete('/:id', deleteNewsEvent);

module.exports = router;
