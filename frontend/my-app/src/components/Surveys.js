import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sponsors Surveys 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <div className='contenedorSurveys'>

        <p>
        <input type="radio" value="Male" name="gender" /> Rushell
        </p>
        <p>
        <input type="radio" value="Male" name="gender" /> RoodyRootBoy
        </p>
        <p>
        <input type="radio" value="Female" name="gender" /> K-dilac
        </p>
        <p>
        <input type="radio" value="Other" name="gender" /> Zafem
        </p>
        
        </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }



function Surveys() {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
    <Link variant="primary" onClick={() => setModalShow(true)}>
      Surveys
    </Link>

    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
  </>
  )
}

export default Surveys