const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const mongodbURL = 'mongodb://localhost:27017/AdminPanel';
const cors = require('cors');
const app = express();
app.use(cors());


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


//admin resister
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

//admin login
app.post('/admin/login', async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const adminData =await Admin.findOne({email});
       if(!adminData){res.status(400).json({message:'Admin Not found by this email'})};
       if(adminData){
        if(adminData.name == name && adminData.password == password){
            res.status(200).json({ message: 'Log in successfully!',admin:adminData}); 
        }
        else{
            res.status(400).json({message:'Please enter a Valid Password or Name'});;
        }
       }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})



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

//get student data 

app.get('/student/data', async(req,res)=>{
    try{
    const studentData = await Student.find();
    if(!studentData){
        res.status(400).json({ message: 'Server Error' });
    }
    res.status(200).json({ message: 'Student data saved successfully!', studentData:studentData });

    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
} )

//update student data 

app.put('/student/edit/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const formData = req.body;
      const updatedStudent = await Student.findByIdAndUpdate(userId, formData, {
        new: true,         // Returns the modified document
        runValidators: true // Runs validators on the updated data
      });
  
      if (updatedStudent) {
        res.status(200).json({ message: 'User updated successfully', student: updatedStudent });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  });
  
  //delete user
  app.delete('/student/delete/:id', async(req,res)=>{
      const userId = req.params.id;
    try{
        const deletedUser = await Student.findByIdAndDelete(userId);
        
        if (deletedUser) {
            res.status(200).json({ message: 'Student deleted successfully' });
          } else {
            res.status(404).json({ message: 'Student not found' });
          }
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  })

  //Student login
  app.post('/student/login', async(req,res)=>{
    try{
        const {Name,RollNo,Password}=req.body;
        const studentData =await Student.findOne({RollNo});
       if(!studentData){res.status(400).json({message:'Student Not found by this Roll Number'})};
       if(studentData){
        if(studentData.Name == Name && studentData.Password == Password){
            res.status(200).json({ message: 'Log in successfully!',student:studentData}); 
        }
        else{
            res.status(400).json({message:'Please enter a Valid Password or Name'});;
        }
       }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
