import React, { useContext } from "react";
import Button from "../button/Button";
import "./area-info.scss"
import pmApi from "../../api/pmApi";
import { useEffect, useState } from "react";
import { AreaContext } from "../area/Area";

const AreaInfo = ({idRegister, loaiDk}) => {
    const {handleCloseInfo, handleCheckout} = useContext(AreaContext)
    const [register, setRegister] = useState([])
    const warningTime = 60
    const get_minute_remaining = (d1, d2) => {
        let ms1 = d1.getTime()
        let ms2 = d2.getTime()
        let minutes = Math.ceil((ms2 - ms1) / (60*1000))
        return minutes
    };

    const checkRegister = (dateEnd) => {
        const now = new Date()
        if(dateEnd && get_minute_remaining(now, dateEnd) < warningTime) {
            alert(`Thời hạn đăng ký còn lại dưới ${warningTime} phút, hãy nhấn nút "Hết phiên" nếu khách trả ô đỗ!!`)
            return true
        }
        return false
    }
    const getInfoOdo = async () => {
        try {
            const response = await pmApi.getInfoOdo(loaiDk,{id:idRegister})
            const begin = new Date(response[0].thoigianbatdau) 
            const end= new Date(response[0].thoigianketthuc) 
            response[0].thoigianbatdau = `${begin.getHours()}:${begin.getMinutes()} ngày ${begin.getDate()}/${begin.getMonth()+1}/${begin.getFullYear()}`
            response[0].thoigianketthuc = `${end.getHours()}:${end.getMinutes()} ngày ${end.getDate()}/${end.getMonth()+1}/${end.getFullYear()}`
            response[0].warning = checkRegister(end)
            setRegister(response[0])
        }
        catch (err) {
            console.log(err)
        }
    }

    const checkoutRegister = async () => {
        try {
            const response = await pmApi.checkoutDangky(idRegister, loaiDk)
            alert('Checkout thành công!')
            handleCheckout()
            handleCloseInfo()
        } catch (err) {
            alert('Checkout không thành công!')
        }
    }

    const handleExpiring = () => {
        checkoutRegister()
    }

    

    useEffect(() => {
        getInfoOdo()
        
    }, [idRegister, loaiDk])
    useEffect(() => {
        checkRegister()
    })
    console.log(register)
    return (
        <div className="area-info">
            <div className="area-info__title">Thông tin ô đỗ</div>
            <ul className="area-info__list">
                <li className="area-info__list__item">
                    <label>Mã số ô đỗ: </label>
                    <span>{register.odo}</span>
                </li>
                { loaiDk === 'KTV' ? (
                <>
                    <li className="area-info__list__item">
                        <label>Họ và tên: </label>
                        <span>{register.hoten}</span>
                    </li>

                    <li className="area-info__list__item">
                        <label>CCCD/CMND:</label>
                        <span>{register.cccd}</span>
                    </li>
                </>
                ):(<></>)}


                <li className="area-info__list__item">
                    <label>Số điện thoại:</label>
                    <span>{register.sodienthoai}</span>
                </li>

                
                <li className="area-info__list__item">
                    <label>Biển số xe:</label>
                    <span>{register.biensoxe}</span>
                </li>

                <li className="area-info__list__item">
                    <label>Thời gian bắt đầu:</label>
                    <span>{register.thoigianbatdau}</span>
                </li>

                <li className="area-info__list__item">
                    <label>Thời gian kết thúc:</label>
                    <span>{register.thoigianketthuc}</span>
                </li>

                <li className="area-info__list__item">
                    <label>Tình trạng:</label>
                    <span>{register.trangthai}</span>
                </li>
            </ul>
            <div className="area-info__controller">
                {register.warning?(
                    <Button name={'Hết phiên'} onClick={handleExpiring}/>
                ):(
                    <Button name={'Hết phiên'} unable={true}/>
                )}

                {
                    loaiDk === 'KTV' && register.ttthanhtoan ==='Chưa thanh toán' ? (
                        <Button name={'Thanh toán'}/>
                    ) : (<></>)
                }
                
                <Button name={'Đóng'} onClick={() => {handleCloseInfo()}}/>
            </div>
        </div>
    )
}

export default AreaInfo