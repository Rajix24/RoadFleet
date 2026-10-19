const express = require('express')
const router = express.Router()
const multer = require("multer")
const fileController = require("../controllers/file.controller")


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5* 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, cb)=>{
        const allowedTypes =[
            'image/jpeg',
            'image/png',
            'application/pdf'
        ]
        if(!allowedTypes.includes(file.mimetype)){
            return cb(
                new Error("only JPEG, PNG, and PDF files are allowed")
            )
        }
        cb(null, true)
    }
})


router.post('/upload', upload.single('file'), fileController.uploadFile)


router.get("/:key/url", fileController.getFile);

    
router.delete("/:key", async (req, res, next) => {
  try {
    await deleteFile(req.params.key);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    next(error);
  }
});


module.exports = router 