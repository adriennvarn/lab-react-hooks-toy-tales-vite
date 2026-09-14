import React, { useState } from "react"
import {v4 as uuid} from "uuid"

function ToyForm({ addToy }) {
    // blank toy to reset form
    // id reset to avoid dupes
    const blankToy = {
        id: uuid(),
        name: "",
        image: "",
        likes: 0
    }
    // state for controlled form
    const [newToy, setNewToy] = useState(blankToy)

    // update newToy on change
    const handleChange = (e) => {
        setNewToy(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    // on submit, POST newToy, call addToy to update UI, and reset newToy to blank with new id
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
