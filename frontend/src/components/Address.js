import React from 'react'
import {Accordion,Col,Card,Row,Form,Button, ListGroup} from 'react-bootstrap'

const Address = () => {
   const submitHandler =(e)=>{}
   return (
      <div>
        <h5 className='pb-2 mt-2'>Manage Addresses</h5>

        <Accordion  className="shadow p-2 mb-4 bg-white">
  <Card>
   <Accordion.Toggle as={Card.Header} eventKey="0">
   <Col style={{color:'blue'}}><i className="fa fa-plus mr-2" aria-hidden="true"></i>ADD A NEW ADDRESS</Col>
   </Accordion.Toggle>
   <Accordion.Collapse eventKey="0">
    <Card.Body>
    <Form onSubmit={submitHandler}>
           <Row>
              <Col md={6}>
        <Form.Group ControlId='fname'>
              <Form.Control type='text' placeholder='Name' >
              </Form.Control>
           </Form.Group>
           </Col>
           <Col md={6}>
        <Form.Group ControlId='mobile'>
              <Form.Control type='text'  placeholder='10 digit mobile number'  >
              </Form.Control>
           </Form.Group>
           </Col>
           </Row>
           <Row>
              <Col md={6}>
        <Form.Group ControlId='pincode'>
              <Form.Control type='text'  placeholder='Pincode'  >
              </Form.Control>
           </Form.Group>
           </Col>
           <Col md={6}>
        <Form.Group ControlId='locality'>
              <Form.Control type='text'  placeholder='Locality'  >
              </Form.Control>
           </Form.Group>
           </Col>
           </Row>
           <Row>
              <Col md={12}>
        <Form.Group ControlId='address'>
              <Form.Control className='pb-5 pt-2' type='text'  placeholder='address (area and street)' >
              </Form.Control>
           </Form.Group>
           </Col>
           </Row>
           <Row>
              <Col md={6}>
        <Form.Group ControlId='city'>
              <Form.Control type='text'  placeholder='City/District/Town'  >
              </Form.Control>
           </Form.Group>
           </Col>
           <Col md={6}>
        <Form.Group ControlId='state'>
              <Form.Control type='text'  placeholder='State'  >
              </Form.Control>
           </Form.Group>
           </Col>
           </Row>
           <Row>
              <Col md={6}>
        <Form.Group ControlId='landmark'>
              <Form.Control type='text'  placeholder='Land Mark (optional)'  >
              </Form.Control>
           </Form.Group>
           </Col>
           <Col md={6}>
        <Form.Group ControlId='alter_mobile'>
              <Form.Control type='text'  placeholder='Alter mobile number (optional)'  >
              </Form.Control>
           </Form.Group>
           </Col>
           <Col>
              </Col>
           </Row>
           <p >Address Type</p>
           <Form.Group className='mt-n2'>
              <Form.Check  checked type='radio' inline label="Home"  />
    <Form.Check  type='radio' inline label="Office"  />
    </Form.Group>
    <Col>
    <Button type='submit' className='btn btn-primary sm-4 mr-2'>SAVE
              </Button>
              <Button type='submit' className='btn btn-light sm-4 ml-2'>CANCEL
              </Button>
              </Col>
        </Form>
    </Card.Body>
   </Accordion.Collapse>
  </Card>
</Accordion>
<ListGroup>
    <ListGroup.Item>
        <Col>
        Home
        </Col>
        <Col>
        <h5>Rai kumar  7708020381</h5>
        </Col>
        <Col>1/70 16 pudur,oddanchatram,dindigul,tamil nadu,624614</Col>
    </ListGroup.Item>
    <ListGroup.Item>
        <Col>
        Office
        </Col>
        <Col>
        <h5>Rai kumar  7708020381</h5>
        </Col>
        <Col>1/70 16 pudur,oddanchatram,dindigul,tamil nadu,624614</Col>
    </ListGroup.Item>
</ListGroup>
      </div>
   )
}

export default Address
