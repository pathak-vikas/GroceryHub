import React from 'react';
import './App.css'



const Card = ({openReviews, onRouteChange, deleteProduct, navigateToProductPage, Id, Product, Brand, Price, image, state, Category, Rebate}) => {
    return (
        <div className="bg-white shadow dib br2 pa3 ma2 bw2 shadow-s" style={{ height: "20rem", width: "21.5rem", "overflow": "hidden", "text-overflow": "ellipsis" }}>
            <img alt='Robots Family' className='ml4 pointer' style={{ height: "200px", width: "auto", display: "flex", justifyContent: "center" }} src={image} onClick={() => navigateToProductPage(Product)} />
            <div>
                <div className="flex flex-column jutify-between">
                    <h6 className='pt2 dark-blue dim truncate pointer' onClick={() => navigateToProductPage(Product)}>
                        {Product}
                    </h6>
                    <div className='flex justify-between'>
                        <p className='ma0 ark-blue'>
                            {`$ ${(Price / 40).toFixed(2)}`}
                        </p>
                        <p onClick={() => openReviews(Id, Product, Brand, image, Category, Rebate)} className='ma0 pointer dim d dark-blue pr4'>
                            Reviews
                        </p>
                    </div>
                    <div className='twocolgrid'>
                        <p className='ma0 pointer dim dark-blue'>
                            {Brand}
                        </p>
                        {(state == 'sm') ?
                            <p onClick={() => deleteProduct(Id)} className='ma0 pointer dim dark-blue'>
                                Delete
                            </p>
                            : <div> </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Card;