import React, { Component } from 'react';
import './Manager.css';
const initialstate = {
    users: [],
    orderid: [],
    loadedOrder: false,
    selectedOrderId: '',
    selectedUser: '',
    msg: '',
    order: {},
    responseArrived: false
}

class ModifyOrder extends Component {
    constructor(props) {        super(props);
        document.getElementById('msg').textContent='';
        this.state = initialstate
        fetch('http://localhost:5000/getusernamelist', {
            method: "get",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => this.setState({ users: data }))
    }
    componentWillUnmount() {
        this.setState(initialstate)
    }

    onUserSelect = (event) => {
        this.setState({ selectedUser: event.target.value, orderid: [], msg: '' })
        fetch('http://localhost:5000/getorderidbyuser', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: event.target.value })
        })
            .then(response => response.json())
            .then(data => this.setState({ orderid: data, loadedOrder: true }))

        console.log("user selected ", event.target.value)
    }
    onOrderSelect = (event) => {
        this.setState({ selectedOrderId: event.target.value });
    }
    fetchOrderbyId = (orderid, username) => {
        fetch('http://localhost:5000/getorderbyidanduser', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                orderid: orderid
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log('Ye aya id wala order:', response)
                    this.setState({ order: response, responseArrived: true })
                }
            })
            .catch(err => console.log("Blunder ho gya" + err))
    }

    updateQuantity(oldQuantity, productid, username, event, price) {
        console.log("updateQuantity event fired");
        console.log("updateQuantity oldQuantity", oldQuantity);
        console.log("updateQuantity oldQuantity", price);
        console.log("updateQuantity productid", productid);
        console.log("updateQuantity username", username);
        console.log("updateQuantity event", event.target.value);
        console.log("updateQuantity subtotal", this.state.subtotal);
        console.log("updateQuantity body username", this.props.state.user.username);
        console.log("updateQuantity body username", this.props.state.cart.totalItems);
    }

    onCancelItem = () => { }
    modifyorder = (selectedOrderId, selectedUser) => {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         username:selectedUser,
        //         orderid:selectedOrderId
        //     })
        // };
        // fetch('http://localhost:5000/cancelorder',requestOptions)
        //     .then(response => response.json())
        //     .then(data=>this.setState({msg:data.msg}))
        //     .then(fetch('http://localhost:5000/getorderidbyuser', {
        //         method: "post",
        //         headers: { 'Content-Type': 'application/json' },
        //         body:JSON.stringify({username:selectedUser})
        //     })
        //         .then(response => response.json())
        //         .then(data => this.setState({ orderid: data,loadedOrder:true })))
        // console.log("order to be deleted :",selectedOrderId,selectedUser)
    }

    render() {
        return (
            <div className='flex justify-center'>
                <div className='flex items-center'>
                    <div className='ma5 pa4 shadow bg-white'>
                        {this.state.msg != '' ? <div>{this.state.msg}</div> : <div></div>}
                        <div className='profilegrid ma2 pa2'>
                            <label className="db fw6 lh-copy f6" htmlfor="username">Select a username</label>
                            <div></div>
                            <select onChange={this.onUserSelect} className='pa2 mw16 mb3' id="username" name="username">
                                <option value=''>Select</option>
                                if({this.state.users.length}!=0){
                                    this.state.users.map(user => {
                                        return (<option value={user.username}>{user.username}</option>)
                                    })
                                }
                            </select>
                        </div>
                        {this.state.loadedOrder && this.state.orderid.length == 0 ? <div>There is no order for the selected user: {this.state.selectedUser}</div> :
                            <div className='profilegrid ma2 pa2'>
                                <label className="db fw6 lh-copy f6" htmlfor="product">Select OrderId</label>
                                <div></div>

                                <select onChange={this.onOrderSelect.bind(this)} className='pa2 mw16 mb3' id="product" name="product">

                                    <option value=''>Select</option>

                                    {this.state.orderid.map(order => {
                                        return (<option value={order.orderid}>{order.orderid}</option>)
                                    })}

                                </select>
                            </div>}
                        <div className='flex justify-center'><button className='mt3 mb2 br3 fw7 bco f3 link black pointer' onClick={() => { this.fetchOrderbyId(this.state.selectedOrderId, this.state.selectedUser) }}> Modify Order </button></div>
                        <div className='flex-row items-center'>
                            {(this.state.responseArrived) ?
                                this.state.order.map((item) => {
                                    return (
                                        <div className='shadow mt2 cartgrid2'>
                                            {console.log(item)}
                                            <div className='mw4'> <img className='ma4' height="60%" src={item.image_small} /> </div>
                                            <div>
                                                <h5 className='pt4'>{item.product}</h5>
                                                <h5>{`$ ${(item.Price / 40).toFixed(2)}`}</h5>
                                                <span>  <text className='navy f5'>Quantity : <input min="1" max="100"
                                                    onChange={(e) => this.updateQuantity(item.quantity, item.pid, this.state.selectedUser, e, item.Price)} className='f7 mw2 pa0' type="number" defaultValue={item.quantity} />
                                                </text>  </span>
                                                <text className='ma1 gray'> | </text> <text> Eligible for Free Returns</text>
                                                <br />
                                                <text className='mt2 navy dim pointer' onClick={(e) => this.onCancelItem(item.quantity, item.pid,e,  this.state.selectedUser, item.Price)}> Cancel Item </text>
                                            </div>
                                        </div>)
                                })
                                : <div> </div>} </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ModifyOrder;