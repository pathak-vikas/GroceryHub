import React, { Component } from 'react';
import './Manager.css';
const initialstate = {
    category: '',
    products: [],
    selectedProduct: '',
    productobj:{},
    hide:true
    
}

class UpdateProducts extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate
    }
    onCategorySelect = (event) => {
        this.setState({ category: event.target.value,products: [] })
        var prd=this.props.state.products.filter(function(e){
            return e.Category==event.target.value;
        })
        document.getElementById("product").options.selectedIndex = 0;
        this.setState({products:prd,hide:true})

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
        this.setState({ productobj: prd[0],hide:false });
        console.log("selected id",id)
        console.log("selected product",prd[0])
    }

    submitDetails=(productobj,username)=>{

        console.log("selected product",productobj)
        if(!this.state.hide){
            var Id = productobj.Id;
            var Brand = document.getElementById('brd').value
            var Product = document.getElementById('pname').value
            var Quantity = document.getElementById('Qty').value
            var Price = document.getElementById('mrp').value
            var MRP = document.getElementById('sp').value
            var Category = productobj.Category;
            var image_small = document.getElementById('imgsml').value
            var rebate =document.getElementById('rbt').value
            var stock = document.getElementById('stk').value


            var prods=this.props.state.products;
            var objIndex= prods.findIndex((obj => obj.Id == Id));
            prods[objIndex].Brand=Brand
            prods[objIndex].MRP=MRP
            prods[objIndex].Price=Price
            prods[objIndex].Quantity=Quantity
            prods[objIndex].image_small=image_small
            prods[objIndex].rebate=rebate
            prods[objIndex].stock=stock
            this.props.setState({products:prods})


            console.log("params",JSON.stringify({
                Id:Id,
                 Brand : Brand,
                 Product : Product,
                 Quantity : Quantity,
                 Price : Price,
                 MRP : MRP,
                 Category : Category,
                 image_small : image_small,
                 rebate : rebate,
                 stock : stock,
            }) )

            fetch('http://localhost:5000/updateproduct', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    Id:Id,
                     Brand : Brand,
                     Product : Product,
                     Quantity : Quantity,
                     Price : Price,
                     MRP : MRP,
                     Category : Category,
                     image_small : image_small,
                     rebate : rebate,
                     stock : stock,
                })
            })
            .then(response => response.json()).then(this.setState({hide:true})).then(alert('Product updated successfully!!!')).then( document.getElementById("product").options.selectedIndex = 0)

         

        }else{
            alert("Select a product to update first")
        }
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
                            
                            <select  onChange={this.onProductSelect.bind(this)} className='pa2 mw16 mb3' id="product" name="product">
                                
                                <option selected value=''>Select</option>
                                if({this.state.category}!='' && this.state.products.length!=0){
                                   this.state.products.map(product=>{
                                    return(<option value={product.Id}>{product.Product}</option>)
                                   })
                                }
                            </select>
                        </div>

                        {(this.state.category == '' || this.state.selectedProduct == ''||this.state.hide) ? <div> </div>
                            : <div className='flex-row'>
                                <div className='flex justify-center'> <img width = '15%' height = '10%'src={this.state.productobj.image_small} alt='ABC' /> </div>
                                <div key ={this.state.productobj.Product} className='profilegrid ma2 pa2'>

                                    <div className='f4 pl4 pr4 pt2 pb2'>Brand</div>
                                    <div className='pa1'></div>
                                   
                                    <input id ='brd'className='ml4 mr4 mt2 mb2' type='text' defaultValue={this.state.productobj.Brand} ></input>
                                    
                                    <div className='f4 pl4 pr4 pt2 pb2'>Product Title</div>
                                    <div className='pa1'></div>
                                    <input id ='pname'className='ml4 mr4 mt2 mb2' type='text' defaultValue={this.state.productobj.Product} ></input>

                                    <div className='f4 pl4 pr4 pt2 pb2'>Quantity</div>
                                    <div className='pa1'></div>
                                    <input id ='Qty'className='ml4 mr4 mt2 mb2' type='text' defaultValue={this.state.productobj.Quantity} ></input>

                                    <div className='f4 pl4 pr4 pt2 pb2'>Retail Price($)</div>
                                    <div className='pa1'></div>
                                    <input id ='mrp'className='ml4 mr4 mt2 mb2' type='text' defaultValue={(this.state.productobj.MRP/40).toFixed(2)} ></input>

                                    <div className='f4 pl4 pr4 pt2 pb2'>Selling Price($)</div>
                                    <div className='pa1'></div>
                                    <input id ='sp'className='ml4 mr4 mt2 mb2' type='text' defaultValue={(this.state.productobj.Price/40).toFixed(2)} ></input>

                                    <div className='f4 pl4 pr4 pt2 pb2'>Rebate($)</div>
                                    <div className='pa1'></div>
                                    <input id ='rbt'className='ml4 mr4 mt2 mb2' type='text' defaultValue={(this.state.productobj.rebate/40).toFixed(2)} ></input>

                                    <div className='f4 pl4 pr4 pt2 pb2'>Stock</div>
                                    <div className='pa1'></div>
                                    <input id ='stk'className='ml4 mr4 mt2 mb2' type='text' defaultValue={this.state.productobj.stock} ></input>

                                    <div className='f4 pl4 pr4 pt2 pb2'>Image URL</div>
                                    <div className='pa1'></div>
                                    <input id ='imgsml'className='ml4 mr4 mt2 mb2' type='text' defaultValue={this.state.productobj.image_small} ></input>

                                   
                                    {/* <div>Product Title</div>
                                    <div></div>
                                    <div className='mb2' type='text' value >{this.state.productobj.Product}</div>

                                    <div>Product Price</div>
                                    <div></div>
                                    <div className='mb2' type='text' >$ {(this.state.productobj.Price/40).toFixed(2)}*/}
                                    
                                </div>
                            </div>}

                        <div> </div>
                        <div> </div>
                        <div className='flex justify-center'><button className='mt3 mb2 br3 fw7 bco f3 link black pointer' onClick={() => { this.submitDetails(this.state.productobj,this.props.state.username)}}>Update Product</button></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateProducts;