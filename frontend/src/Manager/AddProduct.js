import { method } from "lodash";
import React, { Component } from "react"
const initialstate = {
}


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
    }

    onInputChange = (event) => {
        const value = event.target.value;
        console.log("state created and its value", event.target.name, value)
        this.setState({ [event.target.name]: value })
    }

    // fetchProductsForCategory = (category) =>{
    //     fetch('http://localhost:5000/products',{
    //     method:'post',
    //     headers : {'content-type' : 'application/json'},
    //     body : JSON.stringify({
    //         category : category
    //     })
    // })
    // .then()
    // }

    submitDetails = (params) => {
        console.log('Ye hai Params :', params)
        fetch('http://localhost:5000/addproduct', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                 Brand : params.Brand,
                 Product : params.Product,
                 Quantity : params.Quantity,
                 Price : params.Price,
                 MRP : params.MRP,
                 Category : params.Category,
                 image_small : params.image_small,
                 rebate : params.rebate,
                 stock : params.stock,
            })
        })
        .then(response => response.json())
        .then(data=> {
            
            var prods=this.props.state.products;
            var prodobj={
                Id:data.productid,
                Brand : params.Brand,
                Product : params.Product,
                Quantity : params.Quantity,
                Price : params.Price,
                MRP : params.MRP,
                Category : params.Category,
                image_small : params.image_small,
                rebate : params.rebate,
                stock : params.stock

            }
            prods.push(prodobj)
            this.props.setState({products:prods})
            alert("Product added successfully with product id : "+data.productid )})
    }

    render() {
        return (
            <div className='flex justify-center'>
                <div className='flex items-center'>
                    <div className='ma5 pa4 shadow bg-white profilegrid'>
                        <div className='f4 pl4 pr4 pt2 pb2'>Brand</div>
                        <div className='pa1'></div>
                        <input className='mb2' type='text' name="Brand" onChange={this.onInputChange.bind(this)} placeholder='Uniliver, Nestle, P&G ...'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Product</div>
                        <div className='pa1'></div>
                        <input className='mb2' type='text' name="Product" onChange={this.onInputChange.bind(this)} placeholder='Enter product type'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Quantity</div>
                        <div className='pa1'></div>
                        <input className='mb2' type='text' name="Quantity" onChange={this.onInputChange.bind(this)} placeholder='Enter quantity & units'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Selling Price</div>
                        <div className='pa1'></div>
                        <input className='mb2' type='text' name="Price" onChange={this.onInputChange.bind(this)} placeholder='Enter selling price'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Retail Price</div>
                        <div className='pa1'></div>
                        <input className='mb2' type='text' name="MRP" onChange={this.onInputChange.bind(this)} placeholder='Enter retail price'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Rebate</div>
                        <div className='pa1'></div>
                        <input className='mb2' type='text' name="rebate" onChange={this.onInputChange.bind(this)} placeholder='Enter Manufacturer Rebate ...'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Stock</div>
                        <div className='pa1'></div>
                        <input className='mb2' type='text' name="stock" onChange={this.onInputChange.bind(this)} placeholder='100,50,20,10 ...'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Category</div>
                        <div className='pa1'></div>
                        <select onChange={this.onInputChange.bind(this)} className='pa2 mw16 mb3' id="category" name="Category">
                            <option value=''>Select</option>
                            <option value="fruits vegetables">Fresh Produce</option>
                            <option value="eggs meat fish">Eggs,Meat & Fish</option>
                            <option value="beverages">Beverages</option>
                            <option value="baby care">Baby Care</option>
                            <option value="snacks branded foods">Snacks & Brand Foods</option>
                            <option value="cleaning household">Cleaning & Household</option>
                            <option value="bakery cakes dairy">Bakery & Dairy</option>
                        </select>


                        <div className='f4 pl4 pr4 pt2 pb2'>Gallery</div>
                        <div className='pa1'></div>
                        <input className='mb2' type='text' name="image_small" onChange={this.onInputChange.bind(this)} placeholder='Image URL ...'></input>

                        <div> </div>
                        <div> </div>
                        <div className='flex justify-center'><button className='ml5 mt3 mb2 br3 fw7 bco f3 link black pointer' onClick={() => {this.submitDetails(this.state)}}> Add Product </button></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProduct;