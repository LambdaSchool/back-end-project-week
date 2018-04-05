import React, { Component } from 'react';
import fetch from 'node-fetch';
import './Notes.css';
import CreateNote from './Components/CreateNote';
import SingleNote from './Components/SingleNote';
import NoteList from './Components/NoteList';
import EditNote from './Components/EditNote';
import Login from './Components/Login';

class Notes extends Component {
  state = {
    login: false,
    userId: null,
    notes: [],
    view: {
      notes: false,
      create: false,
      edit: false,
      singleNote: false,
      results: false
    },
    keyword: ''
  };
  target = null;

  componentDidMount() {
    this.SetViewNotes();
  }
  handleLogin(id) {
    this.setState({ ...this.state, login: true, userId: id });
  }
  render() {
    console.log(this.state);
    return (
      <div className="container">
        {!this.state.login ? (
          <Login main={this} />
        ) : (
          <div className="container">
            <div className="leftPanel">
              <h1 className="leftHeader">Lambda notes</h1>
              <button onClick={() => this.SetViewNotes()}>
                View Your Notes
              </button>
              <button onClick={() => this.SetViewCreate()}>
                + Create New Note
              </button>
            </div>
            {this.state.view.notes ? (
              <div className="rightPanel">
                <h1 className="header">Your Notes:</h1>
                <form className="search">
                  <input
                    type="text"
                    name="keyword"
                    value={this.state.keyword}
                    onChange={this.onSearch}
                    placeholder="Search for a note..."
                  />
                </form>
                <NoteList
                  notes={this.state.notes}
                  keyword={this.state.keyword}
                  results={this.state.view.results}
                  target={this.handleTarget}
                />
              </div>
            ) : null}
            {this.state.view.create ? (
              <CreateNote addNote={this.addNote} />
            ) : null}
            {this.state.view.singleNote ? (
              <SingleNote
                notes={this.state.notes}
                target={this.target}
                deleteNote={this.deleteNote}
                edit={this.editNote}
              />
            ) : null}
            {this.state.view.edit ? (
              <EditNote
                note={this.state.notes[this.target]}
                updateNote={this.updateNote}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }

  onSearch = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      view: {
        notes: true,
        edit: false,
        create: false,
        singleNote: false,
        results: true
      }
    });
  };
  updateNote = updatedNote => {
    let mirror = this.state.notes;
    mirror[this.target] = updatedNote;
    this.setState({
      ...this.state,
      notes: mirror,
      keyword: '',
      view: {
        notes: true,
        edit: false,
        create: false,
        singleNote: false,
        results: false
      }
    });
  };

  editNote = target => {
    this.target = target;
    this.setState({
      ...this.state,
      view: {
        notes: false,
        edit: true,
        create: false,
        singleNote: false,
        results: false
      }
    });
  };
  deleteNote = target => {
    let mirror = this.state.notes;
    mirror.splice(target, 1);
    this.target = null;
    this.setState({
      notes: mirror,
      view: {
        notes: true,
        edit: false,
        create: false,
        singleNote: false,
        results: false
      },
      keyword: ''
    });
  };

  handleTarget = i => {
    this.target = i;
    this.setState({
      ...this.state,
      view: {
        notes: false,
        edit: false,
        create: false,
        singleNote: true,
        results: false
      }
    });
  };

  addNote = newNote => {
    this.target = null;
    this.setState({
      notes: [newNote, ...this.state.notes],
      view: {
        notes: true,
        edit: false,
        create: false,
        singleNote: false,
        results: false
      },
      keyword: ''
    });
  };

  SetViewNotes() {
    this.target = null;
    this.setState({
      ...this.state,
      view: {
        notes: true,
        edit: false,
        create: false,
        singleNote: false,
        results: false
      },
      keyword: ''
    });
  }

  SetViewCreate() {
    this.target = null;
    this.setState({
      ...this.state,
      view: {
        notes: false,
        edit: false,
        create: true,
        singleNote: false,
        results: false
      }
    });
  }
}

export default Notes;
