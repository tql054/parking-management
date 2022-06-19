import React from "react";
import Button from "../button/Button";
import "./area-info.scss"

const AreaInfo = ({onClose, idRegister}) => {
    const handleExpiring = () => {

    }

    return (
        <div className="area-info">
            <div className="area-info__title">Thông tin ô đỗ</div>
            <ul className="area-info__list">
                <li className="area-info__list__item">
                    <label>Mã số ô đỗ: </label>
                    <span>{idRegister}</span>
                </li>

                <li className="area-info__list__item">
                    <label>Họ và tên: </label>
                    <span>Lê Tuấn</span>
                </li>

                <li className="area-info__list__item">
                    <label>Số điện thoại:</label>
                    <span>0556225</span>
                </li>

                <li className="area-info__list__item">
                    <label>CCCD/CMND:</label>
                    <span>516556</span>
                </li>

                <li className="area-info__list__item">
                    <label>Biển số xe:</label>
                    <span>75-2244</span>
                </li>

                <li className="area-info__list__item">
                    <label>Thời gian bắt đầu:</label>
                    <span>22/12/2022</span>
                </li>

                <li className="area-info__list__item">
                    <label>Thời gian kết thúc:</label>
                    <span>22/12/2022</span>
                </li>

                <li className="area-info__list__item">
                    <label>Tình trạng:</label>
                    <span>Đã vào bãi</span>
                </li>
            </ul>
            <div className="area-info__controller">
                <Button name={'Hết phiên'} onClick={handleExpiring}/>
                <Button name={'Đóng'} onClick={() => {onClose()}}/>
            </div>
        </div>
    )
}

export default AreaInfo