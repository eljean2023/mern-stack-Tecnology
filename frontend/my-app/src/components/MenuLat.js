import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userAction'
//import Example  from '../components/MenuLat'

function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  
  const userLogin = useSelector(state =>state.userlogin)
  const {userInfo} = userLogin
    

  const logoutHandler =  () =>{
    dispatch(logout())
    window.location = "/login"

  }

  return (
    <>
    

       <i onClick={handleShow} className="fa fa-bars" aria-hidden="true" style={{marginRight: '30px', cursor:'pointer', fontSize: '20px'}}></i>
  
    

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
bars
    <Container>
    <Example/>
      <Navbar.Brand className='text-warning' href="/player" id="logo"> JUST ONLY STARS </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1" className=''>Home</Nav.Link>
        </Nav>
        
        <Nav className='ml-auto'>
        {
    userInfo ? <NavDropdown title={` Welcome `}>{/*${userInfo.user.name}*/}
    <NavDropdown.Item  href="/profile">Profile</NavDropdown.Item>
    <NavDropdown.Item href="/market">
    <NavDropdown.Divider />
     Market Place
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={logoutHandler}>
      Logout 
    </NavDropdown.Item>
    
    </NavDropdown> : (<Nav className='ml-auto'>
<Nav.Link href="/login">Login</Nav.Link>
<Nav.Link href="/register">Register</Nav.Link>   </Nav>)

   }   </Nav>

          <NavDropdown title="French" id="navbarScrollingDropdown">
            <NavDropdown.Item  href="#action3">English</NavDropdown.Item>
            <NavDropdown.Item href="#action4">
            <NavDropdown.Divider />
             French
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Creole
            </NavDropdown.Item>
          </NavDropdown>
 
      </Navbar.Collapse>

    </Container>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default Example