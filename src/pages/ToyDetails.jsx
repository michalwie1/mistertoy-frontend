import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Loader } from '../cmps/Loader'
import { ToyImg } from '../cmps/ToyImg'
import { ToyReview } from '../cmps/ToyReview.jsx'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service.js'
import { loadReviews, addReview, removeReview} from '../store/actions/review.actions'


export function ToyDetails() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)

  const [toy, setToy] = useState(null)
  const [msg, setMsg] = useState({ txt: '' })
  const [review, setReview] = useState({ txt: '' })

  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
    loadReviews({aboutToyId: toyId})
  }, [toyId])

  function handleMsgChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setMsg(msg => ({ ...msg, [field]: value }))
  }

    function handleReviewChange({ target }) {
    const { name: field, value } = target
    setReview(review => ({ ...review, [field]: value }))
  }


  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (error) {
      console.log('Had issues in toy details', error)
      showErrorMsg('Cannot load toy')
      navigate('/toy')
    }
  }

  async function onSaveMsg(ev) {
    ev.preventDefault()
    try {
      const savedMsg = await toyService.addMsg(toy._id, msg)
      setToy(prevToy => ({
        ...prevToy,
        msgs: [...(prevToy.msgs || []), savedMsg],
      }))
      setMsg({ txt: '' })
      showSuccessMsg('Message saved!')
    } catch (error) {
      showErrorMsg('Cannot save message')
    }
  }

  async function onRemoveMsg(msgId) {
    try {
      await toyService.removeMsg(toy._id, msgId)
      setToy(prevToy => ({
        ...prevToy,
        msgs: prevToy.msgs.filter(msg => msg.id !== msgId),
      }))
      showSuccessMsg('Message removed!')
    } catch (error) {
      showErrorMsg('Cannot remove message')
    }
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


  const { txt } = msg

  if (!toy) return <Loader />


  // console.log(reviews)
  return (
    <section className="toy-details" style={{ textAlign: 'center' }}>
      <div className="upper-section flex flex-column align-center">
        <ToyImg toyName={toy.name} />
        <h2>
          Toy name: <span>{toy.name}</span>
        </h2>
        <h2>
          Toy price: <span>${toy.price}</span>
        </h2>
        <h2>
          Labels: <span>{toy.labels.join(' ,')}</span>
        </h2>
        <h2 className={toy.inStock ? 'green' : 'red'}>
          {toy.inStock ? 'In stock' : 'Not in stock'}
        </h2>
        <button>
          <Link to="/toy">Back</Link>
        </button>
      </div>
      {user && (
        <div className="msg-container">
          <h2>Chat</h2>
          <form className="login-form" onSubmit={onSaveMsg}>
            <input
              type="text"
              name="txt"
              value={txt}
              placeholder="Enter Your Message"
              onChange={handleMsgChange}
              required
              autoFocus
            />
            <button>Send</button>
          </form>
          <div>
            <ul className="clean-list">
              {toy.msgs &&
                toy.msgs.map(msg => (
                  <li key={msg.id}>
                    By: {msg.by ? msg.by.fullname : 'Unknown User'} - {msg.txt}
                    <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                      ✖️
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

        {user && (
        <ToyReview
          toy={toy}
          review={review}
          reviews={reviews}
          handleChange={handleReviewChange}
          onSaveReview={onSaveReview}
          onRemoveReview={onRemoveReview}
        />
      )}

    </section>
  )
}
