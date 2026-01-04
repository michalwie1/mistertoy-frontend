import { userService } from '../services/user.service.js'


import { ReviewPreview } from './ReviewPreview.jsx'


export function ReviewList({ reviews, onRemoveReview }) {
    
    function shouldShowActionBtns(review) {
        const user = userService.getLoggedinUser()
        
        console.log('user to check', user)

        if (!user) return false
        if (user.isAdmin) return true
        if (!user.isAdmin) return false
        return review.byUser?._id === user._id
    }


    return <section>
        <h2>My Reviews:</h2>
        <ul className="review-list">
            {reviews.map(review =>
                <li key={review._id}>
                    {shouldShowActionBtns(review) && <div className="actions">
                        <button onClick={() => onRemoveReview(review._id)}>x</button>
                    </div>}                    
                    <ReviewPreview review={review}/>
                </li>)
            }
        </ul>
    </section>
}
