import React, { useState } from 'react';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';

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
          <Nav.Link href='#pricing' className='nav-links-spacing nav-links-styling'>
            My Rentals
          </Nav.Link>
          <Nav.Link href='#deets' className='nav-links-spacing nav-links-styling'>
            Account
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
