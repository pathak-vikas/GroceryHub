import logo from './logo.svg';
import 'tachyons';
import './App.css';
import React, { Component } from 'react';
import Navigation from './Nav.js';
import Register from './Register';
import SignIn from './SignIn';
import Banner from './Banner';
import Card from './ProductCard';
import Cardlist from './ProductList';
import Footer from './Footer';
import ProductPage from './ProductPage';
import SubBar from './SubBar';
import Body from './Body.js';
import { objectOf } from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash";
import SubBar2 from './SubBar2';

const initialState = {
  user: {
    username: '',
    // id: '',
    // shippingAddress: '',
    // email: '',
    firstname: '',
    lastname: '',
    zipcode: '',
    city: '',
    state: '',
    ad1: '',
    ad2: '',
    contact: '',
    role: "",
    isSignedIn: false,
  },
  cart: {
    products: [],
    quantity: [],
    totalItems: 0
  },
  ProductForReview: {
    pid: '',
    Product: '',
    Brand: '',
    image: '',
    Category: '',
    Rebate: 0
  },
  route: 'home',
  products: [],
  selectedProduct: '',
  locationZip: '60616',
  dropdown: false,
  selectedUser: null,
  cartTotal: '',
  cartCount: 0,
  pidForReview: 1,
  categoryFlag: false,
  category: '',
  showTweets : false
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = _.cloneDeep(initialState);
  }
  componentDidMount() {
    this.fetchProducts()
  }
  toggleTweets = () => {
    if(this.state.showTweets == false)
    this.setState({showTweets : true})
    else
    this.setState({showTweets : false})
  }
  updateCartDetails = (num) => {
    this.setState({
      cartCount: num
    })
  }
  incrementCartCount = () => {
    this.setState({
      cartCount: this.state.cartCount + 1
    })
  }
  loadCheckoutPage = (subtotal) => {
    this.setState({
      cartTotal: subtotal
    })
    this.onRouteChange('checkout');
    console.log(this.state.cartTotal)
  }
  OnCustomerSelect = (event) => {

    var arr = event.target.value.split('_');
    this.setState({ selectedUser: event.target.value})
    console.log("selected User :",event.target.value );
    console.log("selected Userlist :",arr );
    
  }
  updateProfile = (resp) => {
    this.setState(Object.assign(this.state.user, {
      firstname: resp.firstname,
      lastname: resp.lastname,
      zipcode: resp.zipcode,
      city: resp.city,
      state: resp.state,
      ad1: resp.ad1,
      ad2: resp.ad2,
      contact: resp.contact,
    }))
  }
  setCategory = (catflag, catValue) => {
    this.setState({ categoryFlag: catflag, category: catValue })
  }
  updateCartQuantity = () => {
    fetch('http://localhost:5000/cartcount', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.user.username
      })
    })
      .then(response => response.json())
      .then(response => this.setState(Object.assign(this.state.cart, { totalItems: response[0].itemcount })))
      .then("ho gyii update" + this.state.cart.quantity)
  }
  onRouteChange = (route) => {
    this.setState({ route: route, categoryFlag: false });
  }
  loadUser = (response) => {
    this.setState({ user: response })
    this.setState(Object.assign(this.state.user, { isSignedIn: true }))
    fetch('http://localhost:5000/cartcount', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.user.username
      })
    })
      .then(response => response.json())
      .then(data => this.setState({ cartCount: data[0].itemcount }))
      .then(this.onRouteChange('home'))
  }
  fetchProducts = () => {
    fetch('http://localhost:5000/products?category=baby', {
      method: 'get'
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ products: response });
        console.log(this.state.products)
      })
  }
  logOut = () => {
    this.setState(_.cloneDeep(initialState))
    this.fetchProducts()
  }
  navigateToProductPage = (id) => {
    this.setState({ route: 'productPage', selectedProduct: id })
    console.log("Hey fuddu" + id)
  }
  onZipChange = (event) => {
    this.setState({ locationZip: event.target.value });
    console.log('ye hui update   ' + this.state.locationZip)
  }
  fetchStores = () => {
    this.setState({ route: "storeLocator" })
    console.log("fetchStores  " + this.state.locationZip)
  }
  toggleDropdown = () => {
    if (this.state.dropdown == true)
      this.setState({ dropdown: false })
    else
      this.setState({ dropdown: true });
    console.log(this.state.dropdown)
  }
  resetState = () => {
    this.setState(Object.assign(this.state, { cart: initialState.cart, user: initialState.user }));
    console.log(this.state.user.isSignedIn)
  }
  viewProfile = () => {
    this.setState({ route: 'userProfile' })
  }
  RemoveFromCart = () => {
    fetch('http://localhost:5000/removeitemincart', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({

      })
    })
  }
  openReviews = (pid) => {
    this.onRouteChange('reviews')
    this.setState({
      pidForReview: pid
    })
  }
  render() {
    return (
      <div>
        {(this.state.route != "checkout") ?
          <div >  <span id="navi">  <Navigation navigateToProductPage={this.navigateToProductPage} setCategory={this.setCategory} logOut={this.logOut} onRouteChange={this.onRouteChange} state={this.state}></Navigation></span>
            {(this.state.route == 'home') ? <SubBar toggleTweets={this.toggleTweets} setCategory={this.setCategory} state={this.state} toggleDropdown={this.toggleDropdown} fetchStores={this.fetchStores} onZipChange={this.onZipChange} onRouteChange={this.onRouteChange} state={this.state} />
              : <SubBar2 toggleTweets={this.toggleTweets} setCategory={this.setCategory} state={this.state} toggleDropdown={this.toggleDropdown} fetchStores={this.fetchStores} onZipChange={this.onZipChange} onRouteChange={this.onRouteChange} state={this.state} />}
          </div>
          : <div> </div>}
        {(this.state.products.length == 0) ?
          <Body
            setCategory={this.setCategory}
            openReviews={this.openReviews}
            updateCartDetails={this.updateCartDetails}
            loadCheckoutPage={this.loadCheckoutPage}
            OnCustomerSelect={this.OnCustomerSelect}
            updateProfile={this.updateProfile}
            checkout={this.checkout}
            updateCartQuantity={this.updateCartQuantity}
            loadUser={this.loadUser}
            navigateToProductPage={this.navigateToProductPage}
            fetchProducts={this.fetchProducts}
            onRouteChange={this.onRouteChange}
            state={this.state}
            addToCart={this.addToCart} />
          : <Body
            setState={p=>{this.setState(p)}}
            setCategory={this.setCategory}
            openReviews={this.openReviews}
            updateCartDetails={this.updateCartDetails}
            loadCheckoutPage={this.loadCheckoutPage}
            OnCustomerSelect={this.OnCustomerSelect}
            updateProfile={this.updateProfile}
            checkout={this.checkout}
            updateCartQuantity={this.updateCartQuantity}
            loadUser={this.loadUser}
            navigateToProductPage={this.navigateToProductPage}
            fetchProducts={this.fetchProducts}
            onRouteChange={this.onRouteChange}
            state={this.state}
            addToCart={this.addToCart} />}
        <Footer></Footer>
      </div>
    )
  }
}

export default App;
