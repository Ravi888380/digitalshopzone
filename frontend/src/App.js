import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import MyOrderScreen from './screens/MyOrderScreen'

const App = () => {
  return (
<Router>
<Header/>
      <main className='py-3'>
        <Container>
       <Route path='/login' component={LoginScreen} />
       <Route path='/profile' component={ProfileScreen} />
       <Route path='/admin/userlist' component={UserListScreen} />
       <Route path='/admin/user/:id/edit' component={UserEditScreen} />
       <Route path='/payment' component={PaymentScreen} />
       <Route path='/register' component={RegisterScreen} />
       <Route path='/' component={HomeScreen} exact />
       <Route path='/product/:id' component= {ProductScreen} />
       <Route path='/myorder' component= {MyOrderScreen} />
       <Route path='/cart/:id?' component= {CartScreen} />
       <Route path='/shipping' component={ShippingScreen} />
       <Route path='/placeorder' component={PlaceOrderScreen} />
       <Route path='/order/:id' component={OrderScreen} />
       <Route path='/search/:keyword' component={HomeScreen} exact />
       <Route path='/page/:pageNumber' component={HomeScreen} />
       <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
        </Container>
      </main>
<Footer />
</Router>
  );
}

export default App;
