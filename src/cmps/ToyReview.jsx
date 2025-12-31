export function ToyReview({
  toy,
  review,
  reviews,
  handleChange,
  onSaveReview,
  onRemoveReview,
}) {
  const { txt } = review


  return (
    <div className="review-container">
      <h1>Toy reviews:</h1>
      <form className="login-form" onSubmit={onSaveReview}>
        <input
          type="text"
          name="txt"
          value={txt}
          placeholder="Enter Your Review"
          onChange={handleChange}
          required
          autoFocus
        />
        <button>Send</button>
      </form>
      <div>
        <ul className="clean-list">
          {reviews &&
            reviews.map(review => (
              <li key={review._id}>
                By: {review.byUser ? review.byUser.fullname : 'Unknown User'} -{' '}
                {review.txt}
                <button
                  type="button"
                  onClick={() => onRemoveReview(review._id)}
                >
                  ✖️
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
