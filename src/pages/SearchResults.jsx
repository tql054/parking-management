import React, { useState } from "react"
import { useCallback } from "react"
import { useParams } from "react-router-dom"
import { Filter, FilterItem, SearchGrid } from "../components"
import Button from "../components/button/Button"
import { FilterDate } from "../components/filter-item/FilterItem"

const SearchResult = () => {
    const filtersLoaixe = [
        {
            key: '',
            display: 'Tất cả'
        },

        {
            key: '5',
            display: 'Xe 5 chỗ'
        },

        {
            key: '7',
            display: 'Xe 7 chỗ'
        }
    ]

    const filterAreaOrder = [
        {
            key: 'asc',
            display: 'Tăng dần'
        },

        {
            key: 'desc',
            display: 'Giảm dần'
        }
    ]

    const filterTinhtrang = [
        {
            key: '',
            display: 'Tất cả'
        },

        {
            key: 'Active',
            display: 'Đang đỗ'
        },

        {
            key: 'Outdate',
            display: 'Quá hạn'
        },

        {
            key: 'Blocked',
            display: 'Đã hoàn thành'
        },
    ]

    const filterLoaiDk = [
        {
            key: 'dangkythanhvien',
            display: 'Thành viên'
        },

        {
            key: 'dangkyvanglai',
            display: 'Vãng lai'
        }
    ]

    const { type, key } = useParams()   
    const [loaixe, setLoaixe] = useState('')
    const [thutu, setThutu] = useState('asc')
    const [tinhtrang, setTinhtrang] = useState('')
    const [dangky, setDangky] = useState('dangkythanhvien')
    const [ngaydang, setNgayDang] = useState(true)
    const [ngayBD, setNgayBD]  = useState('')
    const [ngayKT, setNgayKT]  = useState('')
    const [limit, setLimit] = useState(10)
    const [isLimited, setIsLimited] = useState(true)
    const handleLoadMore = (e) => {
        console.log('loadMore')
        setLimit(prevState => prevState+=9)
    }

    return (
        <section className="grid">
            <div className="search-results row container" style={{display: "flex",margin: "15px auto", backgroundColor: "#fff", minHeight: "800px"}}>
                <div className="col l-3">
                    <Filter filter="Ngày đăng ký">
                        <FilterDate itemSM={ngaydang} setItem={setNgayDang} dateBegin={ngayBD} setDateBegin={setNgayBD} dateEnd={ngayKT} setDateEnd={setNgayKT}/>
                    </Filter>

                    <Filter filter="Loại đăng ký">
                        <FilterItem itemSM={dangky} setItem={setDangky} filterItems={filterLoaiDk}/>
                    </Filter>

                    <Filter filter="Tình trạng">
                        <FilterItem itemSM={tinhtrang} setItem={setTinhtrang} filterItems={filterTinhtrang}/>
                    </Filter>

                    <Filter filter="Loại xe">
                        <FilterItem itemSM={loaixe} setItem={setLoaixe} filterItems={filtersLoaixe}/>
                    </Filter>

                    {/* <Filter filter="Thứ tự ô đỗ">
                        <FilterItem itemSM={thutu} setItem={setThutu} filterItems={filterAreaOrder}/>
                    </Filter> */}

                    
                </div>
                <div className="col l-9" style={{position: "relative", paddingBottom: "20px"}}>
                    <div style={{fontSize: "1.2rem", padding: "11px 0", borderBottom:"solid #ccc 1px"}}>Kết quả tìm kiếm cho "{key}"</div>
                    <SearchGrid setIsLimited={setIsLimited} dangky={dangky} searchType={type} searchKey={key} params={{loaixe, thutu, tinhtrang,ngaydang, ngayBD, ngayKT, limit}}/>
                    
                    {isLimited ? (
                        <div 
                            style={{textAlign: "center", 
                                    color:"#ccc", 
                                    marginBottom: "10px",
                                    position: "absolute",
                                    bottom: "0",
                                    left: "50%",
                                    transform: "translateX(-50%)"}}>Đã đến cuối kết quả tìm kiếm</div>
                    ) : (
                        <Button name="Tải thêm" onClick={handleLoadMore} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default SearchResult