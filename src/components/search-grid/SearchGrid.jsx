import './search-grid.scss';
import pmApi from '../../api/pmApi' 
import React from 'react';
import { useState, useEffect } from 'react';
import SearchItem from '../search-item/SearchItem';
import { createContext } from 'react';
export const SearchContext = createContext()
const SearchResult = ({setIsLimited, dangky, searchType, searchKey, params}) => {

    const get_time_remaining = (d1, d2) => {
        let ms1 = d1.getTime()
        let ms2 = d2.getTime()
        let days = Math.round((ms2 - ms1) / (24*60*60*1000))
        let hours = Math.ceil((ms2 - ms1) / (60*60*1000)) - (days*24)
        if(hours < 0) {
            days--;
            hours = 24 + hours;
        }
        return days  + ' ngày - ' + 
                hours + ' giờ';
    };

    const [results, setResult] = useState([])
    const getResults = async () => {
        try {
            const response = await pmApi.getSearchResults(dangky, searchType, {searchKey, ...params})
            if(response.length === params.limit) {
                response.pop()
                setIsLimited(false)
            } else {
                setIsLimited(true)
            }
            const result = response.filter((register, index) => {
                register.code = 0
                register.trangthai = '0'
                let dateEnd = new Date(register.thoigianketthuc)
                let now = new Date()
                let timeStampeRemain = dateEnd - now
                if(timeStampeRemain > 0) {
                    register.trangthai =  get_time_remaining(now, dateEnd)
                    register.code = 1
                } else {
                    if(!register.thoigiankethucthuc) {
                        register.trangthai ='-' + get_time_remaining(dateEnd, now)
                        register.code = -1
                    } 
                }
                switch(params['tinhtrang']) {
                    case 'Active': {
                        return register.code === 1
                    }
                    case 'Blocked': {
                        return register.code === 0
                    }
                    case 'Outdate': {
                        return register.code === -1
                    }

                    default: return true
                }
            })
            setResult(result)
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getResults()
    }, [searchType, searchKey, params, dangky])
    return (
        <div className="list-result grid">
            <ul className='row'>
                {results.map((result, i) => (
                    <SearchContext.Provider value={{searchKey}}>
                        <SearchItem register={result} index={i} />
                    </SearchContext.Provider>
                ))}
            </ul>
        </div>
    )
}

export default SearchResult