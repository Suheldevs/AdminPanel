import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextInput } from 'flowbite-react';
import StudentModal from './StudentModel';

const StudentData = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSave = (studentData) => {
        console.log('Saved Student Data:', studentData);
        // Handle the save operation, like sending data to an API or updating a state
      };
    
  const [students, setStudents] = useState([]);

  const setModalFunction = ()=>{
    setModal(true);
  }
  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/student/data'); 
        setStudents(response.data.studentData); 
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-6">Student List</h2>
<div className='flex justify-between px-10 py-4'>
    <div className='w-96'>
        <TextInput type='text' placeholder='Search Student'/>
    </div>
    <div className=''>
    <div className="">
      {/* Button to open the modal */}
      <Button 
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
              <th className="px-4 py-2 text-left text-gray-700">Enroll No</th>
              <th className="px-4 py-2 text-left text-gray-700">Enrollment Date</th>
              <th className="px-4 py-2 text-left text-gray-700">Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.RollNo} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-600">{student.RollNo}</td>
                <td className="px-4 py-2 text-gray-600">{student.Name}</td>
                <td className="px-4 py-2 text-gray-600">{student.FatherName}</td>
                <td className="px-4 py-2 text-gray-600">{student.Class}</td>
                <td className="px-4 py-2 text-gray-600">{student.MobileNo}</td>
                <td className="px-4 py-2 text-gray-600">{student.gender}</td>
                <td className="px-4 py-2 text-gray-600">{student.EnrollNo}</td>
                <td className="px-4 py-2 text-gray-600">{new Date(student.EnrollmentDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-gray-600">
                  <ul>
                    {student.marks.map((mark, index) => (
                      <li key={index}>
                        {mark.subject}: {mark.score}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentData;
