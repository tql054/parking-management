import { useEffect, useState } from 'react'
import './search-bar.scss'

const SearchBar = (props) => {
    

    const searchTypes = [
        {
            type: 'username',
            icon: <i className="fa-solid fa-user icon-type"></i>
        },

        {
            type: 'phone',
            icon: <i className="fa-solid fa-phone icon-type"></i>
        },

        {
            type: 'number',
            icon: <i className="fa-brands fa-cc-amex icon-type"></i>
        }
    ]
    
    const [searchType, setSearchType] = useState(0)
    console.log(searchType)

    return (
        <div className='search-bar'>
           <div className="search-bar__button">Tra cứu đăng ký</div>
           <input type="text" placeholder='Tìm kiếm theo tên chủ xe'/>
           <div className="search-bar__type" onClick={() => setSearchType( searchType < searchTypes.length-1  ? searchType+1 : 0)}>
                {searchTypes[searchType].icon}
                <i className="fa-solid fa-rotate  icon-change"></i>
           </div>
        </div>
    )
}

export default SearchBar