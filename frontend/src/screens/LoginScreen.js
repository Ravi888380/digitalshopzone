import React, {useState,useEffect} from 'react'
import {Row,Col,Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {Link} from 'react-router-dom'
import {login  } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { FacebookLoginButton,GoogleLoginButton } from "react-social-login-buttons";

const LoginScreen = ({location,history}) => {



    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const redirect = location.search ? Number (location.search.split('=')[1]) : '/'

    const dispatch =useDispatch()
const userLogin=useSelector(state => state.userLogin)
const {loading,error,userInfo} = userLogin
useEffect(() => {
    if(userInfo){
        history.push(redirect)
    }
  },[history,redirect,userInfo] )

const submitHandler =(e)=>{
    e.preventDefault()
    dispatch(login(email,password))
}


    return (
        <FormContainer >
<Meta title='Login' />
            <h1 style={{textAlign: 'center'}}>Welcome to Proshop</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Row>
                <Col md={6}>
                <FacebookLoginButton onClick={() => alert("Hello")} />
                </Col>
                <Col md={6}>
                <GoogleLoginButton onClick={() => alert("Hello")} />
                </Col>
            </Row>
            <Row>
            <Col className='text-center p-3'>Have a password? Continue with your email address</Col>
            </Row>
            
            <Form onSubmit={submitHandler}>
                <Form.Group ControlId='email'>
                <span><i className="fa fa-user mr-2"></i></span>
                    <Form.Control type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group ControlId='password'>
                    <i className="fa fa-lock mr-2"></i>
                    <Form.Control type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

                <Button type='submit' variant='primary'>
                    SIGN IN
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
    New Customer?{' '}<Link to={redirect ? `/register?redirect?=${redirect}`: '/register'}>Register</Link>
    </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
