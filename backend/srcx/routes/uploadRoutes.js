const express =require('express');
const path =require('path');
const multer = require('multer');
const router = express.Router();

var storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
       /* cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`)*/
       cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});
/*
function checkFileType(file, cb){
    const filetypes =/jpg|jpeg|png|mp3|mp4/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const minetype = filetypes.test(file.mimetype)

    if(extname && minetype){
        return cb(null, true)
    }
    else {
        cb('Invalid file format')
    }
}
*/
const upload = multer({
    storage, 
   /* fileFilter : function(req, file, cb){
        checkFileType(file, cb) */
    //}
})


router.post('/uploads', upload.single('filename'), (req, res)=>{
    res.send(`/${req.file.path}`)
})

module.exports = router