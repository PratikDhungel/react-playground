import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark' className='nav-container'>
      <Navbar.Brand href='#home'>Rent Out</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          <Nav.Link href='' className='nav-links-spacing nav-links-styling'>
            Home
          </Nav.Link>
          <Nav.Link href='' className='nav-links-spacing nav-links-styling'>
            My Rentals
          </Nav.Link>
          <NavDropdown title='Daniel Plainview' id='user-profile-dropdown'>
            <NavDropdown.Item href='' className='nav-links-spacing nav-links-styling'>
              Account
            </NavDropdown.Item>
            <NavDropdown.Item href='' className='nav-links-spacing nav-links-styling'>
              Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='' className='nav-links-spacing nav-links-styling'>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
