import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const StudentEdit = ({ studentData, onClose }) => {
  const [formData, setFormData] = useState(studentData);

  useEffect(() => {
    setFormData(studentData); // Reset form data when new student is selected
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMarksChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMarks = [...formData.marks];
    updatedMarks[index][name] = value;
    setFormData({ ...formData, marks: updatedMarks });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      marks: [...formData.marks, { subject: "", score: "" }],
    });
  };

const handleSaveChanges = async () => {
  if (!studentData?._id) {
    Swal.fire({
      title: 'Error!',
      text: 'Student ID not found',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  const apiKey = `http://localhost:3000/student/edit/${studentData._id}`;
  console.log(studentData);

  try {
    const response = await axios.put(apiKey, formData);
    
    if (response.status === 200) {
      Swal.fire({
        title: 'Success!',
        text: 'Student data edited successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => onClose()); 
    }
  } catch (err) {
    console.log(err)
    Swal.fire({
      title: 'Error!',
      text: 'Failed to edit data',
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
  onClose();
};


  return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className='max-h-[95vh] overflow-y-scroll '>
      <div className="bg-white w-full max-w-lg p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Student</h2>
        <form>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Student Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="text"
            name="FatherName"
            value={formData.FatherName}
            onChange={handleChange}
            placeholder="Father's Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="number"
            name="RollNo"
            value={formData.RollNo}
            onChange={handleChange}
            placeholder="Roll No"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="number"
            name="Class"
            value={formData.Class}
            onChange={handleChange}
            placeholder="Class"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="text"
            name="MobileNo"
            value={formData.MobileNo}
            onChange={handleChange}
            placeholder="Mobile No"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            name="EnrollNo"
            value={formData.EnrollNo}
            onChange={handleChange}
            placeholder="Enroll No"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <input
            type="date"
            name="EnrollmentDate"
            value={formData.EnrollmentDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="border p-4 rounded-md mb-4">
            <label className="text-gray-600 font-medium">Marks</label>
            {formData.marks.map((mark, index) => (
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
            <button
              type="button"
              onClick={addSubject}
              className="mt-2 text-blue-500"
            >
              + Add Subject
            </button>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default StudentEdit;
