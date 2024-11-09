const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const mongodbURL = 'mongodb://localhost:27017/AdminPanel';
const app = express();

app.use(bodyParser.json());

mongoose.connect(mongodbURL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(`Problem connecting to DB: ${err}`));

// Create Admin Schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const Admin = mongoose.model('Admin', adminSchema);

app.post('/admin/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newAdmin = new Admin({ name, email, password });
        await newAdmin.save();
        res.status(200).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create Student Schema
const studentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    FatherName: {
        type: String,
        required: true
    },
    RollNo: {
        type: Number,
        required: true,
        unique: true,
    },
    Class: {
        type: Number,
        required: true
    },
    MobileNo: {
        type: Number,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    marks: [
        {
            subject: String,
            score: Number
        }
    ],
    EnrollNo: {
        type: Number,
        required: true
    },
    EnrollmentDate: {
        type: Date,
        default: Date.now
    },
    Admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required:true
    }
});

const Student = mongoose.model('Student', studentSchema);

app.post('/admin/student/register', async (req, res) => {
    try {
        const { Name, FatherName, RollNo, Class, MobileNo, Password, gender, marks, EnrollNo, EnrollmentDate, Admin } = req.body;
        const newStudent = new Student({ Name, FatherName, RollNo, Class, MobileNo, Password, gender, marks, EnrollNo, EnrollmentDate, Admin });
        await newStudent.save();
        res.status(200).json({ message: 'Student data saved successfully!', newStudent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
