import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, InputGroup, Button, Navbar, Nav, Image} from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import '../App.css';
import Emoji from '../Components/Emoji';


function HomePage() {
  return (
      <>
        <Container className='both-columns'>
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

      <Row className='rows'>
        <Col className='sidebar' md={4}>
          <div className="user-list">
          <InputGroup className='search' hasValidation>
            <Form.Control placeholder="Search" type="text"/>
            <Button variant="primary"><FaSearch /></Button>
         </InputGroup>
            <ul>
              <li>User 1</li>
              <li>User 2</li>
            </ul>
          </div>
        </Col>

        <Col className='chatPage d-none d-md-block'  md={8} sm={0}>
          <div className='main-content'>
          <div className="message">User 1: Hello!</div>
          <div className="message">User 2: Hi there!</div>

          <Form className="message-input">
            <Form.Group>
              <InputGroup>
              <Emoji/>
                <Form.Control type="text" placeholder="Type your message" />
                  <Button variant="primary"><BsFillSendFill /></Button>
              </InputGroup>
            </Form.Group>
          </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </>

  )
}

export default HomePage