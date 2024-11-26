import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';
import axios from 'axios';

const StudentModal = ({ isOpen, onClose, onSave }) => {
  const [studentData, setStudentData] = useState({
    Name: '',
    FatherName: '',
    RollNo: '',
    Class: '',
    MobileNo: '',
    Email:'',
    Password: '',
    gender: '',
    marks: [{ subject: '', score: '' }],
    EnrollNo: '',
    EnrollmentDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleMarksChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMarks = [...studentData.marks];
    updatedMarks[index][name] = value;
    setStudentData({ ...studentData, marks: updatedMarks });
  };

  const addSubject = () => {
    setStudentData({
      ...studentData,
      marks: [...studentData.marks, { subject: '', score: '' }],
    });
  };

  const handleSave = async() => {
    onSave(studentData);
    // if(!studentData.Name && !studentData.Email && !studentData.Class && !studentData.EnrollNo && !studentData.MobileNo){
      
    // }
console.log(studentData);
    const apiKey = 'http://localhost:3000/admin/student/register';
    try{
      console.log(studentData)
      const response = await axios.post(apiKey, studentData);
      Swal.fire({
        title: 'Success!',
        text: 'Student Data save successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
onClose();
    }
    catch(err){
        console.log(err);
        Swal.fire({
            title: 'Failed!',
            text: 'Student data not save',
            icon: 'error',
            confirmButtonText: 'Try Again!',
          });
    }
  };

  return (
      <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75">
      <Dialog.Panel className="w-full max-w-lg p-6 bg-white rounded-lg">
        <div className='max-h-[90vh] overflow-y-scroll '>
        <Dialog.Title className="text-2xl font-semibold text-gray-700 mb-4">Add Student</Dialog.Title>
        <form>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="Name"
              value={studentData.Name}
              onChange={handleChange}
              placeholder="Student Name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="FatherName"
              value={studentData.FatherName}
              onChange={handleChange}
              placeholder="Father's Name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="RollNo"
              value={studentData.RollNo}
              onChange={handleChange}
              placeholder="Roll No"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="Class"
              value={studentData.Class}
              onChange={handleChange}
              placeholder="Class"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="MobileNo"
              value={studentData.MobileNo}
              onChange={handleChange}
              placeholder="Mobile No"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="Email"
              value={studentData.Email}
              onChange={handleChange}
              placeholder="Email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="Password"
              value={studentData.Password}
              onChange={handleChange}
              placeholder="Password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="gender"
              value={studentData.gender}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              name="EnrollNo"
              value={studentData.EnrollNo}
              onChange={handleChange}
              placeholder="Enroll No"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder='Enrollment Date'
              name="EnrollmentDate"
              value={studentData.EnrollmentDate}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="border p-4 rounded-md">
              <label className="text-gray-600 font-medium">Marks</label>
              {studentData.marks.map((mark, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    name="subject"
                    value={mark.subject}
                    onChange={(e) => handleMarksChange(index, e)}
                    placeholder="Subject"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                  />
                  <input
                    type="number"
                    name="score"
                    value={mark.score}
                    onChange={(e) => handleMarksChange(index, e)}
                    placeholder="Score"
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                  />
                </div>
              ))}
              <button type="button" onClick={addSubject} className="mt-2 text-blue-500">
                + Add Subject
              </button>
            </div>
          </div>
        </form>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
    </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default StudentModal;
