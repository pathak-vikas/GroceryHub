import { React, Component } from "react";
import ProductPage from "./ProductPage";
import Cardlist from "./ProductList";
import Recommendations from "./Recommendations";
import UnderCons from "./UnderCons";
import Banner from "./Banner";
import Cart from "./Cart";
import SignIn from "./SignIn";
import Register from "./Register";
import StoreLocator from "./StoreLocator";
import Checkout from "./Checkout";
import MyOrders from "./MyOrders";
import UserProfile from "./UserProfile";
import AdminPanel from "./AdminPanel";
import Reviews from "./ReviewPage";
import Card from "./ProductCard";

class Body extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.state.route == "home" ? (
          <div className="bg-light-gray">
            <Banner />
            {(this.props.state.showTweets == true)?
             <div className="flex justify-center bg-light-gray">
             <div className="flex items-center">
               <div className="pa5 ma5 shadow bg-white">
                 <h6 className="ml4 navy f3">Deals Stream</h6>
                 <div className="flex justify-between pl4 pb4 pr4">
                   <div>
                     {" "}
                     <text className="mt2 f3 navy">
                       Here's an ins-pear-ational offer to make your weekend
                       even better! Shop delicious USA pear at minimum 20% off
                     </text>
                     <h6 className="mt6 navy f3">
                       Events & Announcement Stream
                     </h6>
                     <div className="pb4 pr4">
                       <text className="mt2 navy f4">
                         Our heartiest congratulations to Deekshitha Venkat for
                         winning the Best of Brunch Recipe Contest!
                       </text>
                       <br />
                       <text className="mt2 navy f4">
                         It's time to get cheesy with Britannia! Share with us
                         a cheesy recipe and stand a chance to win bb gift
                         cards!
                       </text>
                     </div>
                   </div>
                   <Card
                     openReviews={this.props.openReviews}
                     onRouteChange={this.props.onRouteChange}
                     deleteProduct={this.deleteProduct}
                     state={this.props.state.user.role}
                     navigateToProductPage={this.props.navigateToProductPage}
                     // product = {this.props.state.products[i]}
                     Id={134}
                     Product="USA Pear, Organically Grown"
                     Brand="Fresho"
                     Price={2.73}
                     image="https://www.bigbasket.com/media/uploads/p/l/40029953_1-fresho-pears-babbugosha-organically-grown.jpg"
                   />{" "}
                 </div>
                 <div>
                   <button className="f4 dim ph3 pv2 pt4 mb2 white bg-navy br4 pointer ma2">
                     Tweet +
                   </button>
                 </div>
               </div>
             </div>
           </div>
            : <div> </div>}
           

            <h4 className="pl3 ma2 navy f3">Product Categories</h4>
            <div className="pl4 pb4 pr4">
              <Cardlist
                setCategory={this.props.setCategory}
                openReviews={this.props.openReviews}
                onRouteChange={this.props.onRouteChange}
                fetchProducts={this.props.fetchProducts}
                navigateToProductPage={this.props.navigateToProductPage}
                state={this.props.state}
              />
            </div>
            <h4 className="pl3 ma2 navy f3">You may be interested in buying</h4>
            <div className="pl4 pb4 pr4">
              {/* <Recommendations state={this.props.state} navigateToProductPage={this.props.navigateToProductPage} onRouteChange={this.props.onRouteChange} /> */}

              {this.props.state.products.slice(7, 11).map((products, i) => {
                return (
                  <Card
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
                  />
                );
              })}
            </div>
          </div>
        ) : this.props.state.route == "productPage" ? (
          <div>
            <ProductPage
              updateCartDetails={this.props.updateCartDetails}
              addToCart={this.props.addToCart}
              state={this.props.state}
              onRouteChange={this.props.onRouteChange}
            ></ProductPage>
          </div>
        ) : this.props.state.route == "cart" ? (
          <div>
            <Cart
              updateCartDetails={this.props.updateCartDetails}
              loadCheckoutPage={this.props.loadCheckoutPage}
              OnCustomerSelect={this.props.OnCustomerSelect}
              updateCartQuantity={this.props.updateCartQuantity}
              state={this.props.state}
              onRouteChange={this.props.onRouteChange}
            />
            <Recommendations
              state={this.props.state}
              navigateToProductPage={this.props.navigateToProductPage}
              onRouteChange={this.props.onRouteChange}
            />
          </div>
        ) : this.props.state.route == "signIn" ? (
          <div>
            <SignIn
              loadUser={this.props.loadUser}
              state={this.props.state}
              navigateToProductPage={this.props.navigateToProductPage}
              onRouteChange={this.props.onRouteChange}
            >
              {" "}
            </SignIn>
          </div>
        ) : this.props.state.route == "register" ? (
          <div>
            <Register
              loadUser={this.props.loadUser}
              state={this.props.state}
              navigateToProductPage={this.props.navigateToProductPage}
              onRouteChange={this.props.onRouteChange}
            >
              {" "}
            </Register>
          </div>
        ) : this.props.state.route == "storeLocator" ? (
          <div>
            <StoreLocator
              loadUser={this.props.loadUser}
              state={this.props.state}
              navigateToProductPage={this.props.navigateToProductPage}
              onRouteChange={this.props.onRouteChange}
            >
              {" "}
            </StoreLocator>
          </div>
        ) : this.props.state.route == "checkout" ? (
          <div>
            <Checkout
              updateCartDetails={this.props.updateCartDetails}
              loadUser={this.props.loadUser}
              state={this.props.state}
              navigateToProductPage={this.props.navigateToProductPage}
              onRouteChange={this.props.onRouteChange}
            >
              {" "}
            </Checkout>
          </div>
        ) : this.props.state.route == "myOrders" ? (
          <div>
            <MyOrders
              checkout={this.props.checkout}
              loadUser={this.props.loadUser}
              state={this.props.state}
              navigateToProductPage={this.props.navigateToProductPage}
              onRouteChange={this.props.onRouteChange}
            >
              {" "}
            </MyOrders>
          </div>
        ) : this.props.state.route == "userProfile" ? (
          <div>
            <UserProfile
              updateProfile={this.props.updateProfile}
              checkout={this.props.checkout}
              loadUser={this.props.loadUser}
              state={this.props.state}
              navigateToProductPage={this.props.navigateToProductPage}
              onRouteChange={this.props.onRouteChange}
            >
              {" "}
            </UserProfile>
          </div>
        ) : this.props.state.route == "adminPanel" ? (
          <div>
            <AdminPanel
              setState={this.props.setState}
              fetchProducts={this.props.fetchProducts}
              checkout={this.props.checkout}
              loadUser={this.props.loadUser}
              state={this.props.state}
              navigateToProductPage={this.props.navigateToProductPage}
              onRouteChange={this.props.onRouteChange}
            >
              {" "}
            </AdminPanel>
          </div>
        ) : this.props.state.route == "reviews" ? (
          <Reviews
            fetchProducts={this.props.fetchProducts}
            checkout={this.props.checkout}
            loadUser={this.props.loadUser}
            state={this.props.state}
            navigateToProductPage={this.props.navigateToProductPage}
            onRouteChange={this.props.onRouteChange}
          />
        ) : (
          <UnderCons />
        )}
      </div>
    );
  }
}

export default Body;
