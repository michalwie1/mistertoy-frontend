import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom"

import { userService } from "../services/user.service.js"
import { ReviewList } from '../cmps/ReviewList.jsx'
import { store } from '../store/store.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { loadReviews, addReview, removeReview} from '../store/actions/review.actions'
import { SET_WATCHED_USER } from '../store/reducers/user.reducer.js'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

export function UserDetails() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const params = useParams()
    const userId = params.id
    // const { userId } = useParams()
    const navigate = useNavigate()
    const [review, setReview] = useState({ txt: '' })

    
    // useEffect(() => {
    //     console.log(params.id)
    //     if (userId) loadUser()
    //     loadReviews({byUserId: userId})
    // }, [userId])


    useEffect(() => {
        // console.log(params.id)
        console.log(userId)
        // loadUser(userId)
        if (userId) loadUser()
        loadReviews({byUserId: userId})

        socketService.watchUser(userId)

        socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
        socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

        return () => {
        socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        }

    }, [userId])

    function onUserUpdate(user) {
        console.log('bla')
        showSuccessMsg(`This user ${user.fullname} just got updated from socket`)
        store.dispatch({ type: SET_WATCHED_USER, user })
    }

    // function loadUser() {
    //     userService.getById(userId)
    //         .then(user => {
    //             console.log('user:', user)
    //             setUser(user)
    //         })
    //         .catch(err => {
    //             console.log('Had issues in user details', err)
    //             navigate('/')
    //         })
    // }

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            store.dispatch({ type: SET_WATCHED_USER, user })
        } catch (error) {
            showErrorMsg('Cannot load user')
            console.log('Cannot load user', error)
            navigate('/')
        }
    }

  async function onRemoveReview(reviewId) {
        try {
            removeReview(reviewId)
            showSuccessMsg('Review removed!')
        } catch (err) {
            console.log('problem with removing review', err)
        }
    }

    console.log(reviews)
    if (!user) navigate('/')
    // if (!user) return <div>Loading...</div>

    const loggedInUser = userService.getLoggedinUser()

    return (
        
        <section className="user-details">
            <h2>Fullname: {user.fullname}</h2>

            {!reviews || reviews.length === 0 
            ? <p>No reviews yet...</p>
            : <ReviewList
                reviews={reviews}
                onRemoveReview={onRemoveReview}
            />}
            <Link to="/">Back Home</Link>
        </section>
    )
}