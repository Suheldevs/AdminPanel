import React, { useState } from 'react'
import {Avatar, Button, Dropdown, Navbar, NavbarBrand,} from 'flowbite-react';
import { Link } from 'react-router-dom';
function Header() {
const [signin, setSignin] = useState(true);

  return (
    <Navbar className='border-b-2'>
        <NavbarBrand to="/" as={Link}>
            <span className=''><Button gradientDuoTone="purpleToPink">Admin</Button> </span>
            <span className=''> Panel</span>
        </NavbarBrand>
        <div className='flex md:order-2'>
         {signin? 
             <Dropdown 
             arrowIcon = {false}
             inline
             label={
                <Button gradientDuoTone="purpleToPink" outline>Log In</Button> 
             }
             >
                 
                 <Dropdown.Item>
                     <span><Link to='/student/login'>Student</Link></span>
                 </Dropdown.Item>
                 <Dropdown.Item>
                     <span><Link to='/admin/login'>Admin</Link></span>
                 </Dropdown.Item>
          
                     </Dropdown>
         :
            <Dropdown 
            arrowIcon = {false}
            inline
            label={
                <Avatar alt="User Setting" img='https://flowbite.com/docs/images/people/profile-picture-5.jpg' rounded/>
            }
            >
                <Dropdown.Header>
                    <span>Mohd suhel</span>
                </Dropdown.Header>
                <Dropdown.Item>
                    <span>Item1</span>
                </Dropdown.Item>
                <Dropdown.Item>
                    <span>Item1</span>
                </Dropdown.Item>
                <Dropdown.Item>
                    <span>Item1</span>
                </Dropdown.Item>
         
                    </Dropdown>}
        <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
        <Navbar.Link to="/" active as={Link}>
          Home
        </Navbar.Link>
        <Navbar.Link href="#About">About</Navbar.Link>
        <Navbar.Link href="www.github.com/mohdsuheldevs">More Projects</Navbar.Link>
        <Navbar.Link  href="#ContactUs">Contact</Navbar.Link>

        <Navbar.Link  to="/student/login" className='text-red-600 ms-10 hover:text-red-500 'as={Link}>See Your Result !!</Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header