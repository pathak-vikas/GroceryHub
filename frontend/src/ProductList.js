import { initial } from 'lodash';
import React, { Component } from 'react';
import Card from './ProductCard';

const initialstate = {
    updateAvailable: false,
    productFilter: ''
}

class Cardlist extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    // componentWillUnmount(){
    //     this.props.setCategory(false, '')
    // }

    deleteProduct = (id) => {
        console.log(id)
        fetch('http://localhost:5000/deleteproduct', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json()).then(response => {
                alert("Product deleted successfully!!");
            })
            .then(this.props.fetchProducts())
    }

    render() {
        // (this.props.state.)
        return (
            <div>
                {(this.props.state.categoryFlag == true) ?
                    <div >
                        {
                            this.props.state.products
                                .filter(items => items.Category == this.props.state.category)
                                .map((products, i) => {
                                    return <Card
                                        openReviews={this.props.openReviews}
                                        onRouteChange={this.props.onRouteChange}
                                        deleteProduct={this.deleteProduct}
                                        state={this.props.state.user.role}
                                        navigateToProductPage={this.props.navigateToProductPage}
                                        // product = {this.props.state.products[i]}
                                        Id={products.Id}
                                        Product={products.Product}
                                        Brand={products.Brand}
                                        Price={products.Price}
                                        image={products.image_small}
                                    />;
                                })
                        }</div>
                    : <div>
                        {
                            this.props.state.products
                                // .filter(items => items.Category == this.props.state.category)
                                .map((products, i) => {
                                    return <Card
                                        openReviews={this.props.openReviews}
                                        onRouteChange={this.props.onRouteChange}
                                        deleteProduct={this.deleteProduct}
                                        state={this.props.state.user.role}
                                        navigateToProductPage={this.props.navigateToProductPage}
                                        // product = {this.props.state.products[i]}
                                        Id={products.Id}
                                        Product={products.Product}
                                        Brand={products.Brand}
                                        Price={products.Price}
                                        image={products.image_small}
                                    />;
                                })
                        }
                    </div>}
            </div>);
    }
}

export default Cardlist;