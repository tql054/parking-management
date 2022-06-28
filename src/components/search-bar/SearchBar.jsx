import { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './search-bar.scss'

const SearchBar = (props) => {
    const navigate = useNavigate()
    const searchTypes = [
        {
            id: 0,
            type: 'username',
            icon: <i className="fa-solid fa-user icon-type"></i>,
            placeHolder: "Ví dụ: 'Lê Quốc Tuấn'"
        },

        {
            id: 1,
            type: 'phone',
            icon: <i className="fa-solid fa-phone icon-type"></i>,
            placeHolder: "Ví dụ: '0953265842'"
        },

        {
            id: 2,
            type: 'number',
            icon: <i className="fa-brands fa-cc-amex icon-type"></i>,
            placeHolder: "Ví dụ: '43A-178.15'"
        }
    ]

    const [searchType, setSearchType] = useState(searchTypes[0])
    const [searchKey, setSearchKey] = useState('')
    const handleSearch = useCallback(() => {
        if(searchKey.trim().length > 0) {
            navigate(`/search/${searchType.type}/${searchKey}`)
        }
    }, [searchKey, searchType, navigate])

    useEffect(() => {
        const handleEnterKey = (e) => {
            if(e.keyCode === 13) {
                e.preventDefault()
                handleSearch()
                console.log('refresh')
            }
        }

        window.addEventListener('keydown', handleEnterKey)

        return () => {
            window.removeEventListener('keydown', handleEnterKey)
        }
    }, [searchKey, handleSearch])
    return (
        <div className='search-bar'>
           <div 
                className="search-bar__button"
                onClick={() => handleSearch()}
            >Tra cứu đăng ký</div>
           <input 
                type="text" 
                value={searchKey}
                placeholder={searchType.placeHolder}
                onChange={e => setSearchKey(e.target.value)}
            />
           <div className="search-bar__type" onClick={() => setSearchType( searchType.id < searchTypes.length-1  ? searchTypes[searchType.id+1] : searchTypes[0])}>
                {searchType.icon}
                <i className="fa-solid fa-rotate  icon-change"></i>
           </div>
        </div>
    )
}

export default memo(SearchBar)