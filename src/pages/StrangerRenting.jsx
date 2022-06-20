import { useParams } from "react-router-dom"

const StrangerRenting = () => {

    const { id, dateBegin, dateEnd } = useParams()
    return (
        <section>
            <h1>{id}</h1>
            <h1>{dateBegin}</h1>
            <h1>{dateEnd}</h1>
        </section>
    )
}

export default StrangerRenting