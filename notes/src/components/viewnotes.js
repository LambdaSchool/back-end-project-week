import React, { Component } from 'react';

import axios from 'axios';
import {Route, Link} from 'react-router-dom';

class Notes extends Component {
    state={
        notes:[]
    }

    render() {
        return (
            <div className="Notes">
                
            <ul> 
                 {this.state.notes.map(note => {
                     return(
                    <li 
                    key={note.id}>
                   <h1>  {note.title}</h1>
                    <p>{note.content}</p>
                        <Link to={`/notes/${note.id}`}>View Note </Link>
                    </li>
                     )
                    })}

             </ul>

            </div>
                
        )
    }


    componentDidMount() {
        axios
        .get('http://localhost:5000/notes')
        .then(res => {
            this.setState({ notes: res.data})
            console.log(res.data)
        })
        .catch(err => {
            console.log('Axios failed')
        })

        console.log('state', this.state)
    }
}

export default Notes;