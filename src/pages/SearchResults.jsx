import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Filter, FilterItem, SearchGrid } from "../components"
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
    // console.log(ngayBD, ngayKT)
    // console.log('abc')
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
                <div className="col l-9">
                    <div style={{fontSize: "1.2rem", padding: "11px 0", borderBottom:"solid #ccc 1px"}}>Kết quả tìm kiếm cho "{key}"</div>

                    <SearchGrid dangky={dangky} searchType={type} searchKey={key} params={{loaixe, thutu, tinhtrang,ngaydang, ngayBD, ngayKT}}/>
                </div>
            </div>
        </section>
    )
}

export default SearchResult