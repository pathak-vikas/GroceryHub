import React, { Component } from 'react';
import logo from './media/Logo.jpg';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';



const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.Product,
});





class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartNum: 0
    }
  }


  updateCart = (length) => {
    this.setState({ cartNum: length })
  }




  render() {
    return (
      // <div style={{height:'2.5rem', width : 'auto'}}>
      <nav style={{ paddingRight: '1em', paddingLeft: '1em', backgroundColor: "#001b25", display: 'flex', justifyContent: 'space-between', position: 'sticky' }}>
        <img src={logo} onClick={() => this.props.onRouteChange('home')} className='bco f3 link grow black pointer mt1 mb1' style={{ maxWidth: '14rem' }} />
        {/* <div className='ma1'> <p className='pa0 ma0 pointer dim near-white'> Stores Near me </p>
          <p className='pa0 flex justify-center ma0 pointer dim near-white' onClick={() => this.props.onRouteChange("storeLocator")}>Chicago, 60616  </p></div> */}
        {/* <input name="searchbar" classname='pa0 br4 ma0' style={{ marginTop: '0.7em', marginBottom: '0.7em', border: "none", borderRadius: "0.5em" }} type="text" autoFocus size="85" placeholder="Search a Product"></input> */}
        <Autocomplete
      id="filter-demo"
      options={this.props.state.products}
      getOptionLabel={(option) => option.Product}
      filterOptions={filterOptions}
      onClose={(event)=>{
        

          this.props.navigateToProductPage(event.target.innerText)
        }
      }
      sx={{
        display: 'inline-block',
        '& input': {
           width: 700,
           height: 40
        },
      }}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input name="searchbar" {...params.inputProps}  classname='pa0 br4 ma0' style={{ marginTop: '0.7em', marginBottom: '0.7em', border: "none", borderRadius: "0.5em" }} type="text" autoFocus size="85" placeholder="Search a Product"></input>
        </div>
      )}
    />
        {(this.props.state.user.isSignedIn) ?
          <button
            onClick={() => {
              if (this.props.state.role == 'cust')
                this.props.onRouteChange('userProfile')
            }}
            className='pl2 pr2 mt2 mb2 br3 bco fw7 f3 link grow black mt1 mb1'>
            Hello,
            {this.props.state.user.username[0].toUpperCase()+this.props.state.user.username.substring(1)}
          </button>
          : <p></p>
        }
        {(this.props.state.user.role == 'cust') ?
          <button onClick={() => this.props.onRouteChange('myOrders')} className='pl2 pr2 mt2 mb2 br3 fw7 bco f3 link grow black pointer mt1 mb1'>My Orders</button>
          : ((this.props.state.user.role == 'sm' || this.props.state.user.role == 'csr') ?
            <button onClick={() => this.props.onRouteChange('adminPanel')} className='pl2 pr2 mt2 mb2 br3 fw7 bco f3 link grow black pointer mt1 mb1'> Admin Panel </button>
            : <button onClick={() => this.props.onRouteChange('contactUs')} className='pl2 pr2 mt2 mb2 br3 fw7 bco f3 link grow black pointer mt1 mb1'> Contact Us </button>)}
        {(this.props.state.user.isSignedIn) ? <button onClick={() => this.props.logOut()} className='pl2 pr2 mt2 mb2 br3 bco fw7 f3 link grow black pointer mt1 mb1'>Logout</button>
          : <button onClick={() => this.props.onRouteChange('signIn')} className='pl2 pr2 mt2 mb2 br3 fw7 bco f3 link grow black pointer mt1 mb1'>SignIn</button>}
        {(this.props.state.user.role != 'sm' && this.props.state.user.role != 'agent') ?
          <button id="count" onClick={() => this.props.onRouteChange('cart')} className='pl2 pr2 mt2 mb2 br3 fw7 bco f3 link grow black pointer mt1 mb1'>Cart {(this.props.state.user.isSignedIn && this.props.state.cartCount != undefined) ? '(' + this.props.state.cartCount + ')'
            : <div> </div>}
          </button>
          : <div></div>}
      </nav>
      //  </div>
    );
  }
}
export default Navigation;