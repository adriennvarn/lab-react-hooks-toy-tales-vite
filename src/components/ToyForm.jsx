import React, { useState } from "react"

function ToyForm({ addToy }) {
    // blank toy to reset form
    // image is set to null rather than blank string due to warning about browser reloading infinitely
    const blankToy = {
        name: "",
        image: null,
        likes: 0
    }
    // state for controlled form
    const [newToy, setNewToy] = useState(blankToy)

    const handleChange = (e) => {
        setNewToy(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:3001/toys", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newToy)
        })
        .then(r => {
            if (r.ok) return r.json()
                else throw new Error("Error posting new toy:", r.status)
        })
        .then(data => {
            addToy(data)
            setNewToy(blankToy)
        })
        .catch(err => console.error(err))
    }

    return (
        <div className="container">
            <form className="add-toy-form" onSubmit={handleSubmit}>
                <h3>Create a toy!</h3>
                <input
                    type="text"
                    name="name"
                    value={newToy.name}
                    onChange={handleChange}
                    placeholder="Enter a toy's name..."
                    className="input-text"
                />
                <br />
                <input
                    type="text"
                    name="image"
                    value={newToy.image}
                    onChange={handleChange}
                    placeholder="Enter a toy's image URL..."
                    className="input-text"
                />
                <br />
                <input
                    type="submit"
                    name="submit"
                    value="Create New Toy"
                    className="submit"
                />
            </form>
        </div>
    )
}

export default ToyForm
