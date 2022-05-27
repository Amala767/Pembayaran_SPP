import React from "react"
import './login.css'
import axios from "axios"
import { base_url } from "../../config.js";
import avatar from './user.png'

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }
    }
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/petugas/auth"
        

        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let petugas = response.data.data
                let token = response.data.token
                localStorage.setItem("petugas", JSON.stringify(petugas))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="login">
                <div id="card">
                    <div id="card-content">
                        <div id="card-title">
                            <img src={avatar} width="120px"/>
                            <h3>Login Account</h3>
                            <div className="underline-tile">

                            </div>
                        </div>
                        <form onSubmit={ev => this.Login(ev)}>
                        <div className="mb-3 row">
                            <label for="username" className="col-sm-2 col-form-label"><i className="las la-user-circle" ></i></label>
                            <div class="col-sm-10">
                            <input type="text" className="form-control mb-1" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})} />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="Password" class="col-sm-2 col-form-label"><i className="las la-lock"></i></label>
                            <div class="col-sm-10">
                            <input type="password" className="form-control mb-1" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" />
                            </div>
                        </div>
                            <button className="btn btn-block btn-outline-light mb-1" type="submit">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}