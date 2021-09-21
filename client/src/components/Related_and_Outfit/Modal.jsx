import React, {useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const RelatedModal = ({prodId, comparison}) => {
  const [MainProduct, setMainProduct] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getCurrentProductFeatures = () => {
      if (prodId !== undefined) {
        axios.get(`/api/product/${prodId}`)
        .then(res => {
          setMainProduct(res.data);
        })
        .catch(err => {
          console.error('Modal state error: ', err);
        })
      }
    }
    getCurrentProductFeatures();
  }, [prodId])

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Compare
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md="auto">{MainProduct.name}</Col>
              <Col></Col>
              <Col md="auto">{comparison}</Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RelatedModal;