import React, { Component } from "react";
import logo from './media/Logo2.png'
import './App.css';
import StoreLocator from "./StoreLocator";

const initialstate = {
    user: '',
    paymentInfo: '',
    deliveryType: 'delivery',
    deliveryzip: '',
    stores: [],
    storesloaded: false,
    storename: '',
    storezip: '',
    storeaddr: ''
}


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
    }
    componentDidMount() {
        this.setState({ user: this.props.state.user.username })
        // else if (this.props.state.user.role == 'csr') {
        //     this.setState   
        // }
    }

    onStoreSelect = (event) => {
        var arr = event.target.value.split('_');
        console.log("selected store",arr)
        this.setState({ storename: arr[0], storezip: arr[1], storeaddr: arr[2] + '_' + arr[3] })

    }


    checkout = (user) => {
        var arriveby = new Date();
	arriveby.setDate(arriveby.getDate()+14);
        console.log("inside checkout")
        var zip = '';
        var strnm = '';
        var straddr = '';
        var selectedUser=null;
        var fn=this.props.state.user.firstname;

        if( this.props.state.selectedUser!=null){
            selectedUser=this.props.state.selectedUser.split('_')[0]
            fn=this.props.state.selectedUser.split('_')[7]
        }
       

        if (this.state.deliveryType == "delivery") {
            if( this.props.state.selectedUser!=null)
            zip = this.props.state.selectedUser.split('_')[5]
            else
            zip = this.props.state.user.zipcode

        }
        else {
            zip = this.state.storezip;
            var strnm = this.state.storename;
            var straddr = this.state.storeaddr;
        }
        // console.log(JSON.stringify({
        //     username: user,
        //     selectedUser:selectedUser,
        //     customername: this.props.state.user.firstname,
        //     deliverytype: this.state.deliveryType,
        //     payment: this.state.paymentInfo,
        //     //get from store or user state based on deliverytype selection made
        //     deliveryzip: zip,
        //     storeaddr: straddr,
        //     storename: strnm
        //     //set below incase of CSR
        //     //  selectedUser:selectedUser,
        // }))
        fetch('http://localhost:5000/checkout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: user,
                selectedUser: selectedUser,
                customername: fn,
                deliverytype: this.state.deliveryType,
                payment: this.state.paymentInfo,
                //get from store or user state based on deliverytype selection made
                deliveryzip: zip,
                storeaddr: straddr,
                storename: strnm
                //set below incase of CSR
                //  selectedUser:selectedUser,
            })
        }).then(response => response.json())
            .then(data=>alert("Order placed succsessfully with order id #"+data.orderid+" and it will be deliver/pickup by "+arriveby))
            .then(this.props.onRouteChange('home'))
            .then(this.props.updateCartDetails(0))
            .catch(err => console.log(err))
    }

    setCardDetails = (event) => {
        this.setState({
            paymentInfo: event.target.value
        })
    }

    setDeliveryType = (event) => {
        var zip = '';
        if( this.props.state.selectedUser!=null)
        zip = this.props.state.selectedUser.split('_')[5]
        else
        zip = this.props.state.user.zipcode

        if (event.target.value == "pickup") {
            fetch('http://localhost:5000/stores', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // location: this.props.state.user.zipcode
                    location: zip
                })
            }).then(response => response.json()).then(data => this.setState({ stores: data, storesloaded: true }))
            this.setState({
                deliveryType: event.target.value
            })
        }
        else {
            this.setState({
                deliveryType: event.target.value
            })
        }
    }


    render() {
        return (
            <div>
                <nav>
                    <div className=''>
                        <div> <img src={logo} onClick={() => this.props.onRouteChange('home')} className='pl3 dim pointer mw4 ma2' /> </div> <text className='f3 ma3 pl3 fw7'> Review your Order </text>
                        <div class='checkout-grid pl4 mt5 mb5 pt2'>
                            <div className="pt4 border flex justify-around align-center">
                                <div className='w5'> 
                                    <div className='flex justify-between mt2'>
                                        <input defaultChecked className='mt2' type='radio' value='delivery' name='deliveryType' onChange={this.setDeliveryType.bind(this)} /> <text className='fw5 navy'> Delivery </text>
                                        <input className='mt2' onChange={this.setDeliveryType.bind(this)} type='radio' value='pickup' name='deliveryType' /> <text className='fw5 navy'>Pickup </text>
                                    </div>
                                    {this.state.deliveryType == 'delivery' ?
                                    (this.props.state.selectedUser!=null)?<div className="mt4">
                                    <text className='fw5 f4'>Shipping Address</text> <br />
                                    <text>{this.props.state.selectedUser.split('_')[1]}</text> <br />
                                    <text>{this.props.state.selectedUser.split('_')[2]}</text> <br />
                                    <text>{this.props.state.selectedUser.split('_')[3]} , {this.props.state.selectedUser.split('_')[5]} </text> <br />
                                </div>:
                                        <div className="mt4">
                                            <text className='fw5 f4'>Shipping Address</text> <a className='dark-blue underline dim pointer'>Change</a> <br />
                                            <text>{this.props.state.user.ad1}</text> <br />
                                            <text>{this.props.state.user.ad2}</text> <br />
                                            <text>{this.props.state.user.city} , {this.props.state.zipcode} </text> <br />
                                        </div>
                                        : <div className="mt4 mr2 pr2">
                                            <text className='fw5 f4 pb4'>Pickup Address</text> <br />
                                            <select className='pt4 mt4' onChange={this.onStoreSelect.bind(this)} className='pa2 mw16 mb3' id="store" name="store">

                                                <option value=''>Select</option>
                                                
                                                if(this.state.storesloaded){
                                                    console.log("Just for checking",this.state.stores)
                                                }
                                               
                                                if(this.state.storesloaded&&this.state.stores.length!=0){
                                                   
                                                    this.state.stores.map(store => {
                                                        return (<option value={store.storename + '_' + store.zipcode + '_' + store.address[0] + '_' + store.address[1]}>{store.storename +', '+store.zipcode + ' - ' + store.distance.toFixed(2) + ' Km Away'}</option>)
                                                    })
                                                }
                                            </select>

                                        </div>
                                    }
                                </div>
                                <div className='pl4'>
                                    <text className='fw5 f4'>Payment</text><br />
                                    <input className='pa2 mt2 br3 mb2 ba b--gray' type='text' placeholder='Enter Credit Card' onChange={this.setCardDetails.bind(this)} /><br />
                                    {/* <text className='anvy pointer dim'>Use gift card instead</text> <br /> */}
                                    <br />
                                    {(this.props.state.selectedUser!=null)?<div className="mt4">
                                    <text className='fw5 f4'>Billing Address</text> <br />
                                    <text>{this.props.state.selectedUser.split('_')[1]}</text> <br />
                                    <text>{this.props.state.selectedUser.split('_')[2]}</text> <br />
                                    <text>{this.props.state.selectedUser.split('_')[3]} , {this.props.state.selectedUser.split('_')[5]} </text> <br />
                                </div>: <div className="mt4">
                                            <text className='fw5 f4'>Billing Address</text> <br />
                                            <text>{this.props.state.user.ad1}</text> <br />
                                            <text>{this.props.state.user.ad2}</text> <br />
                                            <text>{this.props.state.user.city} , {this.props.state.zipcode} </text> <br />
                                        </div>}
                                    
                                    {/* <text className='fw5 f4'> Billing Address </text><br />
                                    <text>{this.props.state.user.ad1}</text> <br />
                                    <text>{this.props.state.user.ad2}</text> <br />
                                    <text>{this.props.state.user.city} , {this.props.state.zipcode} </text>  */}
                                    <br />
                                </div>
                                <span><text className='fw5 f5'>Add a gift card, promotion code, or voucher</text> <br />
                                    <input className='pa2 mt3 br3 ba b--gray' type='text' placeholder='Enter Code' />
                                    <button type='submit' name='apply' className="pl3 pr3 pt2 pb2 ma1 br3  ba b--gray"> Apply </button>
                                </span>
                            </div>
                            
                            <div className="ml4 mr4 border flex-row justify-center align-center">
                                <button className="pa3 dim ml4 ph5 mt3 navy bg-gold br2 pointer" onClick={() => this.checkout(this.state.user)}> Place your order </button> <br />
                                <div className='mt2 ml4'> By placing your order, you agree to Groceryhub's terms and conditions</div>
                                <div className='mt2 ml4 f4 fw5'> Order Summary </div>
                                <div className='mr4 ml4 flex justify-between'>
                                    <text> Total:</text>
                                    <text>$ {this.props.state.cartTotal}</text>
                                </div>
                                <div className='mr4 ml4 flex justify-between'>
                                    <text>Shipping and handling:</text>
                                    <text>$ 1.99</text>
                                </div>
                                <hr className='ml4 mr4' />
                                <div className='mr4 ml4 flex ma3 justify-between'>
                                    <text className='dark-red fw6 f4'>Order Total:</text>
                                    <text className='dark-red fw6 f4'>{`$ ${(parseFloat(this.props.state.cartTotal) + parseFloat("1.99")).toFixed(2)}`}</text>
                                </div>
                            </div>
                           { (this.state.deliveryType == 'delivery')?  <div></div>:<StoreLocator loadUser={this.props.loadUser} state={this.props.state} navigateToProductPage={this.props.navigateToProductPage} onRouteChange={this.props.onRouteChange}> </StoreLocator>}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Checkout;