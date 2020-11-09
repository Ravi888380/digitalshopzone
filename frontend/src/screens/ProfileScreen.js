import React, {useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row,Col,Image, ListGroupItem,ListGroup,Nav,Tab} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {getProfile } from '../actions/userActions'
import Meta from '../components/Meta'
import {logout} from '../actions/userActions'
import Profile from '../components/Profile'
import Address from '../components/Address'

const ProfileScreen = ({history}) => {
    const [fname,setfName]=useState('')
    const [lname,setlName]=useState('')


const dispatch =useDispatch()

const userDetails=useSelector(state => state.userDetails)
const {user} = userDetails

const userLogin=useSelector(state => state.userLogin)
const {userInfo} = userLogin

useEffect(() => {
    if(!userInfo){
        history.push('/login')
    }
    else{
        if(!user.fname){
            dispatch(getProfile('profile'))
        }
        else{
            setfName(user.fname)
            setlName(user.lname)
        }
    }
  },[history,userInfo,dispatch,user] )

const logoutHandler =()=>{
    dispatch(logout())
  }
  
    return (
        <Tab.Container id="profile_address" defaultActiveKey="profile">
        <Row>
            <Col md={3} className='ml-4 mr-4'>
            <Meta title='Profile' />

            <Row  className="shadow p-2 mb-4 bg-white">
            <Col md={1}>
                <Image src='https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg'/>
               
            </Col>
            <Col className='ml-5'>
    Hello,<h5>{fname} {lname}</h5>
            </Col>
            </Row>
        <Row className="shadow p-2 mb-4 bg-white">
           <ListGroup variant='flush'>
               <LinkContainer to='/myorder'>
               <ListGroupItem><h5 style={{cursor: 'pointer'}}><i className="fas fa-file-upload mr-3"></i> My Orders <i className='fas fa-angle-right ml-4' style={{color:'blue'}}></i></h5> </ListGroupItem>
               </LinkContainer>
               <ListGroupItem><h5><i class="far fa-address-card mr-2"></i>Account Settings</h5></ListGroupItem>
               <ListGroupItem>
               <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="profile">Profile Information</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="address">Manage Address</Nav.Link>
        </Nav.Item>
      </Nav>
    </ListGroupItem>
               <ListGroupItem style={{cursor: 'pointer'}} onClick={logoutHandler}><h5><i className="fa fa-sign-out-alt mr-2" aria-hidden="true"></i>Logout</h5></ListGroupItem>
           </ListGroup>
        </Row>
            
            </Col>
            <Col md={7} className="shadow p-5 mb-4 bg-white ml-4 mr-4">
            <Tab.Content>
        <Tab.Pane eventKey="profile">
            <Profile />
           </Tab.Pane>
            <Tab.Pane eventKey="address">
                <Address />
            </Tab.Pane>
            </Tab.Content>
            </Col>
          
          </Row>
           </Tab.Container>
       
    )
}

export default ProfileScreen
