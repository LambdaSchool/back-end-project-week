import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    createUser(event) {
        event.preventDefault();
        const newUser = { user: this.state.username, pass: this.state.password };
        axios.post('http://localhost:5000/sign-up', newUser)
            .then(data => {
                localStorage.setItem('uuID', data.data._id);
                setTimeout(() => {
                    window.location = '/posts'
                }, 200)
            })
            .catch(err => {
                console.log({ 'error': err.response.error });
            });
    }

    render() {
        return (
            <div className="main__registration">
                <div className="main__registration__header">
                    <h1>Welcome to Lambda Notes!</h1>
                    <hr className="style__one" />
                    <h3>A free platform for those who love taking notes. Sign up now.</h3>
                    <form>
                        <p className="p__shift">First Name:</p>
                        <input placeholder="Sara" type="text" name="firstname" />

                        <p className="p__shift">Last Name:</p>
                        <input placeholder="Smith" type="text" name="lastname" onChange={this.handleUsername} value={this.state.username} />

                        <p className="p__shift">Username:</p>
                        <input placeholder="so2018" type="text" name="lastname" onChange={this.handlePassword} value={this.state.password} />

                        <p className="p__shift">Password:</p>
                        <input type="text" name="lastname" />
                        <br />

                        <button onClick={this.createUser} className="button__registration">Submit</button>
                        <Link to='/user'><button className="button__registration">Log In</button></Link>
                    </form>
                </div>
            </div>

        );
    }
}

export default Registration;