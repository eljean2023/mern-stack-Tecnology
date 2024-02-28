import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userAction'
import Example  from '../components/MenuLat'
import SearchEvents  from './SearchEvents'
import { Route, Routes, BrowserRouter } from "react-router-dom";


const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state =>state.userlogin)
  const {userInfo} = userLogin

  const logoutHandler =  () =>{
    dispatch(logout())
    /*push('/login') */
    window.location = "/" 

  }
 
  /*  animate__flash animate__infinite animate__delay-1s	18s animate__slower" aria-hidden="true"></i> <i className="fa fa-globe   animate__animated animate__flash animate__infinite	infinite animate__delay-1s	10s animate__slower" aria-hidden="true" */
  
  return (
    
    <header id='menu'><Navbar className='brk fixed-top'  variant='dark' expand="lg" collapseOnSelect>
    <Container>
    {/* <Example/> */}
  
      <Navbar.Brand className='text-warning titlesNave active animate__animated animate__fadeInTopLeft' href="/" id="logo1">B A W <i className="fa fa-globe animate__animated"></i> <i className="fa fa-globe animate__animated"></i> L  <i className="fa fa-check fa-check fa-checkHeader" aria-hidden="true"></i></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/market"><i className="fa fa-calendar" aria-hidden="true"></i> News </Nav.Link>
          <Nav.Link href="/agendaAlls"><i className="fa fa-calendar" aria-hidden="true"></i> Hits </Nav.Link>
          
        </Nav>
   
        <Nav className='ml-auto'>
      {
    userInfo ? <NavDropdown  title={` Welcome ${userInfo?.user?.name}`}> {/* ${userInfo.user.name}*/}
    <NavDropdown.Item  href="/profile">Profile</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item  href="/createRoomx">Live</NavDropdown.Item>
    <NavDropdown.Item  href="/market">
    <NavDropdown.Divider />
     Market Place
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={logoutHandler}>
      Logout 
    </NavDropdown.Item>
    <BrowserRouter>
   <Routes>
   <Route render={({history}) => <SearchEvents history={history}/> } />
   </Routes>
   </BrowserRouter>
    </NavDropdown> : (<Nav className='ml-auto'>

        <Nav.Link href="/login"><i className="fa fa-lock" aria-hidden="true"></i> Login</Nav.Link>
        <Nav.Link href="/register"><i className="fa fa-user-plus" aria-hidden="true"></i> Register</Nav.Link>   
<BrowserRouter>
   <Routes>
   <Route render={({history}) => <SearchEvents history={history}/> } />
   </Routes>
   </BrowserRouter>
</Nav>)
      
   }  
  
   </Nav>
     
          <NavDropdown  title="FR" id="navbarScrollingDropdown" className='text-warning-x' >
            <NavDropdown.Item  href="#action3" >  En </NavDropdown.Item>
            <NavDropdown.Item href="#action4">
            <NavDropdown.Divider />
             Fr 
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Cr
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/cart"><i className="fa fa-shopping-cart" aria-hidden="true" style={{background:'black', color:'grey'}}></i> Cart</Nav.Link>
          
      </Navbar.Collapse>

    </Container>
  </Navbar>
  <BrowserRouter>
   <Routes>
   <Route render={() => <SearchEvents />}  />
   </Routes>
   </BrowserRouter>
  </header>
  )
}

export default Header