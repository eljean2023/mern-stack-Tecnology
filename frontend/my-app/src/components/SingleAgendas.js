import React, { useState } from "react";
import { Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { format } from "date-fns";
import Modal from "react-bootstrap/Modal";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

function MyVerticallyCenteredModal(props) {
  return (
    <>
      {/*
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
  
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
     
    </Modal>
     */}
    </>
  );
}

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button type="button" style={{ border: "0px" }} onClick={decoratedOnClick}>
      {children}
    </button>
  );
}
//format(new Date(), 'dd/mm/yyyy')

const SingleAgenda = ({ agenda, props }) => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  // const onHide = () => setShow(false);
  const onHide = () => setModalShow(false);

  /*const shareUrl= window.location.href*/
  const shareUrl = "https://google.com";

  var myWindow = window.open("", "MsgWindow", "width=200,height=100");
  //myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
  // https://www.youtube.com/watch?v=TcwDOwWQ-GE&list=RDTcwDOwWQ-GE&start_radio=1
  // https://www.youtube.com/watch?v=nweBl8j2rjs&list=RDMMnweBl8j2rjs&start_radio=1
  let timex = 3000;
  var linkx = `${agenda.link}`;
  var linkxxx;
  console.log(linkx);

  linkxxx = linkx.split("v=")[1]?.split("&")[0];

  console.log(linkxxx);
  let height = 600;
  let width = 1200;

  function openWin() {
    myWindow = window.open(
      linkx,
      "popUpWindow",
      "height=" +
        height +
        ", width=" +
        width +
        ", resizable=yes,scrollbars=yes,toolbar=yes"
    ); // Opens a new window
    if (myWindow) {
      setTimeout(() => {
        myWindow.close();
      }, timex);
      // navigate(`/agendaAlls`)
    }
  }

  function closeWin() {
    myWindow.close(); // Closes the new window
  }

  return (
    <Accordion /*defaultActiveKey={['0']} */>
      <Card className="fadex">
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

        <Card.Header>
          <CustomToggle eventKey="0">
            {" "}
            <Card.Title>
              <Button variant="danger" onClick={() => setModalShow(false)}> Share </Button>{" "}
                Group : {agenda.name}
            </Card.Title>{" "}
          </CustomToggle>
        </Card.Header>
        <iframe className="pointer-events"
                  src={`https://www.youtube.com/embed/${linkxxx}`}
                  frameborder="2"
                  controls={0}
                  
                  //allow="autoplay; encrypted-media"
                  //allowfullscreen
                  //title='video'

                />
                <Button onClick={openWin} className='text-warning-x'> Play !</Button>
        {/*

              
                      Country : {agenda.country} 
                    <video className='VideoModalSpace' controlsList="nodownload" loop id="video" style={{width:'100%', height: 'auto'}} >
                 <source src={`${agenda.filename}#t=2`} type="video/mp4" rounded/>
      </video>

             <Accordion.Collapse eventKey="0">
              <Card.Body >
              <Modal.Body>
              <Card.Text> State   : {agenda.statex} </Card.Text>
              <Card.Text> Address : {agenda.address}  </Card.Text>
              <Card.Text> Description   :  {agenda.description}  </Card.Text>
              <Card.Text> Date: {  format(new Date(agenda.date), 'dd/MM/yyyy')}  </Card.Text>
              <Card.Text> Hour : {agenda.hour} </Card.Text>
              <Card.Text> Price : {agenda.pricex} </Card.Text>
              <Card.Text> Status : {agenda.status} </Card.Text>
              </Modal.Body>
              </Card.Body> 
              </Accordion.Collapse>
           */}
        <div className="modal-fullscreen">
          <Modal
            {...props}
            show={modalShow}
            onHide={() => setModalShow(false)}
            className="bodyModal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <div
                  className="text-warning titlesNave eventsParametersxModal active animate__animated animate__fadeInTopLeft"
                  href="/"
                  id="logo1"
                >
                  B A W <i className="fa fa-globe animate__animated"></i>{" "}
                  <i className="fa fa-globe animate__animated"></i> L{" "}
                  <i
                    className="fa fa-check fa-check fa-checkHeader"
                    aria-hidden="true"
                  ></i>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Card.Text className="EventsFooter">
              {" "}
              Status : {agenda.name}{" "}
            </Card.Text>
            <Modal.Body>
              {/* 
           
              <video className='VideoModalSpace'  controls controlsList="nodownload" loop id="video" style={{width:'100%', height: 'auto'}} >
                 <source src={`${agenda.link}#t=2`} type="video/mp4" rounded/>
      </video>

      <Card.Text className='eventsParameters'> Date : {format(new Date(agenda.date), 'dd/MM/yyyy')} </Card.Text>
    
              <Card.Text className='eventsParameters'> Country   : {agenda.country} </Card.Text>
              <Card.Text className='eventsParameters'> Country   : {agenda.statex} </Card.Text>
              <Card.Text className='eventsParameters'> Address : {agenda.address}  </Card.Text>
              <Card.Text className='eventsParameters'> Group : {agenda.name} </Card.Text>
              
              <Card.Text className='eventsParameters'> From : {agenda.hour} </Card.Text>
              <Card.Text className='eventsParameters'> Description   :  {agenda.description}  </Card.Text>
              
              <Card.Text className='EventsFooter'> Price : $ {agenda.pricex} </Card.Text>

            */}
            </Modal.Body>
            <div className="EventsFooter"></div>
            <Modal.Footer></Modal.Footer>
            <div className="CloseAndShare">
              <EmailShareButton
                url={shareUrl}
                quote={"Share the link"}
                hashtag={"#portafolio..."}
              >
                <EmailIcon size={40} round={true} />
              </EmailShareButton>

              <TwitterShareButton
                url={shareUrl}
                quote={"Share the link"}
                hashtag={"#portafolio..."}
              >
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>

              <FacebookShareButton
                url={shareUrl}
                quote={"Share the link"}
                hashtag={"#portafolio..."}
              >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton
                url={shareUrl}
                quote={"Share the link"}
                hashtag={"#portafolio..."}
              >
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
            </div>

            <Modal.Footer>
              <Button onClick={onHide} className="btn-danger">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* 
            
            Price : {agenda.price}   
                
                Date: {  format(new Date(agenda.date), 'dd/MM/yyyy')} 

                State : {agenda.statex}   

                Address : {agenda.address}  
                
                Hour : {agenda.hour} 
                
                last Upgrated : 

            
            */}

        <>
          {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
          onHide={() => setModalShow(false)}
      />
      */}
        </>
      </Card>

      {""}

      <hr style={{ color: "white" }} />
    </Accordion>
  );
};

export default SingleAgenda;
