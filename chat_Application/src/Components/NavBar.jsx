import React from 'react';
import { Container, Navbar, Nav,InputGroup,Form,Image, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <div>
        <Navbar bg="primary" data-bs-theme="dark" className='navbar'>
          <Navbar.Brand className='logo'>Let'sChat💬 </Navbar.Brand>
          <Container className="me-auto">
          <Nav>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Contacts</Nav.Link>
            <Image src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg&ga=GA1.1.210930112.1699676705&semt=ais" alt="Avatar" className="avatar"/>
          </Nav>
          </Container>
          </Navbar>
    </div>
  )
}

export default NavBar