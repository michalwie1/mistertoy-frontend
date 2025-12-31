
import { UserMsg } from './UserMsg.jsx'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)
    const toysLength = useSelector(storeState => storeState.toyModule.toys.length)

    return (
        <footer className='app-footer'>
            <h5>
                Currently {toysLength} toys in the shop
            </h5>
            <p>
                Coffeerights to all
            </p>
            <h5>
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                }}>
                </a>
            </h5>
            <UserMsg />
        </footer>
    )
}
