const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const mongodbURL = 'mongodb://localhost:27017/AdminPanel';
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(cors());

//create 'uploads' dr if it dosn't exist

const uploadDir= path.join(__dirname,'uploads');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});
}

app.use('/uploads',express.static(uploadDir));



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
    Email:{
        type:String
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
        const studentData = req.body;
        const newStudent = new Student(studentData);
        if(!newStudent){
            res.status(400).json({message:'Please fill all field'})
        }
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
        const {Email,RollNo,Password}=req.body;
        const studentData =await Student.findOne({RollNo});
       if(!studentData){res.status(400).json({message:'Student Not found by this Roll Number'})};
       if(studentData){
        if(studentData.Email == Email && studentData.Password == Password){
            res.status(200).json({ message: 'Log in successfully!',student:studentData}); 
        }
        else{
            res.status(400).json({message:'Please enter a Valid Password or Email'});;
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



///teacher schema

const teacherSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfJoining: {
      type: String,
      default: Date.now,
    },
    salary: {
      type: Number,
      required: true,
    },
    classesAssigned: {
      type: [String], // Array of class names or IDs
      required: true,
    },
  });

  const teacherData = mongoose.model('teacherData',teacherSchema)

  // post api
  app.post('/teacher/register',async(req,res)=>{
    try{
        const student=req.body;
        const newTeacher=new teacherData(
            student
            )

        await newTeacher.save();
        res.status(200).json({message:"Data inserted successfull ",teacherData:newTeacher});
    }catch(err){
        res.status(400).json(err.message)
    }
  
  })

app.get('/teacher/get',async(req,res)=>{
    try{
        const teacher = await teacherData.find();
        if(!teacherData){
            res.status(400).json({message:'Please inter a valid data!'});
        }
        res.status(200).json({message:'data get successfull !',teacherData:teacher});
    }
    catch(err){
        res.status(500).json(err);
    }
})


//consfigure multer
const storage = multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'uploads/'); //save image on dir.
    },
    filename:(req,file,cd)=>{
        cd(null,Date.now()+'_'+file.originalname);
    }
})
const upload=multer({storage:storage});
//Product part i start
// product schema
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
});

const product = mongoose.model('product',ProductSchema);

//product with image upload
app.post('/api/products',upload.single('image'),async(req,res)=>{
    try{
    const {name,price,description}=req.body;
    const imagepath = req.file ? req.file.path:"Image";
    //instance
    const newProduct = new product({
        name,
        price,
        description,
        image:imagepath,
    });
    //product save in database
    const SavedProduct = await newProduct.save();
    res.status(201).json({message:'product save successfully', Product:SavedProduct});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Failed to save product'});
    }
})
app.use('/uploads',express.static(uploadDir));

//product data fetch 

app.get('/api/get', async(req,res)=>{
    try{
 const productsData = await product.find();
 if(!productsData){
    res.status(400).json({message:'products Not found'})
 }
 res.status(201).json({message:'data fetch successfull',productsData:productsData});
    }
    catch(error){
 res.status(500).json({message:'bad request',error})
    }
})