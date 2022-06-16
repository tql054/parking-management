import React, { useEffect, useRef } from "react";
import './search-item.scss'

const SearchItem = ({ register, index }) => {
    // let timeRemain = '0'
    // let status = 0;
    // let dateEnd = new Date(register.thoigianketthuc)
    // let now = new Date()
    // let timeStampeRemain = dateEnd - now
    // const get_time_remaining = (d1, d2) => {
    //     let ms1 = d1.getTime()
    //     let ms2 = d2.getTime()
    //     let days = Math.round((ms2 - ms1) / (24*60*60*1000))
    //     let hours = Math.ceil((ms2 - ms1) / (60*60*1000)) - (days*24)
    //     if(hours < 0) {
    //         days--;
    //         hours = 24 + hours;
    //     }
    //     return days  + ' ngày - ' + 
    //             hours + ' giờ';
    // };

    // if(timeStampeRemain > 0) {
    //     timeRemain = get_time_remaining(now, dateEnd)
    //     status = 1
    // } else {
    //     if(!register.thoigiankethucthuc) {
    //         timeRemain = '-' + get_time_remaining(dateEnd, now)
    //         status = -1
    //     } 
    // }
    const registerItem = useRef()
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
    return (
        <li key={index} className='col l-4'>
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
    )
}

export default SearchItem