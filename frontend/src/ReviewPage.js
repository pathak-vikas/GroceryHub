import React, { Component } from "react";

const initialstate = {
    reviews: []
}

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate
    }
    selectreviewbypid = (pid) => {
        fetch('http://localhost:5000/selectreviewbypid', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                pid: pid
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    this.setState({
                        reviews: response
                    })
                    console.log("ye hai response :", this.state.reviews)
                }
            })
    }
    componentDidMount = () => {
        this.selectreviewbypid(this.props.state.pidForReview)
    }
    render() {
        return (
            <div>
                <div>
                <div className='flex justify-center bg-light-gray'>
                    <div className='flex items-center'>
                        <div className='pa3 ma5 shadow bg-white'>
                            <img src = {"pid"} alt = "Product Image"/>
                            <h5>{this.state.reviews.productName}</h5>
                        </div>
                    </div>
                </div>
                </div>
                <div className='flex justify-center bg-light-gray'>
                    <div className='flex items-center'>
                        <div className='pa3 ma5 shadow bg-white'>
                            {this.state.reviews.map((items, i) => {
                                return (
                                    <div className='pa4 fw5 f4 navy'>
                                        <h5> {`${items.username} wrote`} </h5>
                                        <h6>{`${items.rating} , ${items.title}`}</h6>
                                        <h4>{items.reviewText}</h4>
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Reviews;