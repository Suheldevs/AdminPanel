import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { FaUserEdit, FaSignOutAlt, FaUser, FaChalkboardTeacher, FaCogs, FaLaptop } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import StudentData from '../Components/StudentData';
import Swal from 'sweetalert2';
import TeachersData from '../Components/TeachersData';
import Products from '../Components/Products';
import AdminMain from '../Components/AdminDashboardMain';

const AdminDashboard = () => {
//location
const location = useLocation();

const  adminData  = location.state?.adminData || {}; 



  // State for the active section
  const [activeSection, setActiveSection] = useState('dashboard');

  // Function to handle section switching
  const renderSection = () => {
    switch (activeSection) {
      case 'students':
        return <div className="lg:p-4 p-0">
            <StudentData/>
        </div>;
      case 'dashboard':
        return <div className="lg:p-4 p-0">
           <AdminMain/>
        </div>;
      case 'teachers':
        return <div className="p-4"><TeachersData/></div>;
      case 'settings':
        return <div className="p-4">Settings Content</div>;
      
      case 'editProfile':
        return <div className="p-4">Edit Profile Content</div>;
      default:
        return <div className="p-4">Welcome to Admin Dashboard</div>;
    }
  };


//handle logout
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
      window.location.href='https://school-admin-panel.netlify.app/';
      }
    })
    
 }



  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500  text-white p-4 shadow-md">
        <div className="flex items-center">
          
          <div>
            <h2 className="text-lg font-semibold">Welcome! {adminData.name}</h2>
          </div>
        </div>
        <div className="flex gap-4">
          <Button color="light" onClick={() => setActiveSection('editProfile')} >
            <FaUserEdit className="mr-2" />
            Edit Profile
          </Button>
          <Button color="failure" className='bg-purple-600' onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="block md:flex">
        {/* Sidebar */}
        <aside className="md:w-1/6 bg-gray-200 p-6">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center p-3 rounded-lg ${activeSection === 'dashboard' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-700'}`}
            >
              <FaLaptop className="mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection('students')}
              className={`flex items-center p-3 rounded-lg ${activeSection === 'students' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-700'}`}
            >
              <FaUser className="mr-2" />
              Students
            </button>
            <button
              onClick={() => setActiveSection('teachers')}
              className={`flex items-center p-3 rounded-lg ${activeSection === 'teachers' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-700'}`}
            >
              <FaChalkboardTeacher className="mr-2" />
              Teachers
            </button>
            
            <button
              onClick={() => setActiveSection('settings')}
              className={`flex items-center p-3 rounded-lg ${activeSection === 'settings' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-700'}`}
            >
              <FaCogs className="mr-2" />
              Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white lg:p-6 p-2 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
