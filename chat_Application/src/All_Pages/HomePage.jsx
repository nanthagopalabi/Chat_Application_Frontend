import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, InputGroup, Button, Navbar, Nav, Image} from 'react-bootstrap';
import { BsFillSendFill } from "react-icons/bs";
import '../App.css';
import Emoji from '../Components/Emoji';
import SideBar from '../Components/SideBar';
import ChatArea from '../Components/ChatArea';
import NavBar from '../Components/NavBar';


function HomePage() {
  return (
      <>
        <Container className='both-columns'>
          <NavBar/>

      
      <Row className='rows'>
       <SideBar/>
       
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