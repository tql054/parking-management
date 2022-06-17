import React from "react";
import { useRef } from "react";
import "./updown-box.scss"
const UpdownBox = ({max, min}) => {
    const now = new Date()
    const hoursRef = useRef()
    const upRef = useRef()
    const downRef = useRef()

    const handleUp = (e) => {
        let value = +hoursRef.current.value.slice(0 ,hoursRef.current.value.length-3)
        if(value < max) { 
            hoursRef.current.value = `${++value}:00`
            downRef.current.classList.remove('min-size')
        } else {
            e.target.classList.add('max-size')
        } 
    }

    const handleDown = (e) => {
        let value = +hoursRef.current.value.slice(0 ,hoursRef.current.value.length-3)
        if(value > min) { 
            hoursRef.current.value = `${--value}:00`
            upRef.current.classList.remove('max-size')
        } else {
            e.target.classList.add('min-size')
        } 
    }

    return (
            <div className="box">
                <input ref={hoursRef} className='time' disabled type="text" name='timeBegin' value={`${now.getHours()}:00`}/>
                <div className="controller">
                    <i ref={upRef} onClick={handleUp} class="fa-solid fa-caret-up"></i>
                    <i ref={downRef} onClick={handleDown}  class="fa-solid fa-caret-down"></i>
                </div>
            </div>
    )
}

export default UpdownBox