import React, { Component } from 'react';
import './Manager.css';
const initialstate = {
    category: '',
    products: [],
    selectedProduct: '',
    productobj:{},
    hide:true
}

class PlaceOrder extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate
        document.getElementById('msg').textContent=''
    }
    onCategorySelect = (event) => {
        document.getElementById('msg').textContent=''
        this.setState({ category: event.target.value,products: [] })
        var prd=this.props.state.products.filter(function(e){
            return e.Category==event.target.value;
        })
        document.getElementById("product").options.selectedIndex = 0;
        this.setState({products:prd})

        // fetch('http://localhost:5000/products?category='+{cat}, {
        //     method: 'get',
        //     headers: { 'Content-Type': 'application/json' }
        // })
        //     .then(response => response.json()).then(data=>this.setState({products:data}))

        console.log("from on click",event.target.value)
    }
    onProductSelect = (event) => {
        this.setState({ selectedProduct: event.target.value });
        var id=event.target.value;
        var prd=this.props.state.products.filter(function(e){
            return e.Id==id;
        })
        this.setState({ productobj: prd[0] });
        console.log("selected id",id)
        console.log("selected product",prd[0])
    }

    submitDetails=(productobj,username)=>{
        productobj.username=username;
        console.log("before add to cart fetch call ",productobj)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({productobj})
        };
        console.log("This is json addtocart" + JSON.stringify({productobj})); 
        fetch('http://localhost:5000/addtocart',requestOptions)
            .then(response => response.json())
            document.getElementById('msg').textContent=productobj.Product+' : Added to cart'

            alert("Item added to cart for building new order. Head to your cart to select Customer.");
        //    .then(response => this.setState({ products: response }))
    }

    render() {
        return (
            <div className='flex justify-center'>
                <div className='flex items-center'>
                    <div className='ma5 pa4 shadow bg-white'>
                        <div className='profilegrid ma2 pa2'>
                            <label className="db fw6 lh-copy f6" htmlfor="category">Select Product Category</label>
                            <div></div>
                            <select onChange={this.onCategorySelect}  className='pa2 mw16 mb3' id="category" name="category">
                                <option value=''>Select</option>
                                <option value="fruits vegetables">Fresh Produce</option>
                                <option value="eggs meat fish">Eggs,Meat & Fish</option>
                                <option value="beverages">Beverages</option>
                                <option value="baby care">Baby Care</option>
                                <option value="snacks branded foods">Snacks & Brand Foods</option>
                                <option value="cleaning household">Cleaning & Household</option>
                                <option value="bakery cakes dairy">Bakery & Dairy</option>
                            </select>
                        </div>

                        <div className='profilegrid ma2 pa2'>
                            <label className="db fw6 lh-copy f6" htmlfor="product">Select Product</label>
                            <div></div>
                            
                            <select onChange={this.onProductSelect.bind(this)} className='pa2 mw16 mb3' id="product" name="product">
                                
                                <option value=''>Select</option>
                                if({this.state.category}!='' && this.state.products.length!=0){
                                   this.state.products.map(product=>{
                                    return(<option value={product.Id}>{product.Product}</option>)
                                   })
                                }
                            </select>
                        </div>

                        {(this.state.category == '' || this.state.selectedProduct == ''||this.state.hide) ? <div> </div>
                            : <div className='flex-row'>
                                <div className='flex justify-left'> <img width = '10%' height = '10%'src={this.state.productobj.image_small} alt='ABC' /> </div>
                                <div className='profilegrid ma2 pa2'>
                                    <div>Product Title</div>
                                    <div></div>
                                    <div className='mb2' type='text' placeholder='Sub-category'>{this.state.productobj.Product}</div>

                                    <div>Product Price</div>
                                    <div></div>
                                    <div className='mb2' type='text' placeholder='Sub-category'>$ {(this.state.productobj.Price/40).toFixed(2)}</div>
                                </div>
                            </div>}

                        <div> </div>
                        <div> </div>
                        <div className='flex justify-center'><button className='mt3 mb2 br3 fw7 bco f3 link black pointer' onClick={() => { this.submitDetails(this.state.productobj,this.props.state.username)}}>Build Order </button></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlaceOrder;