import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>⛐</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* <p>Speed: <span>{toy.speed.toLocaleString()} km/h</span></p> */}
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr />

        </article>
    )
}