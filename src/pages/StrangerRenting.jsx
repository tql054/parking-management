import React from 'react';
import './strangerreanting.scss'

const tinhs = [
    {
        id: 1,
        name: 'Quảng Nam'
    },
    {
        id: 1,
        name: 'Đà Nẵng'
    }, {
        id: 1,
        name: 'Hà Nội'
    }, {
        id: 1,
        name: 'Quảng Trị'
    }
]
const StrangerRenting = () => {
    return (
        <section className="register">
            <form action="">
                <h2 className="register__title">ĐĂNG KÝ Ô ĐỖ</h2>
                <div className="register__name">
                    <label htmlFor="">Họ và tên khách hàng</label>
                    <input type="text" name="" value='' /> <span>(*)</span>
                </div>
                <div className="register__phone">
                    <label htmlFor="">Số điện thoại</label>
                    <input type="text" name="" value='' /><span>(*)</span>
                </div>
                <div className="register__address">
                    <label htmlFor="">Địa chỉ thường trú</label>
                    <div className="register__address__group">
                        <div className="register__address__group1">
                            <div className="register__address__group1__adr1">
                                <label htmlFor="">Địa chỉ</label>
                                <input type="text" name="" value='' />
                            </div>
                            <div>
                                <label htmlFor="">Quận/Huyện</label>
                                <select>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>

                        <div className="register__address__group2">
                            <div className="register__address__group2__adr2">
                                <label htmlFor="">Tỉnh/Thành phố</label>
                                <select>
                                    {
                                        tinhs.map(tinh => (
                                            <option key={tinh.id} value={tinh.name}>{tinh.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Phường/Xã</label>
                                <select>
                                    <option value="">aa</option>
                                </select>
                            </div>
                        </div>
                        <span>(*)</span>
                    </div>
                </div>
                <div className="register__CCCD">
                    <label htmlFor="">CMND/CCCD</label>
                    <input type="text" name="" value='' /><span>(*)</span>
                </div>
                <div className="register__license-plates">
                    <label htmlFor="">Biển số xe</label>
                    <input type="text" name="" value='' /><span>(*)</span>
                </div>

                <div className="register__buttons">
                    <button type="submit">Xác nhận</button>
                    <button type="submit">Làm mới</button>
                </div>
            </form>
        </section>
    )
}

export default StrangerRenting