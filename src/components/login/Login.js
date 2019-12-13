import React from 'react'
import axios from 'axios'

import '../Layout.css'

class Login extends React.Component
{
    constructor(props)
    {
        super(props)
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
        this.state ={
            username: '',
            password: '',
            error: ''
        }
    }
    login(){
        axios.post('http://localhost:5000/api/login/', 
        {
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => {
            if(response.data !== null)
            {
                this.setState({error:''})
                localStorage.setItem("token", response.data.token)
                //console.log("storage:" + localStorage.getItem("token") + " data:" + response.data.token)
                window.location = "/itemlist"
            }
        })
        .catch((error) => {
            console.log(error);
            if(error.response.data)
                if(error.response.data.message)
                this.setState({error:error.response.data.message})
        });
    }

    render()
    {
        return(
        <div className="center">
            <div className="card">
                <form onSubmit={this.onLoginSubmit}>
                    <input type="text" name="username" placeholder="Usuario" onChange={this.usernameChangeHandler} className="form-item"/>
                    <input type="password" name="password" placeholder="Contraseña" onChange={this.passwordChangeHandler} className="form-item"/>
                    <input type="Submit" value="Iniciar sesión" className="form-submit"/>
                </form>
                {this.renderError()}
            </div>
        </div>
        )
    }
    renderError()
    {
        return (
            <div style={{color: 'red'}}>
                {this.state.error}
            </div>
        )
    }
    usernameChangeHandler(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }
    passwordChangeHandler(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }
    onLoginSubmit(e)
    {
        e.preventDefault();
        this.login()
    }
}

export default Login