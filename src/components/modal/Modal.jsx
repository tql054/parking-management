import React from "react";
import { useContext } from "react";
import "./modal.scss"
import {AreaContext} from '../area/Area'
const Modal  = ({ children}) => {
    const {handleCloseInfo} = useContext(AreaContext)
    return (
        <>
            <div className="modal" >
                <div className="modal__overlay" onClick={handleCloseInfo}></div>
                <div className="modal__body"> 
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal