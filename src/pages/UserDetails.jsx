import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom"

import { userService } from "../services/user.service.js"
import { ToyReview } from '../cmps/ToyReview.jsx'

import { loadReviews, addReview, removeReview} from '../store/actions/review.actions'



export function UserDetails() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const { userId } = useParams()
    const navigate = useNavigate()
    const [review, setReview] = useState({ txt: '' })

    useEffect(() => {
        if (userId) loadUser()
        loadReviews({aboutToyId: toyId})
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

    function handleReviewChange({ target }) {
        const { name: field, value } = target
        setReview(review => ({ ...review, [field]: value }))
    }
    async function onSaveReview(ev) {
        ev.preventDefault()
        const savedReview = {
        txt: review.txt,
        aboutToyId: toy._id,
        }
        try {
        addReview(savedReview)
        showSuccessMsg('Review saved!')
        } catch (err) {
        console.log('error saving the review :', err)
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

    if (!user) navigate('/')
    // if (!user) return <div>Loading...</div>

    const loggedInUser = userService.getLoggedinUser()
    const isMyProfile = loggedInUser._id === userId
    return (
        
        <section className="user-details">
            <h1>Fullname: {user.fullname}</h1>
            {isMyProfile && (
                <section>
                    <h2>My Stuff!</h2>
                </section>
            )}
            <p>@</p>
            <ToyReview
                toy={toy}
                review={review}
                reviews={reviews}
                handleChange={handleReviewChange}
                onSaveReview={onSaveReview}
                onRemoveReview={onRemoveReview}
            />
            {/* <p>User is so lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p> */}
            <Link to="/">Home</Link>
        </section>
    )
}