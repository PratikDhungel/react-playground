import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { logoutUser } from '../utils/auth/logout';

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark' className='nav-container'>
      <Navbar.Brand href='#home'>Rent Out</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          <Nav.Link href='' className='nav-links-spacing nav-links-styling'>
            Home
          </Nav.Link>
          <Nav.Link href='' className='nav-links-spacing'>
            <Link to={'/my-rentals'} className='nav-links-styling'>
              My Rentals
            </Link>
          </Nav.Link>
          <Nav.Link href='' className='nav-links-spacing'>
            <Link to={'/infinite-scrolling'} className='nav-links-styling'>
              Infinite Scrolling
            </Link>
          </Nav.Link>
          <NavDropdown title='Daniel Plainview' id='user-profile-dropdown'>
            <NavDropdown.Item href='' className='nav-links-spacing nav-links-styling'>
              Account
            </NavDropdown.Item>
            <NavDropdown.Item href='' className='nav-links-spacing nav-links-styling'>
              Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='' className='nav-links-spacing nav-links-styling' onClick={() => logoutUser()}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
