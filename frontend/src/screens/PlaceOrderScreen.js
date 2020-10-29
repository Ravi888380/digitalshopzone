import React, {useEffect} from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {Link} from 'react-router-dom'
import {CreateOrder} from '../actions/orderActions'
import Meta from '../components/Meta'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart= useSelector((state)=>state.cart)

    const orderCreate = useSelector(state => state.orderCreate)
    const {order,success,error} = orderCreate
useEffect(() => {
    if(success){
        history.push(`/order/${order._id}`)

    }
}, [history,success,order._id])

    const addDecimal= (num) =>{
        return(Math.round(num*100)/100).toFixed(2)
    }

    cart.itemPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc+ item.qty * item.price,0).toFixed(2))
    cart.ShippingPrice =cart.itemPrice > 100 ? 0: 100
    cart.taxPrice =addDecimal( Number((0.15*cart.itemPrice).toFixed(2)))
    cart.totalPrice = addDecimal(Number(cart.itemPrice) + Number(cart.ShippingPrice) + Number(cart.taxPrice))

     const placeOrderHandler =() =>{
        dispatch(CreateOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice :cart.itemPrice,
            ShippingPrice:cart.ShippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice

        }))
    }
    return (
        <>
        <Meta title='Order' />
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            <Col>{cart.shippingAddress.address}</Col>
                            
                            <Col> {cart.shippingAddress.city}{' '}</Col>
                            <Col> {cart.shippingAddress.postalCode}{' '}</Col>
                            <Col> {cart.shippingAddress.country}</Col>
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message> Your cart is empty</Message>:(
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>

                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item.product}`}>
                                {item.name}</Link></Col>
                                <Col md={4}>
                                {item.qty}x ${item.price}=${item.qty * item.price}
                                </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Order Summary
                            </h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Items</Col>
                                <Col>
                                ${cart.itemPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping</Col>
                                <Col>
                                ${cart.ShippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax</Col>
                                <Col>
                                ${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Total</Col>
                                <Col>
                                ${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cart.cartItems ===0} onClick={placeOrderHandler} >Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            
        </>
    )
}

export default PlaceOrderScreen
