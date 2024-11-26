import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Spinner } from 'flowbite-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log('Sign-in data:', data);
    const apiKey = `${import.meta.env.VITE_BACKEND_URL}/student/login`;

    try{
      setLoading(true)
      const response = await axios.post(apiKey,data);
      // Display success message using SweetAlert
    Swal.fire({
      title: 'Success!',
      text: 'You have signed in successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    const studentData  = response.data.student;
    console.log(studentData);
navigate('/student/dashboard', { state: { studentData}  });
setLoading(false);


    }
    catch(err){
      const errorMessage = err.responce?.message || 'Login failed. Please try again.';
            Swal.fire({
        title: 'Failed!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Try Again!',
      });
    setLoading(false);

    }


    
  };

  return (
    <div className="flex items-center justify-center min-h-[95vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className=' ms-10 flex gap-4 flex-col'>
        <p>For Demo Use :- </p>
        <div ><span className='p-1 rounded bg-gradient-to-l from-purple-600 text-white to-pink-600'>Email: </span> &nbsp; student@gmail.com</div>
        <div ><span className='p-1 rounded bg-gradient-to-l from-purple-600 text-white to-pink-600'>Roll No: </span> &nbsp; 100</div>
        <div ><span className='p-1 rounded bg-gradient-to-l from-purple-600 text-white to-pink-600'>Password: </span> &nbsp; student</div>
      <hr/>
      </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6 mt-4">Student Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              type="text"
              placeholder='Student Name'
              {...register('Email', { required: 'Email is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Roll Number</label>
            <input
              type="number"
              placeholder='Enter Roll Number'
              {...register('RollNo', {
                required: 'RollNo is required',
                valueAsNumber:true,
                pattern: {
                  message: 'Invalid RollNo ',
                },
                
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.RollNo && (
              <p className="text-red-500 text-sm mt-1">{errors.RollNo.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              type="password"
              {...register('Password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" gradientDuoTone="purpleToPink" disabled={loading}>
            {loading? (<><Spinner size='sm'/> <span> Loading..</span></>):('Log In')}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
