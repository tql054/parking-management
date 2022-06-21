import React from "react"
import { useParams } from "react-router-dom"
import { Forms } from "../components"

const MemberRenting = () => {
    const { id, dateBegin, dateEnd, dateBg, dateEd } = useParams()
    const price = () => {
        // const date_begin = new Date(dateBegin);
        // const date_end = new Date(dateEnd);
        // const hours = (date_end - date_begin) / 3600 / 1000;
        // return hours * 15000;
    }
    return (
        <>
            <Forms id={id} dateBegin={dateBegin} dateEnd={dateEnd} dateBg={dateBg} dateEd={dateEd}/>
        </>
    
    )
}

export default MemberRenting