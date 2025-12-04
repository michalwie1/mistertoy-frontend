import { Provider } from 'react-redux'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './assets/style/main.css'


import { UserMsg } from './cmps/UserMsg.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'
import { HomePage } from './pages/HomePage.jsx'




function AuthGuard({ children }) {
    const loggedInUser = null
    return loggedInUser ? children : <Navigate to="/toy" />
}


export function App() {
    const obj = {
        className: "main-layout app"
    }
    return (
        <Provider store={store}>
            <Router>
                <section {...obj}>
                    <AppHeader />
                    <main >
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route
                                element={
                                    <AuthGuard>
                                        <ToyEdit />
                                    </AuthGuard>
                                }
                                path="/toy/edit/:toyId?"
                            />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
            <UserMsg />
        </Provider>
    )
}

