import React, { useState } from "react"
import Header from "./Header"
import ToyForm from "./ToyForm"
import ToyContainer from "./ToyContainer"
import { useEffect } from "react"

const API_URL = "http://localhost:3001/toys"

function App() {
    // form visibility
    const [showForm, setShowForm] = useState(false)
    // toys list
    const [toys, setToys] = useState([])

    // on page load, initialize list
    useEffect(() => {
        fetch(API_URL)
            .then(r => { 
                if (r.ok) return r.json()
                else throw new Error("Error fetching toys:", r.status)
            })
            .then(data => setToys(data))
            .catch(err => console.error(err))
    }, [])

    // show form
    function handleClick() {
        setShowForm((showForm) => !showForm)
    }

    // add toy callback from form
    function addToy(toy) {
        setToys((prevToys) => [...prevToys, toy])
    }

    // delete toy callback
    function deleteToy(toyToDelete) {
        setToys(toys.filter((toy) => toy.id !== toyToDelete.id))
    }

    // update likes callback
    function likeToy(updatedToy) {
        setToys(toys.map((toy) => toy.id === updatedToy.id ? updatedToy : toy))
    }

    return (
        <>
            <Header />
            {showForm ? <ToyForm addToy={addToy} /> : null}
            <div className="buttonContainer">
                <button onClick={handleClick}>Add a Toy</button>
            </div>
            <ToyContainer toys={toys} deleteToy={deleteToy} likeToy={likeToy} />
        </>
    )
}

export default App
