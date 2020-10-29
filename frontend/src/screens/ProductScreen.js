import React, {useState,useEffect} from 'react'
import {Row,Col,ListGroup,Button,Card,Image,Form} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {Link} from 'react-router-dom'
import { listProductDetails ,createProductReview} from '../actions/productActions'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'

const ProductScreen = ({history,match}) => {
    const [qty,setQty] = useState(1)
    const [rating,setRating] = useState(0) 
    const [comment,setComment] = useState()

const dispatch =useDispatch()


const productDetails=useSelector(state => state.productDetails)
const {loading,error,product} = productDetails

const userLogin=useSelector(state => state.userLogin)
const {userInfo} = userLogin

const productReviewCreate=useSelector(state => state.productReviewCreate)
const {success:successProductReview, error:errorProductReview} = productReviewCreate


    useEffect(() => {
        if(successProductReview){
            alert('Review Submited!')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
      dispatch(listProductDetails(match.params.id))
    },[dispatch,match,successProductReview] )

const addToCartHandler = () =>{
history.push(`/cart/${match.params.id}?qty=${qty}`)
}
const buyHandler = () =>{
    history.push(`/shipping`)
    }
const submitHandler = (e) =>{
    e.preventDefault()
    dispatch(createProductReview(match.params.id,{rating,comment}))
    }
    return (     
        <>
           <p>
           <Link className='my-3' to='/'>Home</Link>/
           <Link className='my-3' to='/'>{product.brand}</Link>/
           <Link className='my-3' to='/'>{product.name}</Link>
           </p>
           {loading ? <Loader/>: error ? <Message variant='danger'>{error}</Message>: (
              <>
              <Meta title={product.name} />
              <Row>
            <Col md={2}>
                <ListGroup.Item variant='flush'>
                <Image src={product.image} alt={product.name} fluid ></Image>
                </ListGroup.Item>
                <ListGroup.Item variant='flush'>
                <Image src={product.image} alt={product.name} fluid ></Image>
                </ListGroup.Item >
                <ListGroup.Item variant='flush'>
                <Image src={product.image} alt={product.name} fluid ></Image>
                </ListGroup.Item>
            </Col>
               <Col md={4}>
                   <Image src={product.image} alt={product.name} fluid ></Image>
               </Col>
               <Col md={5}>
<ListGroup variant='flush'>
<ListGroup.Item>
        <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
    </ListGroup.Item>
    <ListGroup.Item>
    <h4>{product.name}</h4>
    <i class="far fa-heart fa-2x"></i>
    </ListGroup.Item>
    <ListGroup.Item>
      <h2>${product.price}</h2>
    </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Status</Col>
                                   <Col>
                                   <strong>
                                       {product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                                       </strong>
                                       </Col>
                               </Row>
                           </ListGroup.Item>
                       
                            <ListGroup.Item>
                            { product.countInStock > 0 &&(
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)} >
                                        {[...Array(product.countInStock).keys()].map((x) =>(
                                            <option key= { x + 1} value={ x + 1 }>
                                                { x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    </Col>
                                </Row>
                                 )}
                            </ListGroup.Item>
                       
                           <ListGroup.Item>
                               <Button onClick={addToCartHandler} className='"btn btn-outline-dark float-left' style={{width: '163px'}} type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                            
                               <Button onClick={buyHandler} className='btn btn-dark float-right 'style={{width: '163px'}} type='button' disabled={product.countInStock === 0}>Buy It Now</Button>

                           </ListGroup.Item>
    <ListGroup.Item>
        <Row>
            <h2>Description</h2>
        </Row>
        {product.description}
    </ListGroup.Item>
</ListGroup>
                  
               </Col>
           </Row>
           
        <Row>
            <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                {product.reviews.map((review) =>(
                    <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0,10)}</p>
                    <p>{review.comment}</p>
                    </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                        {userInfo ? (<Form onSubmit={submitHandler}>
                            <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as='select' value={rating} onChange={(e) =>setRating(e.target.value)}>
                                    <option value=''>Select</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control as='textarea' row='3' value={comment} onChange={(e) =>setComment(e.target.value)}>
                                  </Form.Control>
                                  </Form.Group> 
                                  <Button type='submit' variant='primary'>Submit</Button>
                        </Form> ):(
                            <Message>Please <Link to='/login'>Sign In</Link> to write a review {' '}</Message>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
           )}
        </>
    )
}

export default ProductScreen
