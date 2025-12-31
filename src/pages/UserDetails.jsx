import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom"

import { userService } from "../services/user.service.js"
import { ReviewList } from '../cmps/ReviewList.jsx'

import { loadReviews, addReview, removeReview} from '../store/actions/review.actions'


export function UserDetails() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const { userId } = useParams()
    const navigate = useNavigate()
    const [review, setReview] = useState({ txt: '' })

    useEffect(() => {
        if (userId) loadUser()
        loadReviews({byUserId: userId})
    }, [userId])

    function loadUser() {
        userService.getById(userId)
            .then(user => {
                console.log('user:', user)
                setUser(user)
            })
            .catch(err => {
                console.log('Had issues in user details', err)
                navigate('/')
            })
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