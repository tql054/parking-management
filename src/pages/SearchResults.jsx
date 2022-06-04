import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Filter, FilterItem, RegisterGrid } from "../components"

const SearchResult = () => {
    const filtersLoaixe = [
        {
            key: '',
            display: 'Tất cả'
        },

        {
            key: 'xe 5 chỗ',
            display: 'Xe 5 chỗ'
        },

        {
            key: 'xe 7 chỗ',
            display: 'Xe 7 chỗ'
        }
    ]

    const filtersAreaOrder = [
        {
            key: '',
            display: 'Tất cả'
        },

        {
            key: 'xe 5 chỗ',
            display: 'Xe 5 chỗ'
        },

        {
            key: 'xe 7 chỗ',
            display: 'Xe 7 chỗ'
        }
    ]

    const { type, key } = useParams()   
    const [loaixe, setLoaixe] = useState('')
    console.log(loaixe)
    return (
        <section className="grid">
            <div className="search-results row container" style={{display: "flex",margin: "15px auto", backgroundColor: "#fff"}}>
                <div className="col l-3">
                    <Filter filter="Ngày đăng ký">
                        
                    </Filter>

                    <Filter filter="Loại xe">
                        <FilterItem setItem={setLoaixe}/>
                    </Filter>

                    <Filter filter="Thứ tự ô đỗ">

                    </Filter>

                    <Filter filter="Loại đăng ký">

                    </Filter>
                    
                    <Filter filter="Tình trạng">

                    </Filter>
                </div>
                <div >
                    <div style={{fontSize: "1rem", padding: "10px"}}>Kết quả tìm kiếm cho "{key}"</div>
                    <RegisterGrid/>
                </div>
            </div>
        </section>
    )
}

export default SearchResult