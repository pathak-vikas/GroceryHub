import React, { Component } from 'react';
import './Manager.css';
const initialstate = {
    users: [],
    orderid: [],
    loadedOrder:false,
    selectedOrderId: '',
    selectedUser:'',
    msg:''
}

class CancelOrder extends Component {
    constructor(props) {
        super(props);
        document.getElementById('msg').textContent='';
        this.state = initialstate
        fetch('http://localhost:5000/getusernamelist', {
            method: "get",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => this.setState({ users: data }))
    }
    onUserSelect = (event) => {
        this.setState({ selectedUser: event.target.value,orderid:[],msg:'' })
        fetch('http://localhost:5000/getorderidbyuser', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({username:event.target.value})
        })
            .then(response => response.json())
            .then(data => this.setState({ orderid: data,loadedOrder:true }))

        console.log("user selected ",event.target.value)
    }
    onOrderSelect = (event) => {
        this.setState({ selectedOrderId: event.target.value });
    }

    deleteOrder=(selectedOrderId,selectedUser)=>{
        // productobj.username=username;
        // console.log("before add to cart fetch call ",productobj)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username:selectedUser,
                orderid:selectedOrderId
            })
        };
        fetch('http://localhost:5000/cancelorder',requestOptions)
            .then(response => response.json())
            .then(data=>this.setState({msg:data.msg}))
            .then(fetch('http://localhost:5000/getorderidbyuser', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({username:selectedUser})
            })
                .then(response => response.json())
                .then(data => this.setState({ orderid: data,loadedOrder:true })))
        console.log("order to be deleted :",selectedOrderId,selectedUser)


    }

    render() {
        return (
            <div className='flex justify-center'>
                <div className='flex items-center'>
                    <div className='ma5 pa4 shadow bg-white'>
                        {this.state.msg!=''?<div>{this.state.msg}</div>:<div></div>}
                        <div className='profilegrid ma2 pa2'>
                            <label className="db fw6 lh-copy f6" htmlfor="username">Select a username</label>
                            <div></div>
                            <select onChange={this.onUserSelect}  className='pa2 mw16 mb3' id="username" name="username">
                                <option value=''>Select</option>
                                if({this.state.users.length}!=0){
                                   this.state.users.map(user=>{
                                    return(<option value={user.username}>{user.username}</option>)
                                   })
                                }
                            </select>
                        </div>

                       { this.state.loadedOrder&&this.state.orderid.length==0?<div>There is no order for the selected user: {this.state.selectedUser}</div>:
                        <div className='profilegrid ma2 pa2'>
                            <label className="db fw6 lh-copy f6" htmlfor="product">Select OrderId</label>
                            <div></div>
                            
                            <select onChange={this.onOrderSelect.bind(this)} className='pa2 mw16 mb3' id="product" name="product">
                                
                                <option value=''>Select</option>
                                
                                   {this.state.orderid.map(order=>{
                                    return(<option value={order.orderid}>{order.orderid}</option>)
                                   })}
                                
                            </select>
                        </div> }

                        {/* {(this.state.category == '' || this.state.selectedProduct == '') ? <div> </div>
                            : <div className='flex-row'>
                                <div className='flex justify-center'> <img src={this.state.productobj.image_small} alt='ABC' /> </div>
                                <div className='profilegrid ma2 pa2'>
                                    <div>Product Title</div>
                                    <div></div>
                                    <div className='mb2' type='text' placeholder='Sub-category'>{this.state.productobj.Product}</div>

                                    <div>Product Price</div>
                                    <div></div>
                                    <div className='mb2' type='text' placeholder='Sub-category'>$ {(this.state.productobj.Price/40).toFixed(2)}</div>
                                </div>
                            </div>} */}

                        <div> </div>
                        <div> </div>
                        <div className='flex justify-center'><button className='mt3 mb2 br3 fw7 bco f3 link black pointer' onClick={() => { this.deleteOrder(this.state.selectedOrderId,this.state.selectedUser)}}> Delete Order </button></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CancelOrder;