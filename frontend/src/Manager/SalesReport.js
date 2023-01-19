import _ from 'lodash';
import React, { Component } from 'react';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import './Manager.css';
import { scroller } from "react-scroll";
// import { Chart } from "react-google-charts";

const initialstate = {
    sales: [],
    sales2: [],
      data2:[],
    responseArrived: false,
    responseArrived2: false,
}

const scrollToSection = () => {
    scroller.scrollTo("scrollHere2", {
      duration: 1000,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
//   const data = [
//     ["City", "2010 Population", "2000 Population"],
//     ["New York City, NY", 8175000, 8008000],
//     ["Los Angeles, CA", 3792000, 3694000],
//     ["Chicago, IL", 2695000, 2896000],
//     ["Houston, TX", 2099000, 1953000],
//     ["Philadelphia, PA", 1526000, 1517000],
//   ];
  
//    export const options = {
//     title: "Sales Report",
//     chartArea: { width: "50%" },
//     hAxis: {
//       title: "Total Sales",
//       minValue: 0,
//     },
//     vAxis: {
//       title: "Products",
//     },
//   };

// export const data = [
//     ["City", "2010 Population"],
//     ["New York City, NY", 8008000],
//     ["Los Angeles, CA",  3694000],
//     ["Chicago, IL",  2896000],
//     ["Houston, TX",  1953000],
//     ["Philadelphia, PA", 1517000]
//   ];
  
  const options2 = {
    title: "Sales Report",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Sales",
      minValue: 0,
      slantedText:true, 
      slantedTextAngle:45
    },
    vAxis: {
      title: "Products",
      slantedText:true, 
      slantedTextAngle:45
    },
  };
class SalesReport extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
    }
    getInventory = () => {
       
        fetch('http://localhost:5000/getdailysales', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                role: "strmgr"
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    this.setState({ sales: response,responseArrived: true});
                }
            })
    }
    getInventory2 = () => {
        var data2=[];
        fetch('http://localhost:5000/gettotalsales', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                role: "strmgr"
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    this.setState({ sales2: response});
                    console.log(response)
                }
            }).then( response =>{
                //this.state.inventory.map(item=>{return([item.Product,item.stock])})
                data2.push(["Product Name" , "Total Sales"]);
                 this.state.sales2.map(item=>data2.push([item.Product.toString(),parseFloat(item.total/40)]));
                 console.log("Bar chart data",data2)
               
            }
            ).then( this.setState({ data2:data2, responseArrived2: true }))//this.setState({ data:data, responseArrived2: true }))
    }

    componentDidMount() {
        this.getInventory();
        this.getInventory2();
    }

    render(){
        return (
            <div>
                <div className='flex-row items-center'>
                    <div className='flex-row justify-center'>
                        <div className='ma5 pa4 shadow bg-white flex justify-center '>
                            <table className=''>
                                <th className='pa2 pr4 ba b--light-gray'>Product Name</th>
                                <th className='pa2 pr4 ba b--light-gray'>Price</th>
                                <th className='pa2 pr4 ba b--light-gray'>Sales Quantity</th>
                                <th className='pa2 pr4 ba b--light-gray'>Total</th>
                                {(this.state.responseArrived2 == true) ?
                                    this.state.sales2.map((item, i) => {
                                        return (<tr>
                                            <td className='pa2 pr4 ba b--light-gray'>{item.Product}</td>
                                            <td className='pa2 pr4 ba b--light-gray'>$ {(item.Price/40).toFixed(2)}</td>
                                            <td className='pa2 pr4 ba b--light-gray'>{item.salesquantity}</td>
                                            <td className='pa2 pr4 ba b--light-gray'>$ {(item.total/40).toFixed(2)}</td>
                                        </tr>
                                        )
                                    })
                                    : <div> </div>}
                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className=' scrollHere2 flex-row items-center'>
                    <div className='flex-row justify-center'>
                        <div className='ma5 pa4 shadow bg-white flex justify-center '>
                        
                                {(this.state.responseArrived2 == true) ?
                                   <Chart
                                   chartType="BarChart"
                                   width="100%"
                                   height="400px"
                                   data={this.state.data2}
                                   options={{
                                    title: "Sales Report",
                                    chartArea: { width: "50%" },
                                    hAxis: {
                                      title: "Total Sales",
                                      minValue: 0,
                                    },
                                    vAxis: {
                                      title: "Products",
                                    },
                                  }}
                                 />
                                    : <div> </div>}
                          
                        </div>
                    </div>
                </div> */}
                <div className='flex-row items-center'>
                    <div className='flex-row justify-center'>
                        <div className='ma5 pa4 shadow bg-white flex justify-center '>
                            <table className=''>
                                <th className='pa2 pr4 ba b--light-gray'>Purchase Date</th>
                                <th className='pa2 pr4 ba b--light-gray'>Sold Quantity</th>
                                <th className='pa2 pr4 ba b--light-gray'>Total Sales</th>
                                {(this.state.responseArrived == true) ?
                                    this.state.sales.map((item, i) => {
                                        return (<tr>
                                            <td className='pa2 pr4 ba b--light-gray'>{item.purchasedate.substring(0, 10)}</td>
                                            <td className='pa2 pr4 ba b--light-gray'>{item.soldquantity}</td>
                                            <td className='pa2 pr4 ba b--light-gray'>$ {(item.totalsales/40).toFixed(2)}</td>
                                        </tr>
                                        )
                                    })
                                    : <div> </div>}

                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className='flex-row items-center'>
                    <div className='flex-row justify-center'>
                        <div className='ma5 pa4 shadow bg-white flex justify-center '>
                            <table className=''>
                                <th className='pa2 pr4 ba b--light-gray'>Product Id</th>
                                <th className='pa2 pr4 ba b--light-gray'>Product Name</th>
                                <th className='pa2 pr4 ba b--light-gray'>Price</th>
                                <th className='pa2 pr4 ba b--light-gray'>Discount</th>
                                {(this.state.responseArrived3 == true) ?
                                    this.state.inventory3.map((item, i) => {
                                        return (<tr>
                                            <td className='pa2 pr4 ba b--light-gray'>{item.Id}</td>
                                            <td className='pa2 pr4 ba b--light-gray'>{item.Product}</td>
                                            <td className='pa2 pr4 ba b--light-gray'>{item.Price}</td>
                                            <td className='pa2 pr4 ba b--light-gray'>{item.MRP - item.price}</td>
                                        </tr>
                                        )
                                    })
                                    : <div> </div>}
                            </table>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default SalesReport;