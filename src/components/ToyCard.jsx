import React from "react"

function ToyCard({ toy, deleteToy, likeToy }) {
    // function to donate (delete) toy
    function handleDelete() {
        fetch(`http://localhost:3001/toys/${toy.id}`, {
            method: "DELETE"
        })
            .then(r => {
                if (!r.ok) throw new Error("Error deleting toy:", r.status)
                else deleteToy(toy)
            })
            .catch(err => console.error(err))
    }

    // function to add likes to toy
    function handleLike() {
        fetch(`http://localhost:3001/toys/${toy.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                likes: toy.likes + 1
            })
        })
            .then(r => {
                if (r.ok) return r.json()
                else throw new Error("Error liking toy:", r.status)
            })
            .then(likeToy)
            .catch(err => console.error(err))
    }

    // note that image src is changed to null on render, to avoid browser reloading page infinitely
    return (
        <div className="card" data-testid="toy-card">
            <h2>{toy.name}</h2>
            <img
                src={toy.image || null}
                alt={toy.name}
                className="toy-avatar"
            />
            <p>{toy.likes} Likes </p>
            <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
            <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
        </div>
    )
}

export default ToyCard
