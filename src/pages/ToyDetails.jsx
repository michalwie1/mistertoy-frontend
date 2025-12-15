import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from "../services/toy.service.js"
import { PopUp } from '../cmps/PopUp.jsx'
import { Chat } from '../cmps/Chat.jsx'

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        const toy = await toyService.getById(toyId)
        try {
            setToy(toy)
        } catch (err){
            console.log('Had issues in toy details', err)
                navigate('/toy')
        }
            // .then(toy => setToy(toy))
            // .catch(err => {
            //     console.log('Had issues in toy details', err)
            //     navigate('/toy')
            // })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>⛐</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
              <section>
                <PopUp
                    header={<h3>Chat About {toy.name}s</h3>}
                    footer={<h4>&copy; 2025-9999 Toys INC.</h4>}
                    onClose={() => setIsChatOpen(false)}
                    isOpen={isChatOpen}
                >
                    <Chat />
                </PopUp>
            </section >
                        {!isChatOpen && <button onClick={() => setIsChatOpen(true)} className='open-chat'>Chat</button>}

            <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p>

        </section>
    )
}



/*

<PopUp header={<header></header>} footer={<footer ></footer>}>
    <Chat />
</PopUp>


function PopUp({ children, header, footer, isOpen }) {


    return (
        <section>
            <header>{header}</header>
            <main>
                {children}
            </main>
            <footer>{footer}</footer>
        </section>
    )
}

function Chat() {


}
*/

