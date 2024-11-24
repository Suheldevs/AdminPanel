import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { FaUserEdit, FaSignOutAlt, FaUser, FaChalkboardTeacher, FaCogs, FaLaptop } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import StudentData from '../Components/StudentData';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import StudentWorkspace from '../Components/StudentWorkSpace';
import FaqPage from '../Components/Faq';

const StudentDashboard = () => {
//location
const location = useLocation();

const  studentData  = location.state?.studentData || {}; 


const printResult=()=>{
  const doc = new jsPDF();
  doc.text('StudentResult',20,10);
  //column asd row

  const columns = ["Subject","Marks"]
  const name = {"Name":studentData.Name}
  const rows = studentData.marks.map(subject=>[
    subject.subject,
    subject.score
  ]);
  ///genrate table
  doc.autoTable({
    stratY:20,
    head:[columns],
    body:rows
  });
  doc.save("reasult.pdf")
 }


  // State for the active section
  const [activeSection, setActiveSection] = useState('WorkSpace');

  // Function to handle section switching

  const renderSection = () => {
    switch (activeSection) {
      case 'WorkSpace':
        return <div className="p-4">
        <StudentWorkspace/>
        </div>;
      case 'ExamResult':
        return <div className="p-4">
            <div className="container mx-auto p-6 bg-white shadow-lg border border-gray-200 rounded-lg">
  {/* Header */}
  <h2 className="text-center text-2xl font-bold text-gray-700 mb-4">{studentData.Class}th Board Results</h2>
  <p className="text-center text-gray-500 mb-6">Secondary School Certificate Examination 2024</p>

  {/* Student Information */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8 text-gray-700 text-normal">
    <div>
      <p><span className="font-semibold">Name of Student: </span> {studentData.Name}</p>
    </div>
    <div>
      <p><span className="font-semibold">Roll No:</span>{studentData.RollNo}</p>
    </div>
    <div>
      <p><span className="font-semibold">Father's Name:</span>{studentData.FatherName}</p>
    </div>
    <div>
      <p><span className="font-semibold">Enrollment No:</span> {studentData.EnrollNo}</p>
    </div>
    <div>
      <p><span className="font-semibold">Mother's Name:</span> {studentData.MotherName ? `studentDataMother`:'Mother Name'}</p>
    </div>
    <div>
      <p><span className="font-semibold">Class:</span> {studentData.Class}</p>
    </div>
    {/* <div className="sm:col-span-2">
      <p><span className="font-semibold">Institution:</span> Tadashpur Union High School</p>
    </div> */}
  </div>

  {/* Table for Grades */}
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 text-sm text-gray-600">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="py-2 px-4 border-b text-center">Sl. No</th>
          <th className="py-2 px-4 border-b text-center">Subject</th>
          <th className="py-2 px-4 border-b text-center">Numbers</th>
          {/* <th className="py-2 px-4 border-b">Grade</th> */}
        </tr>
      </thead>
      <tbody>
        {studentData.marks.map((item,index)=>(

        <tr className="bg-white" key={index}>
          <td className="py-2 px-4 border-b text-center">{index+1}</td>
          <td className="py-2 px-4 border-b text-center">{item.subject}</td>
          <td className="py-2 px-4 border-b text-center">{item.score}</td>
          {/* <td className="py-2 px-4 border-b text-center" rowSpan="8">A+</td> */}
        </tr>
        ))}
        
       <td className="py-4  border-b text-end px-20 font-semibold" colSpan={3}> Grand Total :
        <span className='text-xl font-extrabold'>  {studentData.marks.reduce((acc, item) => acc + item.score, 0)}</span>
        <span className='ps-10'>Grade : <span className='text-xl font-extrabold'>A+</span></span>
</td>
       
      </tbody>
    </table>
  </div>

  {/* Footer */}
  <div className="text-right mt-6">
    <p className="text-gray-500 text-xs">Date of Publication of Result: {studentData.
EnrollmentDate}</p>
  </div>
</div>
<div className='flex justify-center'>
<Button className='mt-4' onClick={printResult}>Print</Button>
</div>
        </div>;
      case 'teachers':
        return <div classNameName="p-4">Teachers Content</div>;
      case 'faq':
        return <div classNameName="p-4"><FaqPage/></div>;
      default:
        return <div classNameName="p-4">Welcome!  {studentData.Name} </div>;
    }
  };

  const handleLogout = ()=>{
    Swal.fire({
      title: 'Are you sure?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((response)=>{
      if(response.isConfirmed){
        
          Swal.fire({
            title: 'Success!',
            text: `You have Logout successfully!`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        window.location.href='http://localhost:5173/';
        }
      })
      
   }

   
  return (
    <div classNameName="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500  text-white p-4 shadow-md">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Admin"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg font-semibold">{studentData.Name}</h2>
          </div>
        </div>
        <div className="flex gap-4">

          <Button color="failure" className='bg-purple-600' onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="block md:flex md:flex-1">
        {/* Sidebar */}
        <aside className="md:w-1/6 bg-gray-200 p-6">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveSection('WorkSpace')}
              className={`flex items-center p-3 rounded-lg ${activeSection === 'WorkSpace' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-700'}`}
            >
              <FaLaptop className="mr-2" />
              Student WorkSpace
            </button>
            <button
              onClick={() => setActiveSection('ExamResult')}
              className={`flex items-center p-3 rounded-lg ${activeSection === 'ExamResult' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-700'}`}
            >
              <FaUser className="mr-2" />
              Exam Results
            </button>
            <button
              onClick={() => setActiveSection('teachers')}
              className={`flex items-center p-3 rounded-lg ${activeSection === 'teachers' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-700'}`}
            >
              <FaChalkboardTeacher className="mr-2" />
             Know Your Teachers
            </button>
            <button
              onClick={() => setActiveSection('faq')}
              className={`flex items-center p-3 rounded-lg ${activeSection === 'settings' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-700'}`}
            >
              <FaCogs className="mr-2" />
              Requests/FAQ
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-6 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
