import React from 'react';
import Card from './ProductCard';


const arr = [
    {
        "productName": "Aloo",
        "productCode": "24AS45",
        "productPrice": "2.99",
        "productTitle": "Nature Fresh - Organic Potatoes Picked Selectively",
        "productRatings": '5',
        "productReviewCount": '524',
        "productBrand": "Farm Fresh",
        "productCategory": "Farm Produce"
    },
    {
        "productName": "Shimla Mirch",
        "productCode": "AS349D",
        "productPrice": "4.99",
        "productTitle": "Nature Fresh - Organic Bell Peppers Picked Selectively",
        "productRatings": '4.9',
        "productReviewCount": '152',
        "productBrand": "Farm Fresh",
        "productCategory": "Farm Produce"

    },
    {
        "productName": "Brown Ande",
        "productCode": "423FE4",
        "productPrice": "9.99",
        "productTitle": "Veg Eggs Picked Selectively",
        "productRatings": '3.5',
        "productReviewCount": '654',
        "productBrand": "Farm Fresh",
        "productCategory": "Farm Produce"

    },
    {
        "productName": "Carrots",
        "productCode": "6234FAQ",
        "productPrice": "1.69",
        "productTitle": "Nature Fresh - Organic Carrots Picked Selectively",
        "productRatings": '5',
        "productReviewCount": '524',
        "productBrand": "Farm Fresh",
        "productCategory": "Farm Produce"

    }

]

const Recommendations = ({ state, navigateToProductPage }) => {

    return (
        <div >
            {
                state.products.map((users, i) => {
                    return <Card
                        navigateToProductPage={navigateToProductPage}
                        key={state.products[i].Id}
                        name={state.products[i].Product}
                        title={state.products[i].Brand}
                        price={state.products[i].Price}
                        image={state.products[i].image_small}
                    />;
                })
            }</div>
    );
}

export default Recommendations;