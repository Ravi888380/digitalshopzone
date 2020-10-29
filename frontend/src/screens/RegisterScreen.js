import React, {useState,useEffect} from 'react'
import {Row,Col,Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Link} from 'react-router-dom'
import {register  } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'

const RegisterScreen = ({location,history}) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const[message,setMessage]=useState(null)
    const redirect = location.search ? Number (location.search.split('=')[1]) : '/'

    const dispatch =useDispatch()
const userRegister=useSelector(state => state.userRegister)
const {loading,error,userInfo} = userRegister
useEffect(() => {
    if(userInfo){
        history.push(redirect)
    }
  },[history,redirect,userInfo] )

const submitHandler =(e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password does not match ')
    }else{
        dispatch(register(name,email,password))
    }
  
}


    return (
        <FormContainer>
           <div className="shadow-lg p-3 mb-5 bg-white rounded">
<Meta title='Create Account' />
            <h1 className='text-center'>SIGN UP</h1>
            {error && <Message variant='danger'>{error}</Message>}
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
                <Button type='submit' variant='primary' className='btn-block'>
                REGISTER
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
    Have an Account?{' '}<Link to={redirect ? `/login?redirect?=${redirect}`: '/login'}>Login</Link>
    </Col>
            </Row>
            </div>
        </FormContainer>
    )
}

export default RegisterScreen
