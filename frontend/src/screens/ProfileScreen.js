import React, {useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row,Col,Button,Form,Table,Image} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getProfile,updateUserProfile } from '../actions/userActions'
import {listMyorders} from '../actions/orderActions'
import Meta from '../components/Meta'

const ProfileScreen = ({history}) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const[message,setMessage]=useState(null)

const dispatch =useDispatch()

const userDetails=useSelector(state => state.userDetails)
const {loading,error,user} = userDetails

const userLogin=useSelector(state => state.userLogin)
const {userInfo} = userLogin

const userUpdateProfile=useSelector(state => state.userUpdateProfile)
const {success} = userUpdateProfile



useEffect(() => {
    if(!userInfo){
        history.push('/login')
    }
    else{
        if(!user.name){
            dispatch(getProfile('profile'))
        }
        else{
            setName(user.name)
            setEmail(user.email)

        }
    }
  },[history,userInfo,dispatch,user] )

const submitHandler =(e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password does not match ')
    }else{
        dispatch(updateUserProfile({id:user._id,name,email,password}))
    }
  
}


    return (
        <Row>
            <Col md={3}>
            <Meta title='Profile' />

            <Row  className="shadow-lg p-2 mb-4 bg-white">
            <Col md={1}>
                <Image src='https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg'/>
            </Col>
            <Col className='ml-5'>
            Hello
            <h5>{name}</h5>
            </Col>
            </Row>
            
            </Col>
           <Col md={8} className="shadow-lg p-5 mb-4 bg-white ml-5">
           {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Update</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Row>
                <Col md={4}> <h5>Personal Information </h5></Col>
                <span><a href='#'>Edit</a></span>
                </Row>
                <Row>
                    <Col md={4}>
            <Form.Group ControlId='name'>
                    <Form.Control type='text' placeholder='first name' value={name} onChange={(e)=>setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col md={4}>
            <Form.Group ControlId='name'>
                    <Form.Control type='text' placeholder='last name' value={name} onChange={(e)=>setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                </Col>
                </Row>
                <p>Your Gender</p>
                    <Form.Check className='mb-2 pb-2' type='radio' inline label="Male"  />
      <Form.Check type='radio' inline label="Female"  />
                <Form.Group ControlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group ControlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group ControlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                UPDATE
                </Button>
            </Form>
           </Col>
        </Row>
       
    )
}

export default ProfileScreen
