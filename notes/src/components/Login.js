import React from 'react'; 


export default function Register(props){

        return (
            <div>
                <div className="form-title">Enter Information Below to Login</div>
                <form onSubmit={props.onLoginHandler}>
                    <input 
                        type="text"
                        className="form-input"
                        value={props.username}
                        onChange={props.inputHandlerLogin}
                        name="username"
                        placeholder="username"></input>
                    <input 
                        type="password"
                        className="form-input"
                        value={props.password}
                        onChange={props.inputHandlerLogin}
                        name="password"
                        placeholder="password"></input>
                    <button
                        className="form-button">Submit</button>            
                </form>
            </div>
        )
}