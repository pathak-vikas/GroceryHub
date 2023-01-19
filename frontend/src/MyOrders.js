import React, { Component } from "react"

const initialState = {
    orders: [],
    responseArrived: false,
    review: '',
    title: '',
    rating: 1,
}

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    fetchOrders = () => {
        console.log(this.props.state.user.username);
        fetch('http://localhost:5000/getorderbyuser', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.props.state.user.username
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log("Ye hain mere Orders :" , response)
                    this.setState({ orders: response, responseArrived: true })
                }
            })
            .catch(err => console.log("Blunder ho gya" + err))
    }
    componentDidMount() {
        this.fetchOrders();
    }
    onReviewChange = (event) => {
        this.setState({
            review: event.target.value
        })
    }
    onTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    onRatingSelect = (event) => {
        this.setState({
            rating: event.target.value
        })
    }
    onPostReview = (title, username, productName, pid, category, zipcode, manufacturer, onsale, rebate, rating, review) => {
        fetch('http://localhost:5000/postreview', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                reviewText: review,
                title : title, 
                username : username, 
                productName : productName, 
                pid : pid, 
                category : category, 
                zipcode : zipcode, 
                manufacturer : manufacturer, 
                onsale : onsale,
                rebate : rebate, 
                rating : rating
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log(response)
                    alert("Rating & Review posted successfully!!");
                }
            })
    }

    render() {
        return (
            <div className='pa2 bg-white shadow ma2'>
                <div>
                    <h2>My Orders</h2>
                    <div>   <hr /> </div>
                    <div >
                        {(this.state.responseArrived && this.props.state.user.isSignedIn) ?
                            this.state.orders.map((item, i) => {
                                return (
                                    <div className='shadow mt2 cartgrid3 mr2'>
                                        <div className='mw4'> <img className='ma4' height="60%" src={item.image_small} /> </div>
                                        <div>
                                            <h5 className='pt4'>{item.product}</h5>
                                            <h5>{`$ ${(item.Price / 40).toFixed(2)}`}</h5> <span> <text className='navy f5'>Quantity : <input readOnly='true' min="1" max="100"  className='f7 mw2 pa0' type="number" defaultValue={item.quantity} /> </text>  </span>
                                            <text className='ma1 gray'> | </text> <text> Eligible for Free Returns</text>
                                            <br />  <br />
                                            <text className='mt2 navy'>Order Id #{item.orderid} </text> <br />
                                            <text className='mt2 navy'> Shipment: {item.deliverytype}</text>
                                            <br />
                                            <text className='mt2 navy'> Purchase Date: {item.purchasedate.substring(0, 10)}</text>
                                            <br />
                                            <text className='mt2 navy'> Status: {item.status}</text>
                                            <br />
                                            {(item.deliverytype=='pickup')?<text className='mt2 navy'> Store Details: {item.storename}  {item.storeaddr.split('_')[0]}</text>
                                            :<text className='mt2 navy'>Delivery Address: {this.props.state.user.ad1},{this.props.state.user.ad2}, {this.props.state.user.zipcode}</text>}
                                        </div>
                                        <div>
                                            <h4 className='mt2'> Post your review here </h4>
                                            <input onChange={this.onTitleChange.bind(this)} type='text' className='pa2 mt4 ba b--light-gray br3 w-75' placeholder='Enter a title' />
                                            <input onChange={this.onReviewChange.bind(this)} type='text' className='pa2 mt2 ba b--light-gray br3 w-75' placeholder='Write your Review' />
                                            <div>
                                                <label className="db mt2 fw6 lh-copy f6" htmlfor="role">Rating</label>
                                                <select defaultValue="Select" onClick={this.onRatingSelect.bind(this)} className='pa2 mw16 mb3 w-50' id="role" name="role">
                                                    <option value="1">Select</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            {/* <div className='flex justify-end'> */}
                                            <button className='ml5 mt3 mb2 br3 fw7 bco f3 link black pointer' onClick={() => { this.onPostReview(this.state.title, item.username, item.product, item.pid, item.Category, item.deliveryzip, item.deliverytype, "Yes", "no",this.state.rating, this.state.review) }}>Submit </button>
                                            {/* </div> */}
                                        </div>
                                    </div>
                                )

                            })
                            // : <div> <h5 className='flex justify-center'> There's nothing in your cart Gareeb </h5> </div>

                            // <div className='shadow mt2 cartgrid2'>
                            //     <div className='mw4'>
                            //         <text>{this.state.orders[0].product}</text>    
                            //         <img className='ma4' height="60%" src={this.state.orders[0].image_small} alt="abcdefghijklmnopqrstuvwxyz" />
                            //     </div>
                            //     <div>
                            //         <h5 className='pt4'>{this.state.orders[0].pid}</h5>
                            //         <h5>{`$ ${(this.state.orders[1].Price / 40).toFixed(2)}`}</h5>
                            //         <span>
                            //             <text className='navy f5'>
                            //                 Quantity :
                            //                 <input min="1" max="100"
                            //                     onChange={(e) => this.updateQuantity(this.state.orders[0].quantity, this.state.orders[0].productid, this.props.state.user.username, e, this.state.orders[0].Price)}
                            //                     className='f7 mw2 pa0' type="number" defaultValue={this.state.orders[0].quantity} />
                            //             </text>
                            //         </span>
                            //         <text className='ma1 gray'> | </text> <text> Eligible for Free Returns</text>
                            //         <br />
                            //         <text className='mt2 navy'> Remove Item </text>
                            //     </div>
                            // </div>
                            : <div className='flex justify-center'>
                                <div className='flex items-center'>
                                    <div className='pa5 ma5 shadow bg-white'>
                                        <h5 className='flex justify-center'> You haven't yet ordered anything </h5>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default MyOrders;