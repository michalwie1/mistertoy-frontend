import { Link } from "react-router-dom";
import { ToyImg } from '../cmps/ToyImg'

export function ToyPreview({ toy }) {

    return (
        <Link to={`/toy/${toy._id}`}>
        <article>
            <h4>{toy.name}</h4>
            <ToyImg toyName={toy.name} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr />

        </article>
        </Link>
    )
}