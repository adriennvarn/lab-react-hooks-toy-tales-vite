import React from "react"
import ToyCard from "./ToyCard"

function ToyContainer({ toys, deleteToy }) {
    return (
        <div id="toy-collection">
            {toys.map(toy => (
                <ToyCard key={toy.id} toy={toy} deleteToy={deleteToy} />
            ))}
        </div>
    )
}

export default ToyContainer
