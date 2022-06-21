import { useParams } from "react-router-dom"

const StrangerRenting = () => {

    const { id, dateBegin, dateEnd, dateBg, dateEg } = useParams()
    return (
        <section>
            <h1>{id}</h1>
            <h1>{dateBg}</h1>
            <h1>{dateEg}</h1>
        </section>
    )
}

export default StrangerRenting