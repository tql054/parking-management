const MemberRenting = () => {
    const { id, dateBegin, dateEnd } = useParams()
    const price = () => {
        const date_begin = new Date(dateBegin);
        const date_end = new Date(dateEnd);
        const hours = (date_end - date_begin) / 3600 / 1000;
        return hours * 15000;
    }
    return (
        <>
            <h2>ĐĂNG KÝ Ô ĐỖ</h2>`
            <section className="rgt">
                <form action="http://localhost:8080/create-khachvanglai" method="POST">
                    <div className="form-group">
                        <label htmlFor="">Mã số ô đỗ</label>
                        <p>{id}</p>
                        <input type="text" name="odo" value={id} hidden/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Họ tên khách hàng</label>
                        <input type="text" required name="hovaten"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Số điện thoại</label>
                        <input type="text" required name="sodienthoai"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">CCCD/CMND</label>
                        <input type="text" required name="cccd"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Biển số xe</label>
                        <input type="text" required name="biensoxe"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Thời gian</label>
                        <div className="form-group">
                            <input type="text" required name="thoigianbatdau" value={dateBegin} /> <span style={{ padding: ' 0px 10px' }}>Đến</span>
                            <input type="text" required name="thoigianketthuc" value={dateEnd} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Tổng tiền</label>
                        <p>{price()}</p>
                    </div>
                    <div className="form-group">
                        <Button name='Xác nhận' />
                        <Button name='Làm mới' />
                    </div>
                </form>
            </section>
        </>
    
    )
}

export default MemberRenting