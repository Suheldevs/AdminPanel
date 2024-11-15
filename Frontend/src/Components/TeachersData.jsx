import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Modal, TextInput } from 'flowbite-react';
function TeachersData() {


    const [teacher,setTeacher] = useState([]);
    useEffect(()=>{
        const getData = async() =>{
            const  apiKey = 'http://localhost:3000/teacher/get'
          try{
              const response = await axios.get(apiKey);
              setTeacher(response.data.teacherData)
          }
          catch(err){
              console.log(err);
          }
          }

        getData();
    },[]);
    

// Save student data
const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({
        fullName: '',
        gender: '',
        contactNumber: '',
        email: '',
        password: '',
        address: '',
        dateOfJoining: '',
        salary: '',
        classesAssigned: ''
    });

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleSaveChanges = () => {
        // Save changes logic here
        console.log(editData);
        handleCloseModal();
    };










  return (
    <div>
      <div className='bg-purple-500 text-center my-4 text-3xl text-white'>Teachers</div>
      <div className='flex justify-between mb-4'>
        <div classame=''></div>
      <Button gradientDuoTone='purpleToPink' onClick={handleOpenModal}>
                Flowbit
            </Button>
            </div>
        <div className='min-h-screen'>
        <div className=" shadow-md rounded-lg  ">
        <table className="min-w-full  bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-center">FullName</th>
              <th className="px-4 py-2 text-center ">Email</th>
              <th className="px-4 py-2 text-center ">password</th>
              <th className="px-4 py-2 text-center ">ContactNumber</th>
              <th className="px-4 py-2 text-center ">Gender</th>
              {/* <th className="px-4 py-2 text-left text-gray-700">Enroll No</th> */}
              <th className="px-4 py-2 text-center ">Date of Joining</th>
              <th className="px-4 py-2 text-center ">Salary</th>
              <th className="px-4 py-2 text-center " colSpan={2}>ClassesAssigned</th>
              <th className="px-4 py-2 text-ceneter "colSpan={3}>Operation</th>
            </tr>
          </thead>
          <tbody>
            {teacher.map((teacher,index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-black font-bold">{teacher.fullName}</td>
                <td className="px-4 py-2 text-gray-600">{teacher.email}</td>
                <td className="px-4 py-2 text-gray-600">{teacher.password}</td>
                <td className="px-4 py-2 text-gray-600">{teacher.contactNumber}</td>
                <td className="px-4 py-2 text-gray-600">{teacher.gender}</td>
                {/* <td className="px-4 py-2 text-gray-600">{student.EnrollNo}</td> */}
                <td className="px-4 py-2 text-gray-600">{teacher.dateOfJoining}</td>
                <td className="px-4 py-2 text-gray-600">{teacher.salary}</td>
                <td className="px-4 py-2 text-black font-bold" colSpan={2}>{teacher.classesAssigned.map((item)=>(<div>{item}</div>))}</td>
                    <td className=''>
                  <Button color='light' onClick={()=>handleEdit(student)}>Edit</Button>
                </td>
                <td className="px-4 py-2 text-gray-600"></td>
                <td className=''>
                  <Button color="failure" onClick={()=>handleDelete(student)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>

        {/* modal Start*/}
        {/* modal */}
        <Modal show={showModal} onClose={handleCloseModal} size="lg">
                <Modal.Header>
                    Teacher Information
                </Modal.Header>
                <Modal.Body>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={editData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={editData.gender}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={editData.contactNumber}
                                onChange={handleChange}
                                placeholder="Enter contact number"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={editData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={editData.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="dateOfJoining" className="block text-sm font-medium text-gray-700">Date of Joining</label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                value={editData.dateOfJoining}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                value={editData.salary}
                                onChange={handleChange}
                                placeholder="Enter salary"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="classesAssigned" className="block text-sm font-medium text-gray-700">Classes Assigned</label>
                            <input
                                type="text"
                                name="classesAssigned"
                                value={editData.classesAssigned}
                                onChange={handleChange}
                                placeholder="Enter classes assigned, separated by commas"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='flex justify-end'>
                    <Button color="gray" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button gradientDuoTone='purpleToPink' onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        {/* modal End*/}
    </div>
  )
}

export default TeachersData