import React from "react"
import { useParams } from "react-router-dom"
import { Forms } from "../components"

const MemberRenting = () => {
    const { id, dateBegin, dateEnd, dateBg, dateEd } = useParams()
    return (
        <>
            <Forms id={id} dateBegin={dateBegin} dateEnd={dateEnd} dateBg={dateBg} dateEd={dateEd}/>
        </>
    
    )
}

export default MemberRenting