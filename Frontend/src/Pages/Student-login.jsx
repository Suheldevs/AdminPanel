import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'flowbite-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    console.log('Sign-in data:', data);
    const apiKey = 'http://localhost:3000/student/login';

    try{
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



    }
    catch(err){
      const errorMessage = err.responce?.message || 'Login failed. Please try again.';
            Swal.fire({
        title: 'Failed!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Try Again!',
      });
    

    }


    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Student Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder='Student Name'
              {...register('Name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Name && (
              <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
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
          <Button type="submit" className="w-full" gradientDuoTone="purpleToPink">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
