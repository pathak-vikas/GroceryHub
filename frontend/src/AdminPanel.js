import { initial } from "lodash";
import React, { Component } from "react";
import Cardlist from "./ProductList";
import UpdateProducts from "./Manager/UpdateProducts";
import Inventory from "./Manager/Inventory";
import SalesReport from "./Manager/SalesReport";
import AddUsers from "./Agent/AddUser";
import PlaceOrder from "./Agent/PlaceOrder";
import CancelOrder from "./Agent/CancelOrder";
import ModifyOrder from "./Agent/ModifyOrder";
import AddProduct from "./Manager/AddProduct";

const initialstate = {
    card: '',
}

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
    }
    componentDidMount() {
        if (this.props.state.user.role == 'sm')
            this.setState({ card: 'addproduct' })
        else
            this.setState({ card: 'adduser' })
    }
    changeCardView = (card) => {
        this.setState({ card: card });
        console.log(this.state.card);
    }
    

    submitDetails=()=>{

        fetch('http://localhost:5000/addproduct', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                Brand: this.state.Brand,
                Product: this.state.Product,
                Quantity: this.state.Quantity,
                Price: this.state.Price,
                MRP: this.state.MRP,
                Category: this.state.Category,
                image_small: this.state.image_small,
                rebate: this.state.rebate,
                stock: this.state.stock
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log(response)
                }
            })

    }

    render() {
        return (

            <div>
                {(this.props.state.user.role == 'sm') ?
                    < div className='bg-light-blue shadow'>
                        <div className='pa2 flex justify-around'>
                            <button onClick={() => this.changeCardView('addproduct')} className='br3 fw7 bco f3 shadow link black pointer mt1 mb1 ma2'>Add Product</button>
                            <button onClick={() => this.changeCardView('deleteproduct')} className='br3 fw7 bco f3 shadow link black pointer mt1 mb1 ma2'>Delete Product</button>
                            <button onClick={() => this.changeCardView('updateproduct')} className='br3 fw7 bco f3 shadow link black pointer mt1 mb1 ma2'>Update Product</button>
                            <button onClick={() => this.changeCardView('inventory')} className='br3 fw7 bco f3 link shadow black pointer mt1 mb1 ma2'>Inventory Details</button>
                            <button onClick={() => this.changeCardView('sales')} className='br3 fw7 bco f3 link shadow black pointer mt1 mb1 ma2'>Sales Report</button>
                        </div>
                    </div>
                    : ((this.props.state.user.role == 'csr') ?
                        < div className='bg-light-blue shadow'>
                            <div className='pa2 flex justify-around'>
                                <button onClick={() => this.changeCardView('adduser')} className='br3 fw7 bco shadow f3 link black pointer mt1 mb1 ma2'>Create a user</button>
                                <button onClick={() => this.changeCardView('placeorder')} className='br3 fw7 bco shadow f3 link black pointer mt1 mb1 ma2'>Place an Order</button>
                                <button onClick={() => this.changeCardView('cancelorder')} className='br3 fw7 bco shadow f3 link black pointer mt1 mb1 ma2'>Cancel an Order</button>
                                <button onClick={() => this.changeCardView('modifyorder')} className='br3 fw7 bco shadow f3 link black pointer mt1 mb1 ma2'>Modify Order</button>
                                {/* <button onClick={() => this.changeCardView('sales')} className='br3 fw7 bco f3 link black pointer mt1 mb1 ma2'>Sales Report</button> */}
                            </div>
                        </div>
                        : <div> </div>)}

                < div >
                    {(this.state.card == 'addproduct') ?
                        <AddProduct setState={this.props.setState} fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                        : (this.state.card == 'deleteproduct') ?
                            <Cardlist fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                            : (this.state.card == 'updateproduct') ?
                                <UpdateProducts setState={this.props.setState} fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                                : (this.state.card == 'inventory') ?
                                    <Inventory fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                                    : (this.state.card == 'sales') ?
                                        <SalesReport fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                                        : (this.state.card == 'adduser') ?
                                            <AddUsers fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                                            : (this.state.card == 'placeorder') ?
                                                <PlaceOrder fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                                                : (this.state.card == 'cancelorder') ?
                                                    <CancelOrder fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                                                    : (this.state.card == 'modifyorder') ?
                                                        <ModifyOrder fetchProducts={this.props.fetchProducts} navigateToProductPage={this.props.navigateToProductPage} state={this.props.state} />
                                                        : <div> </div>
                    }
                </div>
            </div >
        )
    }
}

export default AdminPanel;