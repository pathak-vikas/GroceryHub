import { React, Component } from 'react';
import apple from './media/apple.jpg';
import Navigation from './Nav.js';



class ProductPage extends Component {
    constructor(props) {
        super(props);
        var product = this.props.state.products.filter(product => product.Product == this.props.state.selectedProduct);
        var productobj = product[0];
        //TDRC
        // if(this.props.state.user.isSignedIn){
        //     fetch('http://localhost:5000/detailview', {
        //         method: 'post',
        //         headers: { 'content-type': 'application/json' },
        //         body: JSON.stringify({
        //             username:this.props.state.username,
        //             Id:productobj.Id
        //         })
        //     })
        //     .then(response => response.json())
        // }
    }

    addToCartNode = (productobj, username) => {
        console.log("Chal hat " + username)
        productobj.username = username;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productobj })
        };
        console.log("This is json addtocart" + JSON.stringify({ productobj }));
        fetch('http://localhost:5000/addtocart', requestOptions)
            .then(response => response.json())
            .then(response => this.props.updateCartDetails(response[0].itemcount))
        //    .then(response => this.props.updateCartDetails(this.))
    }

    render() {

        var product = this.props.state.products.filter(product => product.Product == this.props.state.selectedProduct);
        var productobj = product[0];
        console.log("this is product found", product);




        return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr" }}>
                <div className='ml6 flex justify-center'>
                    <div className='flex items-center'>
                        <img height="60%" src={product[0].image_small} />
                    </div>
                </div>
                <div>
                    <article style={{ maxWidth: "35rem" }} className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 center">
                        <main className="pa4 ml1 black-80">
                            <div className="measure">
                                <p className="ma0"> {product[0].Brand} </p>
                                <legend className="f2 fw5 pb2 ph0 mh0">{product[0].Product}</legend>

                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <span className='flex flex-wrap'>
                                        <h3>
                                            {`$ ${(product[0].Price / 40).toFixed(2)}`}
                                        </h3>
                                        <p className='ml2 pl2 f6 pt2 fw4'> $1.50/oz </p>
                                        {/* <p className='ml2 pl2 pt2 underline pointer dim f6'>Terms apply</p> */}
                                    </span>
                                    <div className='pt2'>
                                        <p className="ma0 pb2"> Shipping, arrives by <text className='b'> Sat, 18 Dec</text> {(this.props.state.isSignedIn)?'to':''} <text className='dim pointer underline'>{(this.props.state.isSignedIn)?this.props.state.user.zipcode:''}</text></p>
                                        <p className="ma0 pb2"> Pickup not available at this store </p>
                                        <p className="ma0 pb2"> Sold and Shipped by <text className='dim pointer underline'>GroceryHub.com</text> </p>
                                        <p className="ma0 pb2"> Free 90-day return <text className='dim pointer underline'>Details </text> </p>
                                    </div>
                                    <div className='pt3'>
                                        <h6 className="mb20 pt2">
                                            In Stock
                                        </h6>
                                        <div className='pt3 flex justify-start'>
                                            {/* <a class="f4 link dim ph3 pv2 mb2 dib white bg-navy br4 pointer ma1" onClick={() => addToCart(product[0])}>Add To Cart</a> */}
                                            {(this.props.state.user.isSignedIn) ?
                                                <div>
                                                    <a class="f4 link dim ph3 pv2 mb2 dib white bg-navy br4 pointer ma1" onClick={() => this.addToCartNode(productobj, this.props.state.user.username)}>Add To Cart</a>
                                                    <a class="f4 link dim ph3 pv2 mb2 dib white bg-navy br4 ma1 pointer ml4">Buy Now</a>
                                                </div>
                                                : <div> <button class="f4 link dim ph3 pv2 mb2 dib white bg-navy br4 pointer ma1" onClick={() => this.props.onRouteChange("signIn")}>Add To Cart</button>
                                                    <button class="f4 link dim ph3 pv2 mb2 dib white bg-navy br4 ma1 pointer ml4">Buy Now</button> </div>}
                                        </div>
                                    </div>
                                </fieldset>
                                {/* <div className="">
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in" />
                            </div> */}
                                {/* <div className="lh-copy mt3 pointer">
                                <p className="f6 link dim black db">Register</p>
                            </div> */}
                            </div>
                        </main>
                    </article>
                </div>
            </div>
        )
    }
}

export default ProductPage;