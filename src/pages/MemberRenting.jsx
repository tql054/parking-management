import React from "react"
import { useParams } from "react-router-dom"
import { Forms } from "../components"
import MemmberPrice from "../components/prices/Prices"

const MemberRenting = () => {
    const { id, dateBegin, dateEnd, type} = useParams()
    return (
        <>
            <Forms id={id} dateBegin={dateBegin} dateEnd={dateEnd} type={type}/>
        </>

    )
}

export default MemberRenting