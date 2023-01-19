import React, { Component } from 'react';
import './Manager.css';
const initialstate = {
    user: {
        username: '',
        id: '',
        shippingAddress: '',
        email: '',
    }
}

class AddUsers extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate
        document.getElementById('msg').textContent=''
    }

    onSubmitUser = () => {
        console.log("testing from button",document.getElementById('uname').value)
        fetch('http://localhost:5000/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: `${document.getElementById("uname").value}`,
                password:`${document.getElementById("pwd").value}`,
                role: `${document.getElementById("role").value}`,
                firstname:`${document.getElementById("fn").value}`,
                lastname:`${document.getElementById("ln").value}`,
                zipcode:`${document.getElementById("zip").value}`,
                contact:`${document.getElementById("cnt").value}`,
                city:`${document.getElementById("cty").value}`,
                state:`${document.getElementById("st").value}`,
                ad1:`${document.getElementById("ad1").value}`,
                ad2:`${document.getElementById("ad2").value}`,

            })
        })
        .then(response => response.json())
        .then(data=>{
            if(data.data==='created cm'){
                document.getElementById('msg').textContent='New Customer created successfully'
                alert('New customer created successfully.');
            }})
    }

    // onNameChange = (event) => {
    //     this.setState(Object.assign(this.state.user, { username: event.target.value }))
    // }

    render() {
        return (
            <div className='flex justify-center'>
                <div className='flex items-center'>
                    <div className='ma5 pa4 shadow bg-white profilegrid'>

                        <div className='f4 pl4 pr4 pt2 pb2'>Username</div>
                        <div className='pa1'></div>
                        <input id ='uname'className='ml4 mr4 mt2 mb2' type='text' placeholder='Enter login id'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>First Name</div>
                        <div className='pa1'></div>
                        <input id='fn'className='ml4 mr4 mt2 mb2' type='text' placeholder='Enter First name'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Last Name</div>
                        <div className='pa1'></div>
                        <input id ='ln' className='ml4 mr4 mt2 mb2' type='text' placeholder='Enter Last name'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Password</div>
                        <div className='pa1'></div>
                        <input id ='pwd' className='ml4 mr4 mt2 mb2' type='password'></input>

                        {/* <div className='f4 pl4 pr4 pt2 pb2'>User Type</div>
                        <div className='pa1'></div> */}
                        <input hidden id ='role' className='ml4 mr4 mt2 mb2' type='text' value='cust' placeholder='sm/csr/cust'></input>

                        <div className='f4 pl4 pr4 pt2'>Shipping Address</div>
                        <div className='pa1'></div>
                        <input id ='ad1' className='ml4 mr4 mt2 mb2' type='text' placeholder='Address Line 1'></input>

                        <div className='f4 pl4 pr4 pb2'></div>
                        <div className='pa1'></div>
                        <input id='ad2' className='ml4 mr4 mb2' type='text' placeholder='Address Line 2'></input>

                        <div className='f4 pl4 pr4 pb2'></div>
                        <div className='pa1'></div>
                        <input id='cty' className='ml4 mr4 mb2' type='text' placeholder='City'></input>

                        <div className='f4 pl4 pr4 pb2'></div>
                        <div className='pa1'></div>
                        <input id='st' className='ml4 mr4 mb2' type='text' placeholder='State'></input>

                        <div className='f4 pl4 pr4 pb2'></div>
                        <div className='pa1'></div>
                        <input id='zip' className='ml4 mr4 mb2' type='text' placeholder='Zip Code'></input>

                        <div className='f4 pl4 pr4 pt2 pb2'>Contact</div>
                        <div className='pa1'></div>
                        <input id='cnt' className='ml4 mr4 mt2 mb2' type='text' placeholder='Contact number/Email address'></input>

                        <div> </div>
                        <div> </div>
                        <div className='flex justify-center'><button className='ml5 mt3 mb2 br3 fw7 bco f3 link black pointer' onClick={() => { this.onSubmitUser() }}> Create </button></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddUsers;