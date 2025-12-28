import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <Link to={`/toy/${toy._id}`}>
        <article>
            <h4>{toy.name}</h4>
            <h1>⛐</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr />

        </article>
        </Link>
    )
}