import React, { useEffect, useRef, useState } from "react";
import './search-item.scss'
import Modal, { RegisterModal } from '../modal/Modal'
import { RegisterInfo } from '../area-info/AreaInfo'

const SearchItem = ({ register, index }) => {
    const registerItem = useRef()
    const [popup, setPopup] = useState(false)
    const handleClose = () => {
        setPopup(false)
    }
    useEffect(() => {
        switch(register.code) {
            case 0: {
                registerItem.current.classList.remove('red-color')
                registerItem.current.classList.add('gray-color')
                break
            }
            case -1: {
                registerItem.current.classList.remove('gray-color')
                registerItem.current.classList.add('red-color')
                break
            }
            case 1: {
                registerItem.current.classList.remove('gray-color')
                registerItem.current.classList.remove('red-color')
                break
            }

        }
    }, [register.code])
    console.log(register)
    return (
        <>
            {
                popup? (
                    <RegisterModal handleClose={handleClose}>
                        <RegisterInfo register={register} handleClose={handleClose}/>
                    </RegisterModal>
                ):(
                    <></>
                )
            }
            <li key={index} onClick={(e) => setPopup(true)} className='col l-4'>
                <div ref={registerItem} className="register">
                    <div className="register__area-name">{register.tenodo}</div>
                    <div className="register__car-number">{register.biensoxe}</div>
                    <ul className="register__info">
                        <li className="info__item fullname">
                            <i className="fa-solid fa-user info__icon"></i>
                            {register.hoten}
                        </li>

                        <li className="info__item phone">
                            <i className="fa-solid fa-phone info__icon"></i>
                            {register.sodienthoai}
                        </li>

                        <li className="info__item date">
                            <i className="fa-solid fa-clock  info__icon"></i>
                            {register.trangthai}
                        </li>
                    </ul>
                </div>
            </li>
        </>
    )
}

export default SearchItem