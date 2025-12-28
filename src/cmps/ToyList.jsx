import { Link } from 'react-router-dom'
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, loggedInUser }) {
    // console.log({toys, onRemoveToy, onEditToy});
    
    if(!toys || !toys.length) return <div>No Toys!</div>
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

            {loggedInUser && loggedInUser.isAdmin && (
                <div className="flex justify-center">
                  <button>
                    <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                  </button>
                  <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                </div>
              )}


                </li>)}
        </ul>
    )
}