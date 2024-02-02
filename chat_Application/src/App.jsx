import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Navbar, Nav, Image} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

import './App.css';


function App() {
  return (
    <Container className='both-columns'>
       <Navbar bg="primary" data-bs-theme="dark" className='navbar'>
          <Navbar.Brand href="#home">Let's Chat</Navbar.Brand>
          <Nav className="me-auto align-items-end">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Contacts</Nav.Link>
            <Image src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg&ga=GA1.1.210930112.1699676705&semt=ais" alt="Avatar" className="avatar"/>
          </Nav>
      </Navbar>

      <Row className='rows'>
        <Col className='sidebar' md={4}>
          <div className="user-list">
          <InputGroup hasValidation>
            <Form.Control placeholder="Search" type="text"/>
            <Button variant="primary"><FaSearch /></Button>
         </InputGroup>
            <ul>
              <li>User 1</li>
              <li>User 2</li>
            </ul>
          </div>
        </Col>

      {/* <Container className='chatPage'> */}
        <Col className='chatPage d-none d-md-block'  md={8} sm={0}>
          <div className='main-content'>
          <div className="message">User 1: Hello!</div>
          <div className="message">User 2: Hi there!</div>

          <Form className="message-input">
            <Form.Group>
              <InputGroup>
                <Form.Control type="text" placeholder="Type your message" />
                  <Button variant="primary">Send</Button>
              </InputGroup>
            </Form.Group>
          </Form>
          </div>
        </Col>
        {/* </Container> */}
      </Row>
    </Container>
  );
}

export default App;
