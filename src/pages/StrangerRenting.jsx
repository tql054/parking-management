import { useParams } from "react-router-dom"
import { FormStranger } from "../components/forms/Forms"
const StrangerRenting = () => {
    const { id, dateBegin, dateEnd, type } = useParams()

    return (
        <>
            <FormStranger id={id} dateBegin={dateBegin} dateEnd={dateEnd} type={type}/>
        </>
    )
}

export default StrangerRenting