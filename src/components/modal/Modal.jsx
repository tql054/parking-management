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

const RegisterModal  = ({ children, handleClose}) => {
    return (
        <>
            <div className="modal" >
                <div className="modal__overlay" onClick={handleClose}></div>
                <div className="modal__body"> 
                    {children}
                </div>
            </div>
        </>
    )
}

export {RegisterModal}
export default Modal