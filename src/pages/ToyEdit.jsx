import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
// import { useOnlineStatus } from "../hooks/useOnlineStatusSyncStore.js"
import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"


export function ToyEdit() {
    const navigate = useNavigate()
    const [cartoEdit, setCartoEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const isOnline = useOnlineStatus()
    const setHasUnsavedChanges = useConfirmTabClose()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setCartoEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCartoEdit((prevToy) => ({ ...prevToy, [field]: value }))
        setHasUnsavedChanges(true)
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!cartoEdit.price) cartoEdit.price = 1000
        saveToy(cartoEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <>
            <div></div>
            <section className="toy-edit">
                <h2>{cartoEdit._id ? 'Edit' : 'Add'} Toy</h2>

                <form onSubmit={onSaveToy} >
                    <label htmlFor="vendor">Vendor : </label>
                    <input type="text"
                        name="vendor"
                        id="vendor"
                        placeholder="Enter vendor..."
                        value={cartoEdit.vendor}
                        onChange={handleChange}
                    />
                    <label htmlFor="price">Price : </label>
                    <input type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={cartoEdit.price}
                        onChange={handleChange}
                    />

                    <div>
                        <button>{cartoEdit._id ? 'Save' : 'Add'}</button>
                        <Link to="/toy">Cancel</Link>
                    </div>
                    <section>
                        <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
                    </section>
                </form>
            </section>
        </>
    )
}


