import _ from "lodash";
import React, { Component } from "react";
import { Chart } from "react-google-charts";
import "./Manager.css";
import { scroller } from "react-scroll";

const initialstate = {
  inventory: [],
  inventory2: [],
  inventory3: [],
  data: [],
  sales2: [],
  bstresponse: [],
  data2: [],
  bstdata: [],
  value: "1",
  responseArrived: false,
  responseArrived2: false,
  responseArrived3: false,
  responseArrived22: false,
  responseArrivedbst: false,
};

const data1 = [
  ["Zipcode", "Product Name", "Review Count"],
  ["60616", "Mishtidoi", 5],
  ["60616", "fiz", 3],
  ["60617", "fiz", 9],
];

const dataa = [
  ["Category", "Review Count"],
  ["baby care", 11],
  ["bakery cakes dairy", 5],
  ["beverages", 4],
  ["cleaning household", 9],
  ["eggs meat fish", 2],
  ["fruits vegetables", 8],
  ["snacks branded foods", 6],
];
const dataaa = [
  ["Category", "Review Count"],
  ["baby care", 12],
  ["bakery cakes dairy", 6],
  ["beverages", 4],
  ["cleaning household", 10],
  ["eggs meat fish", 8],
  ["fruits vegetables", 9],
  ["snacks branded foods", 6],
];

const scrollToSection = () => {
  scroller.scrollTo("scrollHere", {
    duration: 1000,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

const scrollToSection2 = () => {
  scroller.scrollTo("scrollHere2", {
    duration: 1000,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};
const scrollToSection3 = () => {
  scroller.scrollTo("scrollHere3", {
    duration: 1000,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

const scrollToTop = () => {
  scroller.scrollTo("scrolltop", {
    duration: 1000,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

const options = {
  title: "Inventory Bar Chart",
  chartArea: { width: "50%" },
  hAxis: {
    title: "In Stock",
    minValue: 0,
    slantedText: true,
    slantedTextAngle: 45,
  },
  vAxis: {
    title: "Products",
    slantedText: true,
    slantedTextAngle: 45,
  },
};

const options2 = {
  title: "Bestseller in all location Bar Chart",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Review Count",
    minValue: 0,
    slantedText: true,
    slantedTextAngle: 45,
  },
  vAxis: {
    title: "Zipcode",
    slantedText: true,
    slantedTextAngle: 45,
  },
};

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = initialstate;
  }
  onOrderSelect = (event) => {
    this.setState({ value: event.target.value });
  };
  getInventory = () => {
    var data = [];
    fetch("http://localhost:5000/getinventory", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        role: "strmgr",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.setState({ inventory: response });
        }
      })
      .then((response) => {
        //this.state.inventory.map(item=>{return([item.Product,item.stock])})
        data.push(["Product Name", "Inventory"]);
        this.state.inventory.map((item) =>
          data.push([item.Product, item.stock])
        );
        console.log("Bar chart data", data);
        // this.setState({ data:data, responseArrived: true });
      })
      .then(this.setState({ data: data, responseArrived: true }));
  };
  getInventory2 = () => {
    fetch("http://localhost:5000/getrebatelist", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        role: "strmgr",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.setState({ inventory2: response, responseArrived2: true });
          console.log(response);
        }
      });
  };
  getInventory3 = () => {
    fetch("http://localhost:5000/getsaleslist", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        role: "strmgr",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.setState({ inventory3: response, responseArrived3: true });
          console.log(response);
        }
      });
  };

  getBestseller = () => {
    var data2 = [];
    fetch("http://localhost:5000/bestsellers", {
      method: "get",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.setState({ bstresponse: response }); //, responseArrivedbst: true
          console.log(response);
        }
      })
      .then((response) => {
        //this.state.inventory.map(item=>{return([item.Product,item.stock])})
        data2.push(["Zipcode", "Product Name", "Review Count"]);
        this.state.bstresponse.map((item) =>
          data2.push([
            item.zipcode.toString(),
            item.productName.toString(),
            parseInt(item.reviewCount),
          ])
        );
        console.log("bestseller data", data2);
      })
      .then(this.setState({ bstdata: data2, responseArrivedbst: true }));
  };

  getSales2 = () => {
    var data2 = [];
    fetch("http://localhost:5000/gettotalsales", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        role: "strmgr",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          this.setState({ sales2: response });
          console.log(response);
        }
      })
      .then((response) => {
        //this.state.inventory.map(item=>{return([item.Product,item.stock])})
        data2.push(["Product Name", "Total Sales"]);
        this.state.sales2.map((item) =>
          data2.push([item.Product.toString(), parseFloat(item.total / 40)])
        );
        console.log("Bar chart data", data2);
      })
      .then(this.setState({ data2: data2, responseArrived22: true })); //this.setState({ data:data, responseArrived2: true }))
  };

  componentDidMount() {
    this.getInventory();
    this.getInventory2();
    this.getInventory3();
    this.getSales2();
    this.getBestseller();
  }

  render() {
    return (
      <div className="scrolltop">
        <button
          onClick={scrollToSection}
          style={{ marginLeft: "20px", marginTop: "10px" }}
        >
          Inventory Visualizations
        </button>
        <button
          onClick={scrollToSection2}
          style={{ marginLeft: "20px", marginTop: "10px" }}
        >
          Sales Visualizations
        </button>
        <button
          onClick={scrollToSection3}
          style={{ marginLeft: "20px", marginTop: "10px" }}
        >
          Rating Visualizations
        </button>

        <div className=" flex-row items-center">
          <div className="flex-row justify-center">
            <div className="ma5 pa4 shadow bg-white">
              <h4 className="flex justify-center">Inventory Stock Report</h4>
              <div className="flex justify-center ">
                <table className="">
                  <th className="pa2 pr4 ba b--light-gray">S. No</th>
                  <th className="pa2 pr4 ba b--light-gray">Product Name</th>
                  <th className="pa2 pr4 ba b--light-gray">Product Price</th>
                  <th className="pa2 pr4 ba b--light-gray">Stock</th>

                  {this.state.responseArrived == true ? (
                    this.state.inventory.map((item, i) => {
                      return (
                        <tr>
                          <td className="pa2 pr4 ba b--light-gray">{i}</td>
                          <td className="pa2 pr4 ba b--light-gray">
                            {item.Product}
                          </td>
                          <td className="pa2 pr4 ba b--light-gray">
                            $ {(item.Price / 40).toFixed(2)}
                          </td>
                          <td className="pa2 pr4 ba b--light-gray">
                            {item.stock}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div> </div>
                  )}
                </table>
              </div>
            </div>
            <button
              onClick={scrollToTop}
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              Top
            </button>
          </div>
        </div>
        <div className="flex-row items-center">
          <div className="flex-row justify-center">
            <div className="ma5 pa4 shadow bg-white">
              <h4 className="flex justify-center">Inventory Rebate Report</h4>
              <div className="flex justify-center ">
                <table className="">
                  <th className="pa2 pr4 ba b--light-gray">Product Id</th>
                  <th className="pa2 pr4 ba b--light-gray">Product Name</th>
                  <th className="pa2 pr4 ba b--light-gray">Price</th>
                  <th className="pa2 pr4 ba b--light-gray">Rebate</th>
                  {this.state.responseArrived2 == true ? (
                    this.state.inventory2.map((item, i) => {
                      return (
                        <tr>
                          <td className="pa2 pr4 ba b--light-gray">
                            {item.Id}
                          </td>
                          <td className="pa2 pr4 ba b--light-gray">
                            {item.Product}
                          </td>
                          <td className="pa2 pr4 ba b--light-gray">
                            $ {(item.Price / 40).toFixed(2)}
                          </td>
                          <td className="pa2 pr4 ba b--light-gray">
                            $ {(item.rebate / 40).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div> </div>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-row items-center">
          <div className="flex-row justify-center">
          <div className="ma5 pa4 shadow bg-white">
              <h4 className="flex justify-center">Inventory Onsales Report</h4>
              <div className="flex justify-center ">
              <table className="">
                <th className="pa2 pr4 ba b--light-gray">Product Id</th>
                <th className="pa2 pr4 ba b--light-gray">Product Name</th>
                <th className="pa2 pr4 ba b--light-gray">Price</th>
                <th className="pa2 pr4 ba b--light-gray">Discount</th>
                {this.state.responseArrived3 == true ? (
                  this.state.inventory3.map((item, i) => {
                    return (
                      <tr>
                        <td className="pa2 pr4 ba b--light-gray">{item.Id}</td>
                        <td className="pa2 pr4 ba b--light-gray">
                          {item.Product}
                        </td>
                        <td className="pa2 pr4 ba b--light-gray">
                          $ {(item.Price / 40).toFixed(2)}
                        </td>
                        <td className="pa2 pr4 ba b--light-gray">
                          $
                          {(
                            (parseFloat(item.MRP) - parseFloat(item.Price)) /
                            40
                          ).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div> </div>
                )}
              </table>
              </div>
            </div>
          </div>
        </div>
        <div className=" scrollHere flex-row items-center">
          <div className="flex-row justify-center">
            <div className="ma5 pa4 shadow bg-white flex justify-center ">
              {this.state.responseArrived == true ? (
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="1200px"
                  data={this.state.data}
                  options={options}
                />
              ) : (
                // this.state.inventory.map((item, i) => {
                //     return (<tr>
                //         <td className='pa2 pr4 ba b--light-gray'>{item.Id}</td>
                //         <td className='pa2 pr4 ba b--light-gray'>{item.Product}</td>
                //         <td className='pa2 pr4 ba b--light-gray'>$ {(item.Price/40).toFixed(2)}</td>
                //         <td className='pa2 pr4 ba b--light-gray'>$ {(item.rebate/40).toFixed(2)}</td>
                //     </tr>
                //     )
                // })
                <div> </div>
              )}
            </div>
          </div>
        </div>
        <div className=" scrollHere2 flex-row items-center">
          <div className="flex-row justify-center">
            <div className="ma5 pa4 shadow bg-white flex justify-center ">
              {this.state.responseArrived22 == true ? (
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="400px"
                  data={this.state.data2}
                  options={{
                    title: "Sales Report",
                    chartArea: { width: "50%" },
                    hAxis: {
                      title: "Total Sales (in dollar)",
                      minValue: 0,
                    },
                    vAxis: {
                      title: "Products",
                    },
                  }}
                />
              ) : (
                <div> </div>
              )}
            </div>
          </div>
        </div>
        <div className=" scrollHere3 flex-row items-center">
          <div className="flex-row justify-center">
            <div className="ma5 pa4 shadow bg-white flex justify-around ">
                <div className='pa5 ml6 mt5'>
                <select
                onChange={this.onOrderSelect.bind(this)}
                className="mw16 pa4"
                id="product"
                name="product"
              >
                <option value="">Select</option>
                <option value="1">Past 1 Day</option>
                <option value="2">Past Week</option>
                <option value="3">Past Month</option>
                <option value="4">Past Year</option>
              </select>
                </div>
              {this.state.value == "1" ? (
                <Chart
                  width={"500px"}
                  height={"400px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={dataa}
                  options={{
                    title: "Category Wise Rating Data Analytics",
                    // Just add this option
                    is3D: true,
                  }}
                  rootProps={{ "data-testid": "2" }}
                />
              ) : (
                <Chart
                  width={"500px"}
                  height={"400px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={dataaa}
                  options={{
                    title: "Category Wise Rating Data Analytics",
                    // Just add this option
                    is3D: true,
                  }}
                  rootProps={{ "data-testid": "2" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;
