import React, {useState,useEffect} from 'react'
import {Button,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Link} from 'react-router-dom'
import {getProfile  } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'

const UserEditScreen = ({match}) => {
    const userId = match.params.id
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const[isAdmin,setIsAdmin]=useState(false)

    const dispatch =useDispatch()
const userDetails=useSelector(state => state.userDetails)
const {loading,error,user} = userDetails
useEffect(() => {
    if(!user.name || user._id !== userId){
        dispatch(getProfile(userId))
    }
    else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
    }
  },[dispatch,user,userId] )

const submitHandler =(e)=>{
    e.preventDefault()
  
}


    return (
        <>
        <Link to='/admin/userlist'>
            <Button className='btn btn-primary my-3'>Go Back</Button>
            </Link>
            
            <FormContainer>
<Meta title='Edit User Details' />
            <h1>Edit User Details</h1>
          {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
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
                   <Form.Group ControlId='isadmin'>
                       <Form.Check type='checkbox' label='Is Admin'  checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}>
                       </Form.Check>
                   </Form.Group>
                 
                   <Button type='submit' variant='primary'>
                   Update
                   </Button>
               </Form>

          )}
           
        </FormContainer>

            </>
       
    )
}

export default UserEditScreen
