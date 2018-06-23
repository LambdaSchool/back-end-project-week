import React, { Component } from 'react';
import SideBar from "../SideBar/SideBar"
import "../CreateNote/CreateNote.css";
import axios from "axios";
class EditNote extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            note: ""
        }
    }

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value});
        return e.target.value;
      }

    checkToken = () => {
        const token = localStorage.getItem('token');
        const NodeId = localStorage.getItem("node_id");
        
        if((token === null || token === undefined) && (NodeId === null || NodeId === undefined)) {
            this.props.history.push('/login');
        }
    }

    componentWillMount() {
        this.checkToken()
    }

    handleFormSubmit = e => {
        e.preventDefault();

        if(this.state.title.length < 1 || this.state.note.length < 1) {
            alert("Please fill in both fields");
            return;
        }

        const newNote = {
            title: this.state.title,
            content: this.state.note
        }

        axios.put(`https://noteslambda.herokuapp.com/notes/${this.props.location.state}`, newNote)
        .then(response => {
            this.setState({
                title: "",
                note: "",
            })
            this.props.history.push('/home')
        }).catch(err => {
            alert("Error creating new note")
        })
    }

    render() {
        return (
            <div className="body">
                <SideBar/>
                <form className = "sideBar_pop create" onSubmit={this.handleFormSubmit}>
                    <h1>Edit your note:</h1>
                    <input value={this.state.title} onChange={this.handleInputChange} type="text" placeholder="Note Title" name="title"/>
                    <textarea value={this.state.note} onChange={this.handleInputChange} name="note" cols="99" rows="10" placeholder="Note Content"></textarea>
                    <button>Save</button>
                </form>
            </div>
        )
    }
}


export default EditNote
  