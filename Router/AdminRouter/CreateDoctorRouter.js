const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage})
const uploadedcloudinaryImages = require('../../Middlewares/singleImgUpload')
const
    {
        postdata,
        getDoctor,
        getsingle,
        deleteone,
        update
    } = require("../../Controller/AdminController/CreateDoctorController");

const router = express.Router();

router.post('/', upload.single("picture"), uploadedcloudinaryImages, postdata);

router.get('/', getDoctor);

router.get('/:id', getsingle);

router.delete('/:id', deleteone);

router.put('/:id', update);


module.exports = router;


