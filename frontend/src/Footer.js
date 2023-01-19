import React from 'react';
import pm from './media/payment-methods.png';

const Footer = () =>{
    return(
        <div style={{backgroundImage: "linear-gradient(#001B44, #001B15)"}} className='bg-navy pa4 mt1'>
        <div className='near-white flex justify-around mt2'>
        <div>
            <h5 className='mb3' >Get to Know Us</h5>
            <p>Careers</p>
            <p>About Grocery Hub</p>
            <p>Press Release</p>
        </div>
        <div>
            <h5 className='mb3'>Make Money with Us</h5>
            <p>Sell Products on Grocery Hub</p>
            <p>Become a Delivery Driver</p>
            <p>Start a Package Delivery Business</p>
            <p>Advise Your Products</p>
        </div>
        <div>
            <h5 className='mb3'> Let Us Help You</h5>
            <p>Covid-19</p>
            <p>Your Account</p>
            <p>Your Orders</p>
            <p>Shipping & Policies</p>
        </div>
        <div>
        <img className="mw6" src={pm} alt='Payment Methods' />
        </div>
        </div>
        <div className='white flex justify-around' >
        <h6 style={{zIndex:"1"}}>All rights reserved for Grocery Hub© Inc. 2021</h6>
        </div>
        </div>
    )
}

export default Footer;