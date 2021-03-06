import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import '../App.css'
import UserService from "../services/UserService"
import Redirect from 'react-router-dom/Redirect'

const loginService = new UserService().login_service

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
            redirect: false
        }
        this.loginfun = this.loginfun.bind(this)
    }



    loginfun = event => {
        event.preventDefault();
        console.log("Login function");
        var logindata = {
            'email': this.state.Email,
            'password': this.state.Password,
        
        }


        loginService(logindata)
            .then(res => {
                console.log("after login", res.data)
                localStorage.setItem('token',res.data.token)
                sessionStorage.setItem('userdata', res.data)
                sessionStorage.setItem('userid', res.data.id )
                this.setState({ redirect: true })
            })

            .catch(error => {
                console.log("error data", error.response)
            })
    

    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    render() {

        var cardBorder = "1px solid lightblue"

        if (this.state.redirect) {
            return (<Redirect to={"/dashboard"} />)
        };

        if (sessionStorage.getItem('userdata') && localStorage.getItem('token')) {
            return (<Redirect to={"/dashboard"} />)
        }

        return (

            <form onSubmit={this.loginfun} id='cardMain' style={{ border: cardBorder }}>
                <div className='titleTxt' >
                    <span className='title'>F</span>
                    <span className='title'>U</span>
                    <span className='title'>N</span>
                    <span className='title'>D</span>
                    <span className='title'>O</span>
                    <span className='title'>O</span>
                </div>
                <div id="table">
                    <TextField
                        required
                        className="UsernameTxt"
                        variant="outlined"
                        margin="normal"
                        label="Email"
                        type="Email"
                        onChange={this.onChange}
                        name="Email"
                    />
                    <TextField
                        required
                        className="PasswordTxt"
                        variant="outlined"
                        margin="normal"
                        label="Password"
                        type="Password"
                        onChange={this.onChange}
                        name="Password"
                    />
                </div>

                <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    value="Login"
                    style={{
                        width: "200px",
                        marginLeft: "9em",
                        marginTop: "25px"
                    }}
                >
                    Login
                    </Button>

                <div id="signupLink">
                    <a href="/signup">Signup for fundooNotes</a>
                </div>

                <div id="signupLink">
                    <a href="/resetpassword">Forgot your password?</a>
                </div>

            </form>

        )
    }

    }
export default Login
