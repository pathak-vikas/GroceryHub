import React, { Component } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import './App.css';
import Card from './ProductCard';
import StoreLocator from "./StoreLocator";
import Checkout from "./Checkout";
import e from "cors";
import Navigation from "./Nav";
import ReactDOM from 'react-dom';
import _ from 'lodash';

const initialState = {
    items: null,
    responseArrived: false,
    subtotal: 0,
    users: [],
    selectedUser: null,
    selectedUserObj:{}
}



class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = _.cloneDeep(initialState);
    }



    fetchCartProducts = () => {
        fetch('http://localhost:5000/cart', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.props.state.user.username
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    this.props.updateCartQuantity();
                    console.log("Ye ayi cart ", response);
                    this.setState({ items: response });
                    console.log("Verification: ", this.state.items)
                    console.log("Verification response: ", this.state.responseArrived)
                }
            })
            .then(fetch('http://localhost:5000/subtotal', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.props.state.user.username
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        this.setState({ subtotal: (response[0].subtotal / 40).toFixed(2), responseArrived: true });
                    }
                })).then(response => {
                    if (this.props.state.user.role == "csr") {

                        fetch('http://localhost:5000/getusers', {
                            method: "get",
                            headers: { 'Content-Type': 'application/json' }
                        })
                            .then(response => response.json())
                            .then(data =>{
                                console.log("users list",data);
                                this.setState({ users: data }
                            )})
                            .then(this.props.updateCartDetails(this.state.items.length))
                    }
                })
            .catch(err => console.log("Ek Dum Blunder ho gya" + err))
    }

    componentDidMount() {
        this.fetchCartProducts();
    }

    removeItemInCart = (username, productid) => {
        fetch('http://localhost:5000/removeitemincart', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                productid: productid
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log("remove item res ",response)
                    this.setState({ items: response });
                    this.props.updateCartDetails(response.length)
                }
            }).then(fetch('http://localhost:5000/subtotal', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.props.state.user.username
                })
            })
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        this.setState({ subtotal: (response[0].subtotal / 40).toFixed(2),responseArrived:true });
                    }
                }))
            .catch(err => console.log())
    }

    updateQuantity(oldQuantity, productid, username, event, price) {
        console.log("updateQuantity event fired");
        console.log("updateQuantity oldQuantity", oldQuantity);
        console.log("updateQuantity productid", productid);
        console.log("updateQuantity username", username);
        console.log("updateQuantity event", event.target.value);
        console.log("updateQuantity subtotal", this.state.subtotal);
        console.log("updateQuantity body username", this.props.state.user.username);
        console.log("updateQuantity body username", this.props.state.cart.totalItems);



        if (event.target.value != oldQuantity) {

            fetch('http://localhost:5000/updatequantityincart', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    productid: productid,
                    quantity: event.target.value

                })
            })
                .then(response => response.json())
                .then(response => console.log("update quantity", response))
            var change = Math.abs(event.target.value - oldQuantity)
            console.log("quantity", change);
            console.log("subtotal orignal", this.state.subtotal);
            if (event.target.value > oldQuantity) {

                var items = this.state.items
                var objIndex = items.findIndex((obj => obj.productid == productid));
                items[objIndex].quantity = items[objIndex].quantity + change
                console.log("quantity changed from " + oldQuantity + " to ", items[objIndex].quantity)
                this.setState({ items: items })
                var subtotal = parseFloat(this.state.subtotal) + change * (price / 40).toFixed(2)
                console.log("subtotal increased", subtotal.toFixed(2));
                this.setState({ subtotal: subtotal.toFixed(2) })
                // this.setState(Object.assign(this.props.state.cart, { totalItems: this.props.state.cart.totalItems+change }))
            } else {
                var items = this.state.items
                var objIndex = items.findIndex((obj => obj.productid == productid));
                items[objIndex].quantity = items[objIndex].quantity - change
                console.log("quantity changed from " + oldQuantity + " to ", items[objIndex].quantity)
                this.setState({ items: items })
                var subtotal = parseFloat(this.state.subtotal) - change * (price / 40).toFixed(2)
                console.log("subtotal decreased", subtotal.toFixed(2));
                this.setState({ subtotal: subtotal.toFixed(2) })
                // this.setState(Object.assign(this.props.state.cart, { totalItems: this.props.state.cart.totalItems-change }))
            }


        }

    }

    render() {

        // function renderReplace(component, container){
        //     var temp = document.createElement("span");
        //     ReactDOM.render(component, temp);
        //     container.parentNode.replaceChild(temp.firstElementChild, container);
        //   }

        //   renderReplace(<Navigation logOut={this.props.state.logOut} onRouteChange={this.onRouteChange} state={this.props.state}></Navigation>,  document.getElementById('container'))

        return (


            <div class='cartgrid bg-light-gray ma2' >
                {
                    // document.getElementById('navi').innerHTML ="<Navigation logOut={this.props.state.logOut} onRouteChange={this.onRouteChange} state={this.props.state}></Navigation> "

                /* <Navigation logOut={this.props.state.logOut} onRouteChange={this.onRouteChange} state={this.props.state}></Navigation> */}
                <div  className='pa2 bg-white shadow ma2'>
                    <div>
                        <h2> Shopping Cart</h2>
                        {/* <div> <input type="checkbox" defaultChecked /> <text className="fw5 f4 mb4">Deselect All</text> <hr /> </div> */}
                        <div>   <hr /> </div>
                        <div >
                            {(this.state.responseArrived && this.props.state.user.isSignedIn && this.state.items.length != 0) ?
                                this.state.items.map((item, i) => {
                                    console.log("cart item ", item)
                                    return (
                                        <div className='shadow mt2 cartgrid2'>
                                            <div className='mw4'> <img className='ma4' height="60%" src={item.image_small} /> </div>
                                            <div>
                                                <h5 className='pt4'>{item.product}</h5>
                                                <h5>{`$ ${(item.Price / 40).toFixed(2)}`}</h5> <span> <text className='navy f5'>Quantity : <input min="1" max="100" onChange={(e) => this.updateQuantity(item.quantity, item.productid, this.props.state.user.username, e, item.Price)} className='f7 mw2 pa0' type="number" defaultValue={item.quantity} /> </text>  </span>
                                                <text className='ma1 gray'> | </text> <text> Eligible for Free Returns</text>
                                                <br />
                                                <text className='mt2 navy dim pointer' onClick={() => this.removeItemInCart(this.props.state.user.username, this.state.items[i].productid)}> Remove Item </text>
                                            </div>
                                        </div>
                                    )

                                })
                                : <div> <h5 className='flex justify-center'> There's nothing in your cart </h5> </div>}
                        </div>
                    </div>
                </div>

                <div  className='pa2 ma2 bg-white shadow'>
                    <h5>Subtotal ({`${this.props.state.cart.totalItems} Items`}) : $ {this.state.subtotal} </h5>
                    <div>
                        {(this.state.responseArrived && this.props.state.user.isSignedIn) ?
                            this.state.items.map((item, i) => {
                                //console.log("cart item ", item)
                                return (
                                    <div className='flex justify-between'> {`$ ${(item.Price / 40).toFixed(2)}`}
                                        <div> x </div>
                                        <div> {item.quantity} </div>
                                        <div> = </div>
                                        <div>$ {((item.Price / 40) * item.quantity).toFixed(2)} </div>

                                    </div>)
                            })
                            : <div> Nothing in the Cart</div>}
                    </div>
                    {(this.props.state.user.isSignedIn == true) ?
                        ((this.props.state.cart.totalItems == 0) ?
                            <button className="ml3 f5 dim ph6 pv1 pt4 mb2 mt5 navy bg-light-gray br4 pointer"
                                onClick={() => { alert("Your cart is Empty, add items before checking out!"); this.props.onRouteChange('home') }}>Checkout</button>
                            : (((this.props.state.user.ad1 == null ||this.props.state.user.ad1 === '' || this.props.state.user.city == null||this.props.state.user.city === '') && (this.props.state.user.role != 'csr')) ?
                                <button className="ml3 f5 dim ph6 pv1 pt4 mb2 mt5 navy bg-light-gray br4 pointer"
                                    onClick={() => { this.props.onRouteChange("userProfile"); alert('Update your profile first') }}>Checkout</button>
                                : <button className="ml3 f5 dim ph6 pv1 pt4 mb2 mt5 navy bg-gold br4 pointer"
                                    onClick={() => this.props.loadCheckoutPage(this.state.subtotal)}>Checkout</button>))
                        : <button className="ml3 f5 dim ph6 pv1 pt4 mb2 mt5 navy bg-light-gray br4 pointer"
                            onClick={() => this.props.onRouteChange("signIn")}>Checkout</button>}
                    <hr />
                    {(this.props.state.user.role == 'csr' || this.props.state.user.role == 'sm') ?
                        <div>
                            <div className='profilegrid ma2 pa2'>
                                <label className="db fw6 lh-copy f6" htmlfor="customer">Select Customer</label>
                                <div></div>
                                {/* <select onClick={this.OnCustomerSelect.bind(this)} className='pa2 mw16 mb3' id="customer" name="customer">
                                    <option value=''>Select</option>
                                    <option value="cust">Vikas</option>
                                    <option value="sm">Ashish</option>
                                    <option value="csr">James</option>
                                </select> */}
                                <select onChange={this.props.OnCustomerSelect.bind(this)} className='pa2 mw16 mb3' id="customer" name="customer">
                                    <option value=''>Select</option>
                                    if(this.state.users.length!=0){
                                        this.state.users.map(user => {
                                            return (<option value={user.username+'_'+user.ad1+'_'+user.ad2+'_'+user.city+'_'+user.state+'_'+user.zipcode+'_'+user.contact+'_'+user.firstname+'_'+user.lastname}>{user.username}</option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        : <div> <h6> Products you may like to buy </h6>
                            <Card
                                key='29'
                                name='Ready To Eat - Rajma Masala'
                                title='Kitchens Of India'
                                price="150"
                                image='https://www.bigbasket.com/media/uploads/p/s/40001309_5-kitchens-of-india-ready-to-eat-rajma-masala.jpg' />
                        </div>}
                </div>
            </div>
        )
    }
}

export default Cart;