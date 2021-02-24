import React, { useState } from 'react';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='ml-auto'>
          <Nav.Link href='#features' className='nav-links-spacing'>
            Features
          </Nav.Link>
          <Nav.Link href='#pricing' className='nav-links-spacing'>
            Pricing
          </Nav.Link>
          <Nav.Link href='#deets' className='nav-links-spacing'>
            More deets
          </Nav.Link>
          <Nav.Link href='#memes' className='nav-links-spacing'>
            Dank memes
          </Nav.Link>
        </Nav>
        {/* </Nav> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
