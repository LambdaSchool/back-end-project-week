import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class NoteListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="note-list-item">
        {/* 
          - Title,
          - date created,
          - Buttons/Icons: {
            --- "delete"
          }
         */}
         
      </div>
    );
  }
}

export default NoteListItem;
