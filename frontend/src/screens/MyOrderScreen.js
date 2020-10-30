import React, {useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row,Col,Button,Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listMyorders} from '../actions/orderActions'
import Meta from '../components/Meta'

const MyOrderScreen = ({history}) => {
    const dispatch =useDispatch()

    const userDetails=useSelector(state => state.userDetails)
    const {loading,error,user} = userDetails
    
    const userLogin=useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    

    const orderListMy=useSelector(state => state.orderListMy)
    const {loading : loadingOrders,error:errorOrders, orders } = orderListMy

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        else{
            
                dispatch(listMyorders())
            
        }
      },[history,userInfo,dispatch,user] )

    return (
        <Row>
             <Meta title='Order' />
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
                               <th></th>
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
                                           <Button variant='info' className='btn btn-sm ml-2'>Details</Button>
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

export default MyOrderScreen
