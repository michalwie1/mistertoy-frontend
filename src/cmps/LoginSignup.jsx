import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'


export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)
    const navigate = useNavigate()

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
        navigate('/')
    }

  function _login(credentials) {
        try {
        login(credentials)
        showSuccessMsg('Logged in successfully')
        } catch (error) {
        showErrorMsg('Oops try again')
        }
    }


  function _signup(credentials) {
        try {
        signup(credentials)
        showSuccessMsg('Logged in successfully')
        } catch (error) {
        showErrorMsg('Oops try again')
        }
    }



    // console.log('isSignup', isSignup)
    // if (isSignup) navigate('/')

    return (
        <div className="login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
