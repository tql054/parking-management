import React from "react";
import './filter-item.scss'
//need handle use memo or use callback
const FilterItem = ({ setItem, filterItems }) => {
    return (
        <div>
            <button onClick={() => {setItem('abc')}}>loai xe</button>
        </div>
    )
}

const FilterDate = () => {

}

export { FilterDate }
export default FilterItem