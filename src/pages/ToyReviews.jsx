import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Loader } from '../cmps/Loader'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'

export function ToyReviews() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  const [review, setReview] = useState(null)
  // const [msg, setMsg] = useState({ txt: '' })

  // const { toyId } = useParams()
  const navigate = useNavigate()

  // useEffect(() => {
  //   loadToy()
  // }, [toyId])

  // function handleMsgChange(ev) {
  //   const field = ev.target.name
  //   const value = ev.target.value
  //   setMsg(msg => ({ ...msg, [field]: value }))
  // }

  // async function loadToy() {
  //   try {
  //     const toy = await toyService.getById(toyId)
  //     setToy(toy)
  //   } catch (error) {
  //     console.log('Had issues in toy details', error)
  //     showErrorMsg('Cannot load toy')
  //     navigate('/toy')
  //   }
  // }

  // async function onSaveMsg(ev) {
  //   ev.preventDefault()
  //   try {
  //     const savedMsg = await toyService.addMsg(toy._id, msg)
  //     setToy(prevToy => ({
  //       ...prevToy,
  //       msgs: [...(prevToy.msgs || []), savedMsg],
  //     }))
  //     setMsg({ txt: '' })
  //     showSuccessMsg('Message saved!')
  //   } catch (error) {
  //     showErrorMsg('Cannot save message')
  //   }
  // }

  // async function onRemoveMsg(msgId) {
  //   try {
  //     await toyService.removeMsg(toy._id, msgId)
  //     setToy(prevToy => ({
  //       ...prevToy,
  //       msgs: prevToy.msgs.filter(msg => msg.id !== msgId),
  //     }))
  //     showSuccessMsg('Message removed!')
  //   } catch (error) {
  //     showErrorMsg('Cannot remove message')
  //   }
  // }

  // const { txt } = msg

  if (!review) return <Loader />

  return (
    <section className="toy-review">
      <div className="upper-section flex flex-column align-center">
          <h2>Reviews</h2>
        </div>
    </section>
  )
}
