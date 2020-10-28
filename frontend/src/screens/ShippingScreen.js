import React, {useState} from 'react'
import {Button,Form,FormGroup} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'
import Meta from '../components/Meta'

const ShippingScreen = ({history}) => {

    const cart= useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] =useState(shippingAddress.address)
    const [city,setCity] =useState(shippingAddress.city)
    const [postalCode,setPostalCode] =useState(shippingAddress.postalCode)
    const [country,setCountry] =useState(shippingAddress.country)
const dispatch=useDispatch()
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <Meta title='Shipping' />
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <FormGroup controlid='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter address' value={address} onChange={(e)=>setAddress(e.target.value)}>
                    </Form.Control>
                </FormGroup>
                <FormGroup controlid='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)}>
                    </Form.Control>
                </FormGroup>
                <FormGroup controlid='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}>
                    </Form.Control>
                </FormGroup>
                <FormGroup controlid='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter country' value={country} onChange={(e)=>setCountry(e.target.value)}>
                    </Form.Control>
                </FormGroup>
                <Button type='submit' variant='primary'>
                Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
