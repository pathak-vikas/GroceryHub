import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            role: 'cust',
            error: false,
            msg: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }
    onRoleSelect = (event) => {
        this.setState({role: event.target.value });
        console.log( event.target.value)
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:5000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.signInEmail,
                password: this.state.signInPassword,
                role: this.state.role
            })
        })
            .then(response => response.json())
            // .then(response => console.log("this is our user :" , response))
            .then(response => {
                if (response.authorized) {
                    this.props.loadUser(response);
                }
                else {
                    this.setState({ error: true, msg: 'Incorrect password or username' })
                }
            })
            // .then(response => console.log(response))
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='ma4 pa4'>
                <article className=" br2 bg-white pt2 pb2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                {this.state.error ? <label className="db fw6 lh-copy f6 red" htmlFor="email-address">{this.state.msg}</label> : <div></div>}
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Username</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        onChange={this.onEmailChange.bind(this)} />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlfor="password">Password</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-black w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPasswordChange.bind(this)} />
                                </div>
                                <div>
                                    <label className="db fw6 lh-copy f6" htmlfor="role">Select Role</label>
                                    <select onChange={this.onRoleSelect.bind(this)} className='pa2 mw16 mb3' id="role" name="role">
                                        <option value="cust">Customer</option>
                                        <option value="sm">Store Manager</option>
                                        <option value="csr">Agent</option>
                                    </select>
                                </div>
                            </fieldset>
                            <div className="flex justify-between">
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
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default SignIn;