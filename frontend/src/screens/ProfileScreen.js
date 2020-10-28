import React, {useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row,Col,Button,Form,Table} from 'react-bootstrap'
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

const orderListMy=useSelector(state => state.orderListMy)
const {loading : loadingOrders,error:errorOrders, orders } = orderListMy

useEffect(() => {
    if(!userInfo){
        history.push('/login')
    }
    else{
        if(!user.name){
            dispatch(getProfile('profile'))
            dispatch(listMyorders())
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
            <h1>PROFILE</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Update</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group ControlId='email'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='full name' value={name} onChange={(e)=>setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
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
            <Col md={9}>
               <h2>My Orders</h2>
               { loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message>: (
                   <Table striped bordered hover responsive className='table-sm'>
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>DATE</th>
                               <th>TOTAL</th>
                               <th>PAID</th>
                               <th>DELIVERIED</th>
                           </tr>
                       </thead>
                       <tbody>
                           { orders.map(order=>(
                               <tr key={order._id}>
                                 
                                   <td>{order._id}</td>
                                   <td>{order.createdAt.substring(0,10)}</td>
                                   <td>{order.totalPrice}</td>
                                   <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                       <i className='fas fa-times' style={{color:'red'}}></i>
                                   )}</td>
                                   <td>{order.isDeliveried ? order.deliveriedAt.substring(0,10) : (
                                       <i className='fas fa-times' style={{color:'red'}}></i>
                                   )}</td>
                                   <td>
                                       <LinkContainer to={`/order/${order._id}`}>
                                           <Button variant='info' className='btn btn-sm'>Details</Button>
                                       </LinkContainer>
                                   </td>
                                   
                               </tr>
                           ))}
                       </tbody>
                   </Table>
               )}
            </Col>
        </Row>
       
    )
}

export default ProfileScreen