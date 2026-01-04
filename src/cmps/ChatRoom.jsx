import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'
import { userService } from '../services/user.service.js'
import { toyService } from '../services/toy.service.js'
// import { utilService } from '../services/util.service.js'
// import { storageService } from '../services/async-storage.service.js'

export function ChatRoom({ toy }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState(toy.msgs || [])
    const [topic, setTopic] = useState(toy._id)
    const [isBotMode, setIsBotMode] = useState(false)

    const user = userService.getLoggedinUser()

    const botTimeoutRef = useRef()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        }
    }, [])

    // useEffect(() => {
    //     socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    // }, [topic])


    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
        // toyService.addMsg(toy._id, {txt: newMsg.txt})
        // addToyMsgs(newMsg.txt)
        console.log(toy)
    }

    function sendBotResponse() {
        // Handle case: send single bot response (debounce).
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { by: {fullname: 'Bot'}, txt: 'You are amazing!' }]))
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
       
        const from = user?.fullname || 'Me'
        const newMsg = { by: {fullname: from}, txt: msg.txt }

        // setMsgs(prevMsgs => [...prevMsgs, newMsg])
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)

        if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })

        console.log('newMsg', newMsg)
        console.log('msgs', msgs)
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="chat">
            <h2>Chat Room</h2>

            <section className="chat-options">
                <h2>Let's talk about {toy.name}</h2>

                <label>
                    <input type="checkbox" name="isBotMode" checked={isBotMode}
                        onChange={({ target }) => setIsBotMode(target.checked)} />
                    Bot Mode
                </label>
            </section>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.by.fullname}: {msg.txt}</li>))}
                {/* {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))} */}
            </ul>
        </section>
    )
}