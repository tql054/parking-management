import React, { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import pmApi from "../../api/pmApi";
import Context from "../../store/Context";
import { useStore } from "../../store/hooks";
import { setInfoUser } from "../../store/actions"
import Button from "../button/Button";
import './forms.scss'

const Forms = ({id, dateBegin, dateEnd, type}) => {
    const [phoneNumber, setPhone] = useState('')
    const [cars, setCars] = useState([])
    const [searchCar, setSearchCar] = useState('')
    const [isChosen, setChosen] =  useState(false)
    const [state, dispatch] = useStore(Context)
    const {accessToken, right, phone} = state
    const begin = new Date(dateBegin)
    const end = new Date(dateEnd)
    const bienso = useRef()
    let tongtien = (((end - begin) / 3600 / 1000)*15000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    const getAllXeByPhone = async () => {
        try {
            let response = []
            if(searchCar) {
                if(right===3) {
                    response = await pmApi.getXeByPhone(phone, type, searchCar, {})
                } else {
                    response = await pmApi.getXeByPhone(phoneNumber, type, searchCar, {})
                }
            }
            setCars(response)
        }
        catch(e) {
            alert("Đã có lỗi xảy ra: ", e)
            window.location="http://localhost:3000/"
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()  
        if(searchCar) {
            console.log({biensoxe:searchCar, dateBegin, dateEnd, odo:id})
            if(window.confirm("Xác nhận đăng ký")) {
                const res = await pmApi.postDangkyTV({biensoxe:searchCar, dateBegin, dateEnd, odo:id})
                alert('Đăng ký ô đỗ thành công')
                window.location="http://localhost:3000/"
            } 
        }
    }

    const handleSearchCar = (e) => {
        setSearchCar(e.target.value)
        setChosen(false)
        if(e.target.value && cars.length>0) {
            bienso.current.hidden = false
        } else {
            bienso.current.hidden = true
        }
    }

    const handleSelectNumber = (e) => {
        setSearchCar(e.target.value)
        setChosen(true)
        bienso.current.hidden = true
    }

    useEffect(() => {
        getAllXeByPhone()
    }, [searchCar])
    

    return (
        <div className="form-contain container">
            <h2>ĐĂNG KÝ Ô ĐỖ CHO KHÁCH THÀNH VIÊN</h2>
            <form
                id="form-register"
            >
                <div className="form-group">
                    <label className="label" htmlFor="id">Mã số ô đỗ:</label>
                    <span className="id">{id}</span>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Số điện thoại:</label>
                    {right===3? (
                        <input type="text" disabled className="input phone-number" value={phone}/>
                    ): (
                        <input type="text" onBlur={(e) => {setPhone(e.target.value)}} className="input phone-number"/>
                    )}
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Biển số xe:</label>
                    <input type="text" value={searchCar} onChange={handleSearchCar} className=" input car-search" />
                    <select hidden  onChange={handleSelectNumber} size={4} ref={bienso} name="car-number" className="car-number">
                        {cars.map((car, index) => (
                            <option key={index} value={car.bienso} className="options">{car.biensoxe}</option>
                        ))}
                        {/* <option  value="1" className="options">43A-174.14</option>
                        <option  value="2" className="options">43A-174.142</option>
                        <option  value="4" className="options">43A-174.143</option>
                        <option  value="5" className="options">43A-174.144</option>
                        <option  value="6" className="options">43A-174.145</option>
                        <option  value="7" className="options">43A-174.146</option> */}
                        
                    </select>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Thời gian đỗ:</label>
                    <div className="date">
                        <div className="date__item">{`${begin.getHours()}:00 ngày ${begin.getDate()}/${begin.getMonth()+1}/${begin.getFullYear()}`}</div>
                        <span style={{fontWeight: "600"}}>đến</span>
                        <div className="date__item">{`${end.getHours()}:00 ngày ${end.getDate()}/${end.getMonth()+1}/${end.getFullYear()}`}</div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Tổng tiền:</label>
                    <span className="total-price">{`${tongtien} VND`}</span>
                </div>

                <div className="form-buttons">
                    {isChosen?(
                        <Button onClick={(e) => handleRegister(e)} name="Thanh toán"/>
                    ):(
                        <Button unable name="Thanh toán"/>
                    )}
                </div>
            </form>
        </div>
    )
}

const FormAuth = () => {
    const [handling, setHandling] = useState(false)
    const [phoneNumber, setPhone] = useState('')
    const [password, setPassword] = useState('') 
    const [response, setResponse] = useState({})
    const [state, dispatch] = useStore(Context)

    const handleChangePhone = (e) => {
        setPhone(e.target.value)
        setResponse({})
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
        setResponse({})
    }


    const handleLogin = useCallback(async (e) => {
        e.preventDefault()
        setHandling(true)
        try {
            const response = await pmApi.checkLogin({phone: phoneNumber, password})
            console.log(response)
            setResponse(response)
            if(response.errCode === 0) {
                //dispatch action
                window.location="http://localhost:3000/"
                dispatch(setInfoUser({phone: response.userData.sodienthoai, right: response.userData.maquyen}))
                //redirect(/)
            }
        } catch (e) {
            alert("Rất tiếc! Đã có lỗi xảy ra")
        }
        setHandling(false)
    })

    return (
        <>
            
            <div className="form-contain container">
                <h2>ĐĂNG NHẬP</h2>
                <form
                    id="form-login"
                >
                    <div className="form-group">
                        <label className="label" htmlFor="id">Số điện thoại:</label>
                        <input 
                            type="text" 
                            className="input login-account" 
                            value={phoneNumber}
                            onChange={handleChangePhone}
                        />
                    </div>
                        {response.errCode === 1 ? 
                            (<span className="form-message phone">{response.message}</span>)
                            :(<></>)
                        }
                        
                    <div className="form-group">
                        <label className="label" htmlFor="id">Mật khẩu</label>
                        <input 
                            type="text" 
                            className=" input login-password" 
                            value={password}
                            onChange={handleChangePassword}
                        />
                    </div>
                    {response.errCode === 2 ? 
                        <span className="form-message password">{response.message}</span>
                        :(<></>)
                    }
                        
                        

                    <div className="form-button">
                        {handling ? (
                            <Button unable={true} name={"Đăng nhập"}/>
                        ):(
                            <Button onClick={handleLogin} name={"Đăng nhập"}/>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
} 

export {FormAuth}
export default Forms