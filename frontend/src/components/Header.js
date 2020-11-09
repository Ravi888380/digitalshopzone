import React from 'react'
import {Route} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar,Nav,Container,NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBox from './SearchBox'
import {logout} from '../actions/userActions'

const Header = () => {


const dispatch =useDispatch()

  const userLogin =useSelector(state => state.userLogin)
  const cart = useSelector(state => state.cart)
  const {cartItems}= cart
  const {userInfo }=userLogin
const logoutHandler =()=>{
  dispatch(logout())
}

    return (
            <header>     
            <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Proshop</Navbar.Brand>
              </LinkContainer>
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Route render ={({history}) => <SearchBox history={history}/> } />
    <Nav className="ml-auto drowndown">
      {userInfo ? (
        <NavDropdown title={userInfo.fname} className='dropdown' data-hover="dropdown" data-toggle="dropdown" id='username'>
          <LinkContainer to='/profile'>
            <NavDropdown.Item className='drowndown'> <i class="far fa-address-card mr-2"></i>My Profile</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/myorder'>
            <NavDropdown.Item className='drowndown'><i className='fas fa-info-square'></i>Orders</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/myorder'>
            <NavDropdown.Item className='drowndown'>Whislist</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item className='drowndown' onClick={logoutHandler}><i className='fas fa-sign-out-alt mr-2'></i>LogOut</NavDropdown.Item>
        </NavDropdown>
      ):
      (<LinkContainer to='/login'>
      <Nav.Link><i className='fa fa-user mr-2'></i> Sign In</Nav.Link>
      </LinkContainer>)}

{userInfo && userInfo.isAdmin && (
 <NavDropdown title='Admin' className='drowndown-menu' id='username'>
 <LinkContainer to='/admin/userlist'>
   <NavDropdown.Item className='drowndown-submenu'>Users</NavDropdown.Item>
 </LinkContainer>
 <LinkContainer to='/admin/productlist'>
   <NavDropdown.Item className='drowndown-submenu'>Products</NavDropdown.Item>
 </LinkContainer>
 <LinkContainer to='/admin/orderlist'>
   <NavDropdown.Item className='drowndown-submenu'>Orders</NavDropdown.Item>
 </LinkContainer>
</NavDropdown>
)}

      <NavDropdown title='More'>
      <LinkContainer to='/update'>
      <NavDropdown.Item><i className='fa fa-bell mr-2'></i> Nodification</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/about'>
      <NavDropdown.Item><i className='fa fa-phone-alt mr-2'></i> 24/7 Customer Care</NavDropdown.Item>
      </LinkContainer>
      </NavDropdown>
      <LinkContainer to='/favoriteitems'>
      <Nav.Link><i className='far fa-heart'></i><span className='cart' style={{visibility:`${cartItems.length === 0 ? 'hidden': 'visible'}`}}>{cartItems.length}</span></Nav.Link>
      </LinkContainer>
    <LinkContainer to='/cart'>
      <Nav.Link><i className='fa fa-shopping-cart'></i><span className='cart' style={{visibility:`${cartItems.length === 0 ? 'hidden': 'visible'}`}}>{cartItems.length}</span></Nav.Link>
      </LinkContainer>
      
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>



            </header>         
    )
}

export default Header
