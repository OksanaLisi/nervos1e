import React, {useState, useContext} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
import './AuthPage.scss'




const AuthPage = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const {login} = useContext(AuthContext)

    const changeHandler = (event) =>{
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form);
    }

    const registerHandler = async () =>{
        try {
            await axios.post('https://pcc-team-9b757ec39e30.herokuapp.com/api/auth/registration ', {...form},{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response))
        } catch (error) {
            console.log(error)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('https://pcc-team-9b757ec39e30.herokuapp.com/api/auth/login ', {...form},{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                login(response.data.token, response.data.userId)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path='/login'>
                                <h3>
                                    Authorization
                                </h3>
                                <form className="form form-login">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input 
                                                type="email" 
                                                name="email"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input 
                                                type="password" 
                                                name="password"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="row">
                                            <button
                                                type='button'
                                                className="login-reg-button"
                                                onClick={loginHandler}
                                            >
                                                Login
                                            </button>

                                            <Link to="/registration" className="btn-outline btn-reg login-reg-link">No Account?</Link>
                                        </div>
                                    </div>
                                </form>
                            </Route>




                            <Route path='/registration'>
                                <h3>
                                    Registration
                                </h3>
                                <form className="form form-login">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input 
                                                type="email" 
                                                name="email"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input 
                                                type="password" 
                                                name="password"
                                                className="validate"
                                                onChange={changeHandler}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="row">
                                            <button
                                                className="login-reg-button"
                                                onClick={registerHandler}
                                            >
                                                Sign In
                                            </button>

                                            <Link to="/login" className="btn-outline btn-reg login-reg-link">Have Account?</Link>
                                        </div>
                                    </div>
                                </form> 
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPage