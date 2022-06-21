import { useParams } from "react-router-dom"
import { useState } from "react"
import './strangerrenting.scss'
import Button from '../components/button/Button'
const StrangerRenting = () => {
    
    const { id, dateBegin, dateEnd, dateBg, dateEd } = useParams()
    
    const date_begin = new Date(dateBegin);
    const date_end = new Date(dateEnd);
    const price = () => {
        const hours = (date_end - date_begin) / 3600 / 1000;
        return hours * 15000;
    }
    return (
        <>  
            <h1></h1>
            <h2>ĐĂNG KÝ Ô ĐỖ</h2>`
            <section className="rgt">
                <form action="http://localhost:8080/create-khachvanglai" method="POST">
                    <div className="rgt__MS">
                        <label htmlFor="">Mã số ô đỗ</label>
                        <p>{id}</p>
                        <input type="text" name="odo" value={id} hidden/>
                    </div>
                    <div className="rgt__name">
                        <label htmlFor="">Họ tên khách hàng</label>
                        <input type="text" required name="hovaten"  />
                    </div>
                    <div className="rgt__phone">
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" required name="sodienthoai"  />
                    </div>
                    <div className="rgt__CCCD">
                        <label htmlFor="">CCCD/CMND</label>
                        <input type="text" required name="cccd"  />
                    </div>
                    <div className="rgt__BSX">
                        <label htmlFor="">Biển số xe</label>
                        <input type="text" required name="biensoxe"/>
                    </div>
                    <div className="rgt__times">
                        <label htmlFor="">Thời gian</label>
                        <div className="rgt__time__content">
                            <input type="text" required name="thoigianbatdau" value={`${date_begin.getHours()}:00 ${date_end.getDate()}`} /> <span style={{ padding: ' 0px 10px' }}>Đến</span>
                            <input type="text" required name="thoigianketthuc" value={dateEnd} />
                        </div>
                    </div>
                    <div className="rgt__price">
                        <label htmlFor="">Tổng tiền</label>
                        <p>{price()}</p>
                    </div>
                    <div className="rgt__buttons">
                        <Button name='Xác nhận' />
                        <Button name='Làm mới' />
                    </div>
                </form>
            </section>
        </>
    )
}

export default StrangerRenting