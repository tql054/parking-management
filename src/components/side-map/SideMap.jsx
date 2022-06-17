import Area from '../area/Area'
import './side-map.scss'
import pmApi from '../../api/pmApi' 
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import UpdownBox from '../updown-box/UpdownBox'
import { createContext } from 'react'

const areas = [
    {
        name: 'KTVA',
        type: 'Từ 5 chỗ trở xuống'
    },

    {
        name: 'KTVB',
        type: 'Từ 5 chỗ trở xuống'
    },
]



const SideMap = () => {
    const now = new Date()
    const today = `${now.getFullYear()}-${(now.getMonth()+1).toString.length === 1?'0'+(now.getMonth()+1): now.getMonth()+1}-${now.getDate()}`
    const [dateBegin, setDateBegin] = useState('')
    const [tabSM, setTabSM] = useState('Khu thành viên')
    const timeBegin = useRef()
    const timeEnd = useRef()
    const tabs = ['Khu thành viên', 'Khu vãng lai']
    const hourContext = createContext()
    var hour = ''
    const handleFilting = (e) => {
        e.preventDefault()
        // console.log(timeBegin.current.value)
        // console.log(timeEnd.current.value)
        console.log(hour)

    }
    
    return (
        <div className="side-map container">
            <div className="side-map__tabs">
                {   
                    tabs.map((tab, i)=> (
                        <div 
                            key={i} 
                            className="tab"
                            style={tabSM === tab ? {backgroundColor: "#3266a7", color: "#fff", borderBottom: "solid 2.5px #c20000"} : {}}
                            onClick={(e) => {setTabSM(tab)}}
                            >
                            {tab}
                        </div>
                    ))
                }
            </div>

            <h2>Sơ đồ ô đỗ</h2>
            
            <div className="side-map__filter">
                <h5 className="side-map__filter__title">
                    Chọn mốc thời gian:
                </h5>

                <form   action="GET" 
                        className=""
                        onSubmit={handleFilting}
                >
                    <div className='side-map__filter__form'>
                        <div className="date date-from">
                            <div className="form-group">
                                <label htmlFor="timeBegin">Giờ</label>
                                {/* <select size='5' ref={timeBegin} name="timeBegin" id="cars">
                                    {
                                        hours.map((hour, index)=>(
                                            <option key={index} value={hour}>{hour}:00</option>
                                        ))
                                    }
                                    
                                </select> */}
                                <hourContext.Provider value={hour}>
                                    <UpdownBox max={23} min={0}/>
                                </hourContext.Provider>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateBegin">Ngày</label>
                                <input  type="date" 
                                        id="start" 
                                        name="dateBegin"
                                        min={today} max={`${now.getFullYear()}-12-31`}>
                                </input>
                            </div>
                        </div>
                        <h3>Đến</h3>                
                        <div className="date date-to">
                            <div className="form-group">
                                <label htmlFor="timeEnd">Giờ</label>
                                <select ref={timeEnd} name="timeEnd" id="cars">
                                    {/* {
                                        hours.map((hour, index)=>(
                                            <option key={index} value={hour}>{hour}:00</option>
                                        ))
                                    } */}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateEnd">Ngày</label>
                                <input  type="date" 
                                        id="start" 
                                        name="dateEnd"
                                        min={today} max={`${now.getFullYear()}-12-31`}>
                                </input>
                            </div>
                        </div>
                    </div>

                    <button className="form-submit" type='submit'>Xác nhận</button>
                </form>
            </div>

            <div className='side-map__list grid'>
                
                <ul className=" side-map__list__row row">
                    {
                        areas.map((item, index) => 
                            <li key={index} className='item col l-6 m-6 c-12'>
                                <Area id={index} name={item.name} type={item.type}/>
                            </li>
                        )
                    }
                </ul>
            </div>

            <ul className='side-map__types'>
                <li className="type">
                    <div className="type__color empty"></div>
                    <div className="type__title">Chỗ trống</div>
                </li>

                <li className="type">
                    <div className="type__color waiting"></div>
                    <div className="type__title">Chờ thanh toán</div>
                </li>

                <li className="type">
                    <div className="type__color signed"></div>
                    <div className="type__title">Chỗ đã đặt</div>
                </li>
            </ul>
            
        </div>
    )
}

export default SideMap