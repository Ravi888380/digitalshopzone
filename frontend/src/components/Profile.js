import React, {useState,useEffect} from 'react'
import {Row,Col,Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {getProfile,updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import '../js/edit.js'
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal"

const Profile = ({history}) => {

    const [fname,setfName]=useState('')
    const [lname,setlName]=useState('')
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
            if(!user.fname){
                dispatch(getProfile('profile'))
            }
            else{
                setfName(user.fname)
                setlName(user.lname)
                setEmail(user.email)
    
            }
        }
      },[history,userInfo,dispatch,user] )

      const [open, setOpen] = useState(false);
 
      const onOpenModal = () => setOpen(true);
      const onCloseModal = () => setOpen(false);

    const submitHandler =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password does not match ')
        }else{
            dispatch(updateUserProfile({id:user._id,fname,lname,email,password}))
        }
      
    }
    return (
       <>
             {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Update</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Row>
                <Col md={5}> <h5>Personal Information</h5></Col>
                <span><a className='ml-n2' id='editname'> <strong className='editname'>Edit</strong></a></span>
                </Row>
                <Row>
                    <Col md={4}>
            <Form.Group ControlId='fname'>
                    <Form.Control type='text' id='fname' placeholder='first name' value={fname} onChange={(e)=>setfName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col md={4}>
            <Form.Group ControlId='lname'>
                    <Form.Control type='text' id='lname' placeholder='last name' value={lname} onChange={(e)=>setlName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Button type='submit' id='savename' className='btn btn-primary'>SAVE
                    </Button>
                    </Col>
                </Row>
                <p >Your Gender</p>
                <Form.Group className='mt-n2'>
                    <Form.Check checked type='radio' inline label="Male"  />
      <Form.Check type='radio' inline label="Female"  />
      </Form.Group>
      <Row>
      <Col md={7}>
      <Form.Group ControlId='email'>
                    <Form.Label>Email Address <span><a className='ml-3' id='editemail'><strong className='editemail'>Edit</strong></a></span>
                    <span><a className='ml-3' onClick={onOpenModal}><strong>Change Password</strong></a></span>
                    </Form.Label>
                    <Form.Control style={{width:'70%'}} id='email' type='email' placeholder='email' value={email} disable onChange={(e)=>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
      </Col>
                
                <Col>
                <Button type='submit' style={{marginTop:'2rem'}} id='saveemail' className='btn btn-primary ml-n5'>SAVE
                    </Button>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={7}>
                    <Form.Group ControlId='mobile'>
                    <Form.Label>Mobile Number<span><a className='ml-3' id='editmobile'><strong className='editmobile'>Edit</strong></a></span></Form.Label>
                    <Form.Control style={{width:'70%'}} id='mobile' type='text' placeholder='mobile' value={7708020381} disable>
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Button type='submit' style={{marginTop:'2rem'}} id='savemobile' className='btn btn-primary ml-n5'>SAVE
                    </Button>
                    </Col>
                    </Row>
              
                <Modal open={open} onClose={onCloseModal}>
                    <Row>
                        <Col md={5} style={{paddingLeft:'2rem'}}>
<p>
Your new password must:
</p>
<ul>
  <li>Be at least 6 characters in length</li>
  <li>Not be same as your current password</li>
  <li>Not contain common passwords.</li>
</ul>
                        </Col>
                        <Col md={5}>
                        <h4>Change Password</h4>
          <Form className='pt-4'>
          <Form.Group ControlId='password'>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type='password' placeholder='current password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
          <Form.Group ControlId='password'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type='password' placeholder='new password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group ControlId='confirmpassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' className="btn btn-primary btn-block">Change Password</Button>
                </Form>
                        </Col>
                    </Row>
         
                
        </Modal>
            </Form>
       </>
    )
}

export default Profile
