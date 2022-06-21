import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import pmApi from "../../api/pmApi";
import Button from "../button/Button";
import './forms.scss'

const Forms = ({id, dateBegin, dateEnd}) => {
    const [phone, setPhone] = useState('')
    const [cars, setCars] = useState([])
    const begin = new Date(dateBegin)
    const end = new Date(dateEnd)
    const bienso = useRef()
    let tongtien = (((end - begin) / 3600 / 1000)*15000).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    const getAllXeByPhone = async () => {
        try {
            const response = await pmApi.getXeByPhone(phone, {})
            setCars(response)
        }
        catch(e) {
            alert("Đã có lỗi xảy ra: ", e)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const biensoxe = bienso.current.value
        if(biensoxe) {
            if(window.confirm("Xác nhận đăng ký")) {
                const res = await pmApi.postDangkyTV({biensoxe, dateBegin, dateEnd, odo:id})
                alert('Đăng ký ô đỗ thành công')
                window.location="http://localhost:3000/"
            } 
        }
    }

    useEffect(() => {
        getAllXeByPhone()
    }, [phone])

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
                    <input type="text" onBlur={(e) => {setPhone(e.target.value)}} className="input phone-number"/>
                </div>

                <div className="form-group">
                    <label className="label" htmlFor="id">Biển số xe:</label>
                    <select ref={bienso} name="car-number" className="car-number">
                        {cars.map((car, index) => (
                            <option key={index} value={car.bienso} className="options">{car.biensoxe}</option>
                        ))}
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
                    <Button onClick={(e) => handleRegister(e)} name="Thanh toán"/>
                </div>
            </form>
        </div>
    )
}

export default Forms