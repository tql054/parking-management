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
import { useFormik } from "formik";
import * as Yup from 'yup'
import MemmberPrice, { StrangerPrice } from "../prices/Prices";

const Forms = ({id, dateBegin, dateEnd, type}) => {
    const [phoneNumber, setPhone] = useState('')
    const [cars, setCars] = useState([])
    const [searchCar, setSearchCar] = useState('')
    const [isChosen, setChosen] =  useState(false)
    const [tongtien, setTongTien] = useState(0)
    const [limitDate, setLMDate] = useState('0 ngày - 0 giờ - 0 phút')
    const [hasUser, setUser] = useState([])
    const [state, dispatch] = useStore(Context)
    const {accessToken, right, phone} = state
    const begin = new Date(dateBegin)
    const end = new Date(dateEnd)
    const get_time_remaining = (d1, d2) => {
        let ms1 = d1.getTime()
        let ms2 = d2.getTime()
        let days = Math.round((ms2 - ms1) / (24*60*60*1000))
        let hours = Math.round((ms2 - ms1) / (60*60*1000)) - (days*24)
        if(hours < 0) {
            days--;
            hours = 24 + hours;
        }
        let months = (days - days%30)/30
        days -= months*30
        if(+type===5) {
            setTongTien((hours*15 + days*40 + months*900)*1000)
        }
        if(+type===7) {
            setTongTien((hours*17 + days*45 + months*1000)*1000)
        }
        setLMDate(`${months} tháng - ${days} ngày - ${hours} giờ`)
    };

    
    const bienso = useRef()
    const inputBienso = useRef()
    const checkUser = async () => {
        try {
            const response = await pmApi.checkHasUser(phoneNumber, {})
            setUser(response)
        } catch(e) {
            console.log('Đã có lỗi xảy ra khi kiểm tra số điện thoại: ', e)
        }
    }

    const getAllXeByPhone = async () => {
        console.log(hasUser.errCode)
        if(hasUser.errCode === 0) {
            try {
                let response = []
                if(searchCar) {
                    if(right===3) {
                        response = await pmApi.getXeByPhone(phone, type, searchCar, {})
                    } else {
                        console.log('searching')
                        response = await pmApi.getXeByPhone(phoneNumber, type, searchCar, {})
                    }
                }
                setCars(response)
            }
            catch(e) {
                alert("Đã có lỗi xảy ra: ", e)
                window.location="http://localhost:3000/"
            }   
        } else {
            setCars([])
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()  
        if(searchCar) {
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

    const handleOnchangePhone = (e) => {
        // inputBienso.current.value = ""
        setSearchCar("")
        setChosen(false)
        bienso.current.hidden = true

    }

    const handleSelectNumber = (e) => {
        setChosen(true)
        setSearchCar(e.target.value)
        bienso.current.hidden = true
    }

    const handleCheckUser = (e) => {
        setPhone(e.target.value) 
        checkUser()
    }

    // useEffect(() => {
    //     checkUser()
    // }, [phoneNumber])

    useEffect(() => {
        getAllXeByPhone()
    }, [searchCar])
    // console.log(hasUser)
    useEffect(() => {
        get_time_remaining(begin, end)
    }, [])
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
                        <input type="text" onChange={handleOnchangePhone} onBlur={handleCheckUser} className="input phone-number"/>
                    )}
                    {hasUser.errCode!==0? (
                        <span className="error-message">{hasUser.message}</span>
                    ):(<></>)}
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Biển số xe:</label>
                    <input ref={inputBienso} type="text" value={searchCar} onChange={handleSearchCar} className=" input car-search" />
                    <select hidden  onChange={handleSelectNumber} size={4} ref={bienso} name="car-number" className="car-number">
                        {cars.map((car, index) => (
                            <option key={index} value={car.bienso} className="options">{car.biensoxe}</option>
                        ))}
                        
                    </select>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Thời hạn:</label>
                    <div className="date">
                        <div className="date__item">{`${begin.getHours()}:00 ngày ${begin.getDate()}/${begin.getMonth()+1}/${begin.getFullYear()}`}</div>
                        <span style={{fontWeight: "600"}}>đến</span>
                        <div className="date__item">{`${end.getHours()}:00 ngày ${end.getDate()}/${end.getMonth()+1}/${end.getFullYear()}`}</div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Thời gian đỗ:</label>
                    <span className="total-price">{limitDate}</span>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Tổng tiền:</label>
                    <span className="total-price">{`${tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VND`}</span>
                </div>

                <div className="form-buttons">
                    {isChosen&&hasUser.errCode===0?(
                        <Button onClick={(e) => handleRegister(e)} name="Thanh toán"/>
                    ):(
                        <Button unable name="Thanh toán"/>
                    )}
                </div>
            </form>

            <MemmberPrice/>
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
                await dispatch(setInfoUser({phone: response.userData.sodienthoai, right: response.userData.maquyen}))
                window.location="http://localhost:3000/"
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

const FormStranger = ({id, dateBegin, dateEnd}) => {

    const [state, dispatch] = useStore(Context)
    const {phone} = state
    const formik = useFormik({
        initialValues: {
            odo: id,
            hoten: "",
            sodienthoai: "",
            cccd: "",
            biensoxe: "",
            thoigianbatdau: dateBegin,
            thoigianketthuc: dateEnd,
            nhanvien: phone
        },

        validationSchema: Yup.object({
            hoten: Yup.string().required("Tên không được để trống"),
            sodienthoai: Yup.string().required("Số điện thoại không được để trống")
                            .matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, "Số điện thoại không chính xác"),
            cccd:       Yup.string().required("Không được để trống").min(9, "CCCD/CMND không tồn tại").max(12, "CCCD/CMND không tồn tại"),
            biensoxe: Yup.string().required("Không được để trống số biển kiểm soát")
                        .matches(/[0-9]{2}[A-Za-z]-[0-9]{5}/, "Biển kiểm soát không hợp lệ"),
        }),

        onSubmit: async (values) => {
            try {
                if(window.confirm("Xác nhận đăng ký")) {
                    const res = await pmApi.postDangkyVL(values)
                    alert('Đăng ký ô đỗ thành công')
                    window.location="http://localhost:3000/"
                } 
            } catch (e) {
                console.log(e)
            }
        }
    })

    const price = () => {
        const date_begin = new Date(dateBegin);
        const date_end = new Date(dateEnd);
        const hours = (date_end - date_begin) / 3600 / 1000;
        return hours * 15000;
    }

    const begin = new Date(dateBegin)
    const end = new Date(dateEnd)

    return (
        <div className="form-contain container">
            <h2>ĐĂNG KÝ Ô ĐỖ KHU VÃNG LAI</h2>
            <form
                id="form-register"
                onSubmit={formik.handleSubmit}
            >
                <div className="form-group">
                    <label className="label" htmlFor="id">Mã số ô đỗ:</label>
                    <span className="id">{formik.values.odo}</span>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Họ tên</label>
                    <input 
                        autoComplete="off"
                        id="hoten"
                        name="hoten"
                        type="text" 
                        className="input" 
                        value={formik.values.hoten} 
                        onChange={formik.handleChange}/>
                        {
                            formik.errors.hoten&&<span className="error-message">{formik.errors.hoten}</span>
                        }
                    
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Số điện thoại:</label>
                    <input 
                        autoComplete="off"
                        id="sodienthoai"
                        name="sodienthoai"
                        type="text" 
                        className="input phone-number" 
                        value={formik.values.sodienthoai} 
                        onChange={formik.handleChange}/>
                        {
                            formik.errors.sodienthoai&&<span className="error-message">{formik.errors.sodienthoai}</span>
                        }
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">CCCD/CMND:</label>
                    <input 
                        autoComplete="off"
                        id="cccd"
                        name="cccd"
                        type="text" 
                        className="input" 
                        value={formik.values.cccd} 
                        onChange={formik.handleChange}/>
                        {
                            formik.errors.cccd&&<span className="error-message">{formik.errors.cccd}</span>
                        }
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Biển số xe:</label>
                    <input 
                        autoComplete="off"
                        id="biensoxe"
                        name="biensoxe"
                        className=" input car-search" 
                        value={formik.values.biensoxe} 
                        onChange={formik.handleChange}/>{
                            formik.errors.biensoxe&&<span className="error-message">{formik.errors.biensoxe}</span>
                        }
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Thời hạn:</label>
                    <div className="date">
                        <div className="date__item">{`${begin.getHours()}:00 ngày ${begin.getDate()}/${begin.getMonth()+1}/${begin.getFullYear()}`}</div>
                        <span style={{fontWeight: "600"}}>đến</span>
                        <div className="date__item">{`${end.getHours()}:00 ngày ${end.getDate()}/${end.getMonth()+1}/${end.getFullYear()}`}</div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Tổng tiền:</label>
                    <span className="total-price">{`${price().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VND`}</span>
                </div>

                <div className="form-buttons">
                    <Button name="Thanh toán"/>
                </div>
            </form>

            <StrangerPrice/>
        </div>
    )
}

export {FormAuth, FormStranger}
export default Forms