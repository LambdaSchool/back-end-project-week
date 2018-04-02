import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';
import Button from './button';

const StyledLoginForm = styled.div`
  display: flex;

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-left: 10px;
    border-radius: 2px;
    border: 1px solid #bfbfc0;
    font-size: 1.4rem;
    letter-spacing: 1px;    
    &:focus {
      outline: none;
    }
  }

  .form__input {
    width: 340px;
    height: 40px;
    margin-top: 20px;
    padding: 8px;
  }

  button {
    margin-left: 10px;
    
  }

`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({
      email: '',
      password: '',
      redirect: true,
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <StyledLoginForm>
        <form onSubmit={this.handleSubmit}>
          <input
            className='form__input'
            type='email'
            name='email'
            placeholder='Email (required)...'
            maxLength='30'
            required
            onChange={this.handleChange}
            value={this.state.email}
          />
          <input
            className='form__input'
            type='password'
            name='password'
            placeholder='Password (required)...'
            maxLength='15'
            required
            onChange={this.handleChange}
            value={this.state.password}
          />
          <Button type='submit' backgroundColor='rgb(34, 170, 61)' title='Login' />
        </form>
        {this.state.redirect ? <Redirect to={'/list'} /> : null}
      </StyledLoginForm>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { login })(LoginForm);
