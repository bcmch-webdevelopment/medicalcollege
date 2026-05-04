const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/student-lists');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf|xlsx|xls|csv|doc|docx/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = file.mimetype;

  // Additional mime checks depending on specific word/excel formats. 
  // Let's rely primarily on extname for robust office documents handling, but allow some basic mimetypes
  const mimeRegex = /(pdf|msexcel|msword|officedocument|csv|sheet|presentation|document)/i;
  
  if (extname || mimeRegex.test(mimetype)) {
    return cb(null, true);
  } else {
    cb('Error: Only Documents (PDF, Excel, Word, CSV) are allowed!');
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB Limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
