import { initial } from "lodash";
import React, { Component } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const initialstate = {
    username: '',
    firstname: '',
    lastname: '',
    ad1: '',
    ad2: '',
    city: '',
    state: '',
    zipcode: '',
    contact: '',
    isSignedIn: true,
    role: 'cust',
    buttonFlag: true,
    route: 'myprofile'
}

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate
    }

    routeChange = (route) => {
        this.setState({ route: route })
    }

    componentDidMount() {
        this.setState({ user: this.props.user })
    }

    onInputChange = (event) => {
        const value = event.target.value;
        this.setState({ [event.target.name]: value })
    }

    onSubmitClick = () => {
        var zip= this.props.state.user.zipcode;
        if(this.state.zipcode!==''){
            zip = this.state.zipcode
        }else{
            
        }
        fetch('http://localhost:5000/updateprofile', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username: this.props.state.user.username,
                isSignedIn: this.state.isSignedIn,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                zipcode:zip,
                contact: this.state.contact,
                city: this.state.city,
                ad1: this.state.ad1,
                ad2: this.state.ad2,
                state: this.state.state
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    alert("Profile updated successfully!!")
                    this.props.updateProfile(this.state);
                    console.log(response)
                }
            })
    }

    render() {
        return (
            <div className='bg-light-gray'>
                <div>
                    {(this.state.route == 'myprofile') ?
                        <div className='flex justify-around'>
                            <button className='pl2 pr2 mt2 mb2 br3 fw7 bco f3 link black pointer mt1 mb1' onClick={() => { this.routeChange('myprofile') }}> My Profile </button>
                            <button className='pl2 pr2 mt2 mb2 br3 fw7 bg-navy f3 link white pointer mt1 mb1' onClick={() => { this.routeChange('updateprofile') }}> Update Profile </button>
                        </div>
                        : <div className='flex justify-around'>
                            <button className='pl2 pr2 mt2 mb2 br3 fw7 bg-navy f3 link white pointer mt1 mb1' onClick={() => { this.routeChange('myprofile') }}> My Profile </button>
                            <button className='pl2 pr2 mt2 mb2 br3 fw7 bco f3 link black pointer mt1 mb1' onClick={() => { this.routeChange('updateprofile') }}> Update Profile </button>
                        </div>}
                </div>

                {(this.state.route == 'myprofile') ?
                    <div className='flex justify-center'>
                        <div className='flex items-center'>
                            <div className='ma5 pa4 shadow bg-white profilegrid'>
                                <div className='f4 pl4 pr4 pt2 pb2'>Name</div>
                                <div className='pa1'></div>
                                <div className='pl4 pr4 pt2 pb2'>{this.props.state.user.username}</div>

                                <div className='f4 pl4 pr4 pt2 pb2'>User Type</div>
                                <div className='pa1'></div>
                                <div className='pl4 pr4 pt2 pb2'>{this.props.state.user.role}</div>

                                <div className='f4 pl4 pr4 pt2'>Shipping Address</div>
                                <div className='pa1'></div>
                                <div className='pl4 pr4 pt2'>{this.props.state.user.ad1}</div>

                                <div className='f4 pl4 pr4 pb2'></div>
                                <div className='pa1'></div>
                                <div className='pl4 pr4 pb2'>{this.props.state.user.ad2}</div>

                                <div className='f4 pl4 pr4 pb2'></div>
                                <div className='pa1'></div>
                                <div className='pl4 pr4 pb2'>{this.props.state.user.city} </div>

                                <div className='f4 pl4 pr4 pb2'></div>
                                <div className='pa1'></div>
                                <div className='pl4 pr4 pb2'>{this.props.state.user.state}</div>

                                <div className='f4 pl4 pr4 pb2'></div>
                                <div className='pa1'></div>
                                <div className='pl4 pr4 pb2'>{this.props.state.user.zipcode}</div>

                                <div className='f4 pl4 pr4 pt2 pb2'>Contact</div>
                                <div className='pa1'></div>
                                <div className='pl4 pr4 pt2 pb2'>{this.props.state.user.contact}</div>

                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex justify-center'>
                        <div className='flex items-center'>
                            <div className='ma5 pa4 shadow bg-white profilegrid'>
                                <div className='f4 pl4 pr4 pt2 pb2'>First name</div>
                                <div className='pa1'></div>
                                <input onChange={this.onInputChange.bind(this)} className='ml4 mr4 mt2 mb2' type='text' defaultValue={this.props.state.user.firstname} name="firstname" placeholder='Enter first name'></input>

                                <div className='f4 pl4 pr4 pt2 pb2'>Last name</div>
                                <div className='pa1'></div>
                                <input onChange={this.onInputChange.bind(this)} className='ml4 mr4 mt2 mb2' type='text' defaultValue={this.props.state.user.lastname} name="lastname" placeholder='Enter last name'></input>

                                {/* <div className='f4 pl4 pr4 pt2 pb2'>User Type</div>
                                <div className='pa1'></div>
                                <input className='ml4 mr4 mt2 mb2' type='text' placeholder='Enter name'></input> */}

                                <div className='f4 pl4 pr4 pt2'>Shipping Address</div>
                                <div className='pa1'></div>
                                <input onChange={this.onInputChange.bind(this)} className='ml4 mr4 mb2' type='text' defaultValue={this.props.state.user.ad1} name="ad1" placeholder='Address Line 1'></input>

                                <div className='f4 pl4 pr4 pb2'></div>
                                <div className='pa1'></div>
                                <input onChange={this.onInputChange.bind(this)} className='ml4 mr4 mb2' type='text' name="ad2" defaultValue={this.props.state.user.ad2} placeholder='Address Line 2'></input>

                                <div className='f4 pl4 pr4 pb2'></div>
                                <div className='pa1'></div>
                                <input onChange={this.onInputChange.bind(this)} className='ml4 mr4 mb2' type='text' defaultValue={this.props.state.user.city} name="city" placeholder='City'></input>

                                <div className='f4 pl4 pr4 pb2'></div>
                                <div className='pa1'></div>
                                <input onChange={this.onInputChange.bind(this)} className='ml4 mr4 mb2' type='text' defaultValue={this.props.state.user.state} name="state" placeholder='State'></input>

                                <div className='f4 pl4 pr4 pb2'></div>
                                <div className='pa1'></div>
                                <input onChange={this.onInputChange.bind(this)} className='ml4 mr4 mb2' type='text' defaultValue={this.props.state.user.zipcode} name="zipcode" placeholder='Zipcode'></input>

                                <div className='f4 pl4 pr4 pt2 pb2'>Contact</div>
                                <div className='pa1'></div>
                                <input onChange={this.onInputChange.bind(this)} className='ml4 mr4 mt2 mb2' type='text' defaultValue={this.props.state.user.contact} name="contact" placeholder='email/phone'></input>

                                <div> </div>
                                <div> </div>
                                <div className='flex justify-center'><button type="submit" value="Submit" onClick={() => this.onSubmitClick()} className='ml5 mt3 mb2 br3 fw7 bco f3 link black pointer'>Submit</button></div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default UserProfile;