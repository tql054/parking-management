import React from "react";
import Calendars from "../caledar/Calendar";
import './filter-item.scss'
//need handle use memo or use callback
const FilterItem = ({ itemSM, setItem, filterItems }) => {
    return (
        <>
            {
                filterItems.map((item, index) => {
                    return (
                        <div key={index} className="form-group">
                            <input 
                                className="input__check"
                                type='checkbox' 
                                checked={itemSM === item.key}
                                onChange={() => {setItem(item.key)}}
                            />{item.display}
                        </div>
                    )
                })
            }

        </>
    )
}

const FilterDate = ({ itemSM, setItem, dateBegin, setDateBegin, dateEnd, setDateEnd }) => {
    return (
        <>
            {/* <div className="filter-date">
                <div className="filter-date__control">
                    <div className="title">Từ ngày</div>
                    <div className="controller">
                        <i class="fa-solid fa-caret-left"></i>
                        <div className="date">12/12/2022</div>
                        <i class="fa-solid fa-caret-right"></i>
                    </div>
                    <div className="title">Đến ngày</div>
                    <div className="controller">
                        <i class="fa-solid fa-caret-left"></i>
                        <div className="date">12/12/2022</div>
                        <i class="fa-solid fa-caret-right"></i>
                    </div>
                </div>
            </div> */}
            <Calendars itemSM={itemSM} setDateBegin={setDateBegin} setDateEnd={setDateEnd} dateBegin={dateBegin} dateEnd={dateEnd}/>
            
            <div className="form-group">
                <input 
                    className="input__check"
                    type='checkbox' 
                    checked={itemSM}
                    onChange={() => {setItem(!itemSM)}}
                />Tất cả
            </div>
        </>

    )
}

export { FilterDate }
export default FilterItem