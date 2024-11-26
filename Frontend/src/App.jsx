import React from 'react'
import Header from './Components/Header'
import AdminLogin from './Pages/Admin-login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentLogin from './Pages/Student-login'
import AdminDashboard from './Pages/AdminDashboard'
import StudentDashboard from './Pages/StudentDashboard'
import Home from './Pages/Home'
import Footer from './Components/Footer'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/student/login' element={<StudentLogin/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      <Route path='/student/dashboard' element={<StudentDashboard/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App