import React from "react"
import { useParams } from "react-router-dom"
import { Filter } from "../components"

const SearchResult = () => {
    const { type, key } = useParams()
    return (
        <section className="grid">
            <div className="search-results row container" style={{display: "flex",margin: "15px auto", backgroundColor: "#fff"}}>
                <div className="col l-3">
                    <Filter filter="Ngày đăng ký">
                        abc
                    </Filter>
                    <Filter filter="Loại xe"/>
                    <Filter filter="Thứ tự ô đỗ"/>
                    <Filter filter="Loại đăng ký"/>
                    <Filter filter="Tình trạng"/>
                </div>
                <div >
                    <div style={{fontSize: "1rem", padding: "10px"}}>Kết quả tìm kiếm cho "{key}"</div>
                    
                </div>
            </div>
        </section>
    )
}

export default SearchResult