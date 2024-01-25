const db = require("../../Model/AdminModel/CreateDoctorModel");
const validator = require('validator');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const postdata = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            designation,
            degrees,
            department,
            specialist,
            doctorExperience,
            servicePlace,
            birthDate,
            phoneNo,
            gender,
            bloodGroup,
            address,
            aboutMe,

        } = req.body;
        if (!name || !email || !password || !designation || !degrees || !department || !specialist || !doctorExperience || !servicePlace || !birthDate || !phoneNo || !gender || !bloodGroup || !address || !aboutMe) {
            return res.status(400).json("Message : All fields are required");
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }


        const existdata = await db.findOne({ email });
        if (existdata) {
            return res.status(400).json("Message: This Email AllReady Exist")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const img = req.uploadedImageUrl
        const findalldata = await db.create(
            {
                name,
                email,
                password: hashedPassword,
                designation,
                degrees,
                department,
                specialist,
                doctorExperience,
                servicePlace,
                birthDate,
                phoneNo,
                gender,
                bloodGroup,
                address,
                aboutMe,
                picture: img,
            }
        );
        res.status(200).json(findalldata);
    } catch (error) {
        res.status(500).json(error)
    }
};

const getDoctor = async (req, res) => {
    try {
        const findalldata = await db.find();
        res.status(200).json({
            success: true,
            findalldata,
            message: "Get All Doctor Data",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const getsingle = async (req, res) => {
    try {
        const findsingle = await db.findOne({ _id: req.params.id })
        res.status(200).json({
            success: true,
            findsingle,
            message: "Get single employees data"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


const deleteone = async (req, res) => {
    try {
        await db.deleteOne({ _id: req.params.id })
        res.status(200).json({
            success: true,
            message: "Delete Doctor success"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const update = async (req, res) => {
    try {
        const {
            name,
            providesServices,
            phone,
            email,
            employmentStatus,
            priceLeave,
            duties,
            shortDescription
        } = req.body;

        if (!name || !providesServices || !phone || !email) {
            res.json(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const updateemployee = await db.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name,
                    providesServices,
                    phone,
                    email,
                    employmentStatus,
                    priceLeave,
                    duties,
                    shortDescription
                },
            },
            { new: true }
        );

        if (!updateemployee) {
            res.status(400).json({
                success: false,
                message: "employee not found for update"
            })
        }

        res.status(200).json({
            success: true,
            updateemployee,
            message: "employee update successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    postdata,
    getDoctor,
    getsingle,
    deleteone,
    update
}