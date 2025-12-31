import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
// import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    // console.log('user:', user)
    const navigate = useNavigate()
   
    async function onLogout() {
        await logout()
        try {
            navigate('/')
            showSuccessMsg('logout successfully')
        } catch (err) {
            showErrorMsg('OOPs try again')
        }
            // .then(() => {
            //     showSuccessMsg('logout successfully')
            // })
            // .catch((err) => {
            //     showErrorMsg('OOPs try again')
            // })
    }


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Toy Apps</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/review" >Reviews</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    {user 
                    ? <NavLink to="/user" >User</NavLink>
                    : <NavLink to="/login" >Login</NavLink>
                    }

                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    {/* <LoginSignup /> */}
                </section>
            )}
            <UserMsg />
        </header>
    )
}
