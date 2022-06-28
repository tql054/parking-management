import { useParams } from "react-router-dom"
import { FormStranger } from "../components/forms/Forms"
const StrangerRenting = () => {
    const { id, dateBegin, dateEnd } = useParams()

    return (
        <>
            <FormStranger id={id} dateBegin={dateBegin} dateEnd={dateEnd}/>
        </>
    )
}

export default StrangerRenting