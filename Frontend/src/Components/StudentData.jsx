import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextInput } from 'flowbite-react';
import StudentModal from './StudentModel';
import StudentEdit from './StudentEdit';
import Swal from 'sweetalert2';
import { Input } from '@headlessui/react';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';

const StudentData = ({student}) => {


// Student Edit
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEdit = (student) => {
    setSelectedStudent(student); 
  };





  // save api and handle model
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSave = (studentData) => {
        console.log('Saved Student Data:', studentData);
        // Handle the save operation, like sending data to an API or updating a state
      };
    
  const [students, setStudents] = useState([]);

  const setModalFunction = ()=>{
    setModal(true);
  }


  // Fetch data from the API 
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/student/data`); 
      setStudents(response.data.studentData); 
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };
  useEffect(() => {

    fetchStudents();
  }, []);


//student delete
const handleDelete= async(student)=>{
  console.log(student._id);
  const id = student._id;
  const apiKey =`${import.meta.env.VITE_BACKEND_URL}/student/delete/${id}`;
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'error',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then(async(response)=>{
    if(response.isConfirmed){
      try{
        const response = await axios.delete(apiKey);
        Swal.fire({
          title: 'Success!',
          text: `You have delete ${student.Name}  successfully!`,
          icon: 'success',
          confirmButtonText: 'OK'
      });
      fetchStudents();
      }
      catch (err) {
        Swal.fire({
            title: 'Error!',
            text: err.response.data.message || 'Login failed',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
      }
    }
  })


}

//search



const [searchText,SetSearchText] = useState('')
const [studentfilter , SetStudentfilter]=useState([])

useEffect(()=>{
  SetStudentfilter(students);
},[students])
const handleSearch =(e)=>{
SetSearchText(e.target.value);
console.log(searchText);
if(searchText){
const filterData = students.filter(item=>(item.Name.toLowerCase().includes(searchText.toLowerCase())) ||(item.RollNo.toString().toLowerCase().includes(searchText.toLowerCase())) || (item.Class.toString().toLowerCase().includes(searchText.toLowerCase())) );

SetStudentfilter(filterData)
if(!searchText.trim()){
  SetStudentfilter(students);
}
}
else{
  SetStudentfilter(students);
}

}

//export to PDF

const exportToPDF = ()=>{
  
const doc = new jsPDF();
doc.text("User Data",20,10);
//define columns and tables
const columns=["Roll No","Name","Father Name","Class","Mobile No","gender","Enroll no." ];
const rows=studentfilter.map(user=>[
  user.RollNo,
  user.Name,
  user.FatherName,
  user.Class,
  user.MobileNo,
  user.gender,
  user.EnrollNo,

]);
doc.autoTable({
  startY:20,
  head:[columns],
  body:rows,
});

//save the pdf
doc.save('userData.pdf');

}


  return (
    <div className="lg:p-6 p-2 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6">Student List</h2>
<div className='flex justify-between px-10 py-4'>
<div className='flex lg:flex-row flex-col lg:gap-52 gap-4 justify-center items-center'>
    <div className='w-96'>
        <TextInput type='text' placeholder='Search Student' value={searchText} onChange={handleSearch}/>
    </div>
    <div className=''>

    <Button onClick={exportToPDF}>Export to PDF</Button>
    </div>
    
    <div className="">
      {/* Button to open the modal */}
      <Button 
      gradientDuoTone="purpleToPink"
        onClick={() => setModalOpen(true)} 
        className=""
      >
        Add Student
      </Button>

      {/* StudentModal component */}
      <StudentModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSave}
        
      />
    </div>
    </div>
</div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">Roll No</th>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Father's Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Class</th>
              <th className="px-4 py-2 text-left text-gray-700">Mobile No</th>
              <th className="px-4 py-2 text-left text-gray-700">Gender</th>
              {/* <th className="px-4 py-2 text-left text-gray-700">Enroll No</th> */}
              <th className="px-4 py-2 text-left text-gray-700">Enrollment Date</th>
              <th className="px-4 py-2 text-left text-gray-700">Marks</th>
              <th className="px-4 py-2 text-left text-gray-700"colSpan={2}>Oprations</th>
            </tr>
          </thead>
          <tbody>
            {studentfilter.map((student) => (
              <tr key={student.RollNo} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-600">{student.RollNo}</td>
                <td className="px-4 py-2 text-gray-600">{student.Name}</td>
                <td className="px-4 py-2 text-gray-600">{student.FatherName}</td>
                <td className="px-4 py-2 text-gray-600">{student.Class}</td>
                <td className="px-4 py-2 text-gray-600">{student.MobileNo}</td>
                <td className="px-4 py-2 text-gray-600">{student.gender}</td>
                {/* <td className="px-4 py-2 text-gray-600">{student.EnrollNo}</td> */}
                <td className="px-4 py-2 text-gray-600">{new Date(student.EnrollmentDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-gray-600">
                  <ul>
                    {student.marks.map((mark, index) => (
                      <li key={index}>
                        {mark.subject}: <span className='bg-slate-300  p-1 rounded-sm '>{mark.score}</span> 
                      </li>
                    ))}
                  </ul>
                </td>
                <td className=''>
                  <Button color='light' onClick={()=>handleEdit(student)}>Edit</Button>
                </td>
                <td className=''>
                  <Button color="failure" onClick={()=>handleDelete(student)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <StudentEdit
          studentData={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default StudentData;
