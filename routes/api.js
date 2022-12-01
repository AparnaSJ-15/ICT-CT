const express = require('express')
const { findById } = require('../models/response')
const router = express.Router()
const DATA = require('../models/response')
const {upload} =require('../middlewares/upload')


// full list read
router.get('/listresponse', async (req, res) => {

    try{
        const files = await DATA.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }

})

// add

router.post('/addresponse',upload.single('file'), async (req, res) => {
    try{
        
        const file = new DATA({
            name: req.body.name,
            area: req.body.area,
            ic: req.body.ic,
            category:req.body.category,
            hour:req.body.hour,
            ref:req.file.originalname
            // fileName: req.file.originalname,
            // filePath: req.file.path,
            // fileType: req.file.mimetype,
            // fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
})

module.exports = router