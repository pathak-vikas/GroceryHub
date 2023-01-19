import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerPassword: '',
            registerZip: '',
            registerEmail: '',
            role: 'cust'
        }
    }

    onRegister = () => {
        fetch('http://localhost:5000/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                role: this.state.role,
                zipcode:this.state.registerZip
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("register response ", data);
                // this.props.state.user.userame= this.state.registerName;
                if(data.data==='created cm') {
                   
                        this.props.loadUser(data);
                       // this.props.onRouteChange('home');
                    }
                  


            })
    }

    onRoleSelect = (event) => {
        this.setState({ role: event.target.value });
        console.log(this.state.role)
    }

    onNameChange = (event) => {
        this.setState({ registerName: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
    }

    onZipChange = (event) => {
        this.setState({ registerZip: event.target.value })
    }

    render() {
        // const { onRouteChange } = this.props;
        return (
            <article className="br2 pa3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">UserName</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                    type="name"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange.bind(this)}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange.bind(this)}
                                />
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="zip">ZipCode</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                    type="text"
                                    name="location"
                                    id="zip"
                                    onChange={this.onZipChange.bind(this)}
                                />
                            </div>
                            <div>
                                <label className="db fw6 lh-copy f6" htmlfor="role">Select Role</label>
                                <select onClick={this.onRoleSelect.bind(this)} className='pa2 mw16 mb3' id="role" name="role">
                                    <option value="cust">Customer</option>
                                    <option value="sm">Store Manager</option>
                                    <option value="csr">Agent</option>
                                </select>
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onRegister}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>

                    </div>
                </main>
            </article>
        )
    }
}

export default Register;