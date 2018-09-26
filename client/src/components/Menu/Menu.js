import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './Menu.css';
import NewNoteForm from './components/Forms/NewNoteForm';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  handleCreateNote = () => {

  }

  handleLandingUpwardAnimation = () => {

  }

  render() {
    return (
      <div className="Menu">
        {/* 
        - LOGO,
        - OPENS MODALS: copyright / "about" link
        */}
        <div onClick={}>
          <div>LOGO HERE</div>
          <Link to="/newnote">Add New Note</Link>
          <Link to="/notelist">View Notes</Link>
          <Link to="login">Login</Link>
          <Route path="/newnote"{...rest} render={(props) => { <NewNoteForm {...props} /> }} />
          <Route path="/notelist"{...rest} render={(props) => { <NoteList {...props} /> }} />
          <Route path="/login" {...rest} render={(props) => { <Login {...props} /> }} />
        </div>
      </div>
    );
  }
}

export default Menu;
