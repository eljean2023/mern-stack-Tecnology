import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
  return (

  <footer>
        <Container>
        <Row>
        <Col id='footer' className='text-center py3 animate__animated animate__fadeInLeft animate__slower animate__delay-2s	4s fixed-bottom'>Copyright &copy; Bawool industry support 2023 </Col>
        </Row>
        </Container>
  </footer>    
  )
}

export default Footer