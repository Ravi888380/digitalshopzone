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
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Proshop</Navbar.Brand>
              </LinkContainer>
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Route render ={({history}) => <SearchBox history={history}/> } />
    <Nav className="ml-auto drowndown">
    
      {userInfo ? (
        <NavDropdown title={userInfo.name} className='drowndown-menu' id='username'>
          <LinkContainer to='/profile'>
            <NavDropdown.Item className='drowndown-submenu'>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item className='drowndown-submenu' onClick={logoutHandler}>LogOut</NavDropdown.Item>
        </NavDropdown>
      ):
      (<LinkContainer to='/login'>
      <Nav.Link><i className='fa fa-user mr-2'></i> Sign In</Nav.Link>
      </LinkContainer>)}
      <NavDropdown title='More'>
      <LinkContainer to='/update'>
      <NavDropdown.Item><i className='fa fa-bell mr-2'></i> Nodification</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to='/about'>
      <NavDropdown.Item><i className='fa fa-phone-alt mr-2'></i> 24/7 Customer Care</NavDropdown.Item>
      </LinkContainer>
      </NavDropdown>
      
    <LinkContainer to='/cart'>
      <Nav.Link><i className='fa fa-shopping-cart'></i><span className='cart' style={{visibility:`${cartItems.reduce((acc, item) => acc+ item.qty,0) === 0 ? 'hidden': 'visible'}`}}>{cartItems.reduce((acc, item) => acc+ item.qty,0)}</span> Cart</Nav.Link>
      </LinkContainer>
      
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>



            </header>         
    )
}

export default Header
