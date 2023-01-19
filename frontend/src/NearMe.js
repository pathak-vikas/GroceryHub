import React, { Component } from 'react';

class NearMe extends Component {
    constructor(props) {
        super(props)
    }

    // handleClickOutside = (event) => {
    //     if (
    //         this.container.current &&
    //         !this.container.current.contains(event.target)
    //     ) {
    //         this.props.toggleDropdown();
    //     };
    // }

    // componentDidMount() {
    //     document.addEventListener("mousedown", this.handleClickOutside);
    // }
    // componentWillUnmount() {
    //     document.removeEventListener("mousedown", this.handleClickOutside);
    // }

    render() {

        return (
            <article className=" br3 ml5 mw1 pa2 ba b--black-10 mv3 w-70 w-50-m w-25-l mw6 shadow-5 center" >
                <main className="black-70">
                    <div className="measure">
                        <fieldset id="location" className="ba b--transparent ph0 mh0">

                            {/* {this.state.error ? <label className="db fw6 lh-copy f6 red" htmlFor="email-address">{this.state.msg}</label> : <div></div>}
                     <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
                        <input
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                            type="email"
                            name="email-address"
                            id="email-address"
                            onChange={this.onEmailChange.bind(this)} />
                    </div> 
                    <div>
                        <label className="db fw6 lh-copy f6" htmlfor="role">Select Role</label>
                        <select onClick={this.onRoleSelect.bind(this)} className='pa2 mw16 mb3' id="role" name="role">
                            <option value="cust">Customer</option>
                            <option value="strmgr">Store Manager</option>
                            <option value="csr">Agent</option>
                        </select>
                    </div> */}
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 " htmlfor="location">Enter your Zip Code</label>
                                <input
                                    className="b pa1 br4 mt2 pt2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                    type="location"
                                    name="location"
                                    id="location"
                                    onChange={this.props.onZipChange}
                                />
                            </div>
                        </fieldset>
                        <div className="flex justify-center">
                            <button className="f5 dim ph3 flex justify-center pv1 mb2 mt2 navy bg-gold br4 pointer" onClick={this.props.fetchStores}>Go</button>
                        </div>
                        {/* <div className="flex justify-between">
                    <div>
                        <input onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in" />
                    </div>
                    <div className="lh-copy pa0 f6 ma0 ">
                        <p className="ma0 ">Not our User yet?</p>
                        <p onClick={() => onRouteChange('register')} className="pa0 ma0 underline pointer f6 link dim black db">Register here!</p>
                    </div>
                </div> */}
                    </div>
                </main>
            </article >
        )
    }
}

export default NearMe;