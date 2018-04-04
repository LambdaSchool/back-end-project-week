import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  view_button_click,
  load_user_notes,
  new_user_creation,
} from '../actions/index';

import './css/Login.css';

class Login extends React.Component {
  state = {
    user: '',
    pass: '',
    newUser: '',
    newPass: '',
  };

  render() {
    return (
      <div className="login">
        <div className="login-body">
          <h1 className="login-header"> Sign In To Your Notes</h1>
          <label> Username </label>
          <input
            placeholder="username"
            value={this.state.user}
            onChange={this.handleUserChange}
          />
          <label> Password </label>
          <input
            type="password"
            placeholder="password"
            value={this.state.pass}
            onChange={this.handlePassChange}
          />
          <button className="login-button" onClick={this.loginClicked}>
            {' '}
            Login{' '}
          </button>
          <h1 className="new-header"> No Account? Create One Below </h1>
          <label> Username </label>
          <input
            placeholder="username"
            value={this.state.newUser}
            onChange={this.handleNewUserChange}
          />
          <label> Username (Must Be At Least 8 Characters)</label>
          <input
            type="password"
            placeholder="password"
            value={this.state.newPass}
            onChange={this.handleNewPassChange}
          />
          <button className="login-button" onClick={this.createClicked}>
            {' '}
            Create New{' '}
          </button>
        </div>
      </div>
    );
  }

  handleUserChange = (event) => {
    this.setState({ user: event.target.value });
  };
  handlePassChange = (event) => {
    this.setState({ pass: event.target.value });
  };
  handleNewUserChange = (event) => {
    this.setState({ newUser: event.target.value });
  };
  handleNewPassChange = (event) => {
    this.setState({ newPass: event.target.value });
  };
  loginClicked = () => {
    let flag = false;
    let userIndex = -1;
    this.props.users.forEach((user, index) => {
      if (
        user.username === this.state.user &&
        user.password === this.state.pass
      ) {
        flag = true;
        userIndex = index;
      }
    });
    if (flag) {
      const user = this.props.users[userIndex];
      const usersNotes = this.props.users[userIndex].notes;
      this.props.load_user_notes(user, usersNotes);
      this.props.view_button_click();
    } else {
      alert('You entered an incorrect username or password.');
      this.setState({ user: '', pass: '' });
    }
  };
  createClicked = (event) => {
    // let flag = true;
    // this.props.users.forEach(user => {
    //   if (user.username === this.state.newUser) {
    //     alert('The Chosen User Name Already Exists, Try Again');
    //     this.setState({ newUser: '' });
    //     return (flag = false);
    //   }
    // });
    // if (flag === true) {
    if (this.state.newUser === '' || this.state.newPass === '') {
      alert('You must enter a username and password to create a new account.');
      this.setState({ newUser: '', newPass: '' });
    } else if (this.state.newPass.length < 8) {
      alert('Your password must be at least 8 characters.');
      this.setState({ newPass: '' });
    } else {
      // const user = { username: this.state.newUser, password: this.state.newPass, notes: [] };
      // this.props.new_user_creation(user);
      event.preventDefault();

      const newUser = {
        username: this.state.newUser,
        password: this.state.newPass,
      };
      axios
        .post('http://localhost:3000/notes/createuser', newUser)
        .then((data) => {
          const userID = data.data.user._id;
          new_user_creation(userID);
        })
        .catch((error) => {
          alert('Username already exists, please try again');
          this.setState({ newUser: '' });
        });
    }
    // }
  };
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    note: state.note,
  };
};

export default connect(mapStateToProps, {
  view_button_click,
  load_user_notes,
  new_user_creation,
})(Login);
