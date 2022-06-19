import Area from '../area/Area'
import './side-map.scss'
import { useRef, useState } from 'react'
import Button from '../button/Button'
import pmApi from '../../api/pmApi'
import { useEffect } from 'react'


const SideMap = () => {
    const now = new Date()
    const today = `${now.getFullYear()}-${(now.getMonth()+1).toString.length === 1?'0'+(now.getMonth()+1): now.getMonth()+1}-${now.getDate()}`

    const [dateLimit, setDateLimit] = useState({
        dateBegin: `${today}`,
        dateEnd: `${today}`,
        hourBegin: `${now.getHours()}:00`,
        hourEnd: `${now.getHours()+1}:00`
    })

    const [isFilter, setFilter] = useState(false)
    const tabs = [
        {
            key: 'KTV',
            display: 'Khu thành viên'
        },

        {
            key: 'KVL',
            display: 'Khu vãng lai'
        },
    ]
    const [tabSM, setTabSM] = useState(tabs[0])
    const [khudo, setKhudo] = useState([])
    const dateRefBegin = useRef()
    const dateRefEnd = useRef()

    const hoursRefBegin = useRef()
    const upRefBegin = useRef()
    const downRefBegin = useRef()
    
    const hoursRefEnd = useRef()
    const upRefEnd = useRef()
    const downRefEnd = useRef()

    const getKhudo = async () => {
        try {
            const response  = await pmApi.getKhudo(tabSM.key)
            setKhudo(response)
        } catch(e) {
            console.log(e)
        }
    }
    
    const handleFilting = (e) => {
        e.preventDefault()
        let dateBegin = dateRefBegin.current.value
        let dateEnd = dateRefEnd.current.value
        let stampBegin = new Date(dateBegin)
        let stampEnd = new Date(dateEnd)
        if(dateBegin && dateEnd && stampEnd-stampBegin>0) {
            setDateLimit({
                dateBegin: `${dateBegin}`,
                dateEnd: `${dateEnd}`,
                hourBegin: `${hoursRefBegin.current.value}`,
                hourEnd: `${hoursRefEnd.current.value}`,

            })
        } else {
            alert("Ngày không hợp lệ")
        }
    }

    const handleUp = (e) => {
        let value = +hoursRefBegin.current.value.slice(0 ,hoursRefBegin.current.value.length-3)
        if(value < 23) { 
            hoursRefBegin.current.value = `${++value}:00`
            downRefBegin.current.classList.remove('min-size')
        } else {
            e.target.classList.add('max-size')
        } 
    }

    const handleDown = (e) => {
        let value = +hoursRefBegin.current.value.slice(0 ,hoursRefBegin.current.value.length-3)
        if(value > 0) { 
            hoursRefBegin.current.value = `${--value}:00`
            upRefBegin.current.classList.remove('max-size')
        } else {
            e.target.classList.add('min-size')
        } 
    }

    const handleUpEnd = (e) => {
        let value = +hoursRefEnd.current.value.slice(0 ,hoursRefEnd.current.value.length-3)
        if(value < 23) { 
            hoursRefEnd.current.value = `${++value}:00`
            downRefEnd.current.classList.remove('min-size')
        } else {
            e.target.classList.add('max-size')
        } 
    }

    const handleDownEnd = (e) => {
        let value = +hoursRefEnd.current.value.slice(0 ,hoursRefEnd.current.value.length-3)
        if(value > 0) { 
            hoursRefEnd.current.value = `${--value}:00`
            upRefEnd.current.classList.remove('max-size')
        } else {
            e.target.classList.add('min-size')
        } 
    }

    useEffect(() => {
        getKhudo()
    }, [tabSM])
    return (
        <div className="side-map container">
            <div className="side-map__tabs">
                {   
                    tabs.map((tab, i)=> (
                        <div 
                            key={i} 
                            className="tab"
                            style={tabSM.key === tab.key ? {backgroundColor: "#3266a7", color: "#fff", borderBottom: "solid 2.5px #c20000"} : {}}
                            onClick={(e) => {setTabSM(tab)}}
                            >
                            {tab.display}
                        </div>
                    ))
                }
            </div>

            <h2>Sơ đồ ô đỗ</h2>
            <div className="side-map__check">
                <input type="checkbox" onChange={()=>setFilter(prev=>{return !prev})} /> 
                <h5 className="side-map__check__title">
                    Chọn mốc thời gian:
                </h5>
            </div>
            {isFilter?
            (<div className="side-map__filter">
                <form   action="GET" 
                        className=""
                        onSubmit={handleFilting}
                >
                    <div className='side-map__filter__form'>
                        <div className="date date-from">
                            <div className="form-group">
                                <label htmlFor="timeBegin">Giờ</label>
                                <div className="box">
                                    <input 
                                        ref={hoursRefBegin} 
                                        className='time' 
                                        disabled type="text" 
                                        name='timeBegin' 
                                        value={`${dateLimit.hourBegin}`}
                                    />
                                    <div className="controller">
                                        <i ref={upRefBegin} onClick={handleUp} className="fa-solid fa-caret-up"></i>
                                        <i ref={downRefBegin} onClick={handleDown}  className="fa-solid fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateBegin">Ngày</label>
                                <input  
                                        ref={dateRefBegin}
                                        type="date" 
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
                                <div className="box">
                                    <input 
                                        ref={hoursRefEnd} 
                                        className='time' 
                                        disabled type="text" 
                                        name='timeEnd' 
                                        value={`${dateLimit.hourEnd}`}/>
                                    <div className="controller">
                                        <i ref={upRefEnd} onClick={handleUpEnd} className="fa-solid fa-caret-up"></i>
                                        <i ref={downRefEnd} onClick={handleDownEnd}  className="fa-solid fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateEnd">Ngày</label>
                                <input  
                                        ref={dateRefEnd}
                                        type="date" 
                                        id="start" 
                                        name="dateEnd"
                                        min={today} max={`${now.getFullYear()}-12-31`}>
                                </input>
                            </div>
                        </div>
                    </div>
                    <Button name={'Xác nhận'}/>
                </form>
            </div>):(
                <></>
            )}
            <div className='side-map__list grid'>
                
                <ul className=" side-map__list__row row">
                    {
                        khudo.map((item, index) => 
                            <li key={index} className='item col l-6 m-6 c-12'>
                                {item.makhudo}
                                <Area 
                                    id={index} 
                                    name={item.makhudo} 
                                    type={item.loaixe} 
                                    filter={isFilter} 
                                    dateBegin={`${dateLimit.dateBegin} ${dateLimit.hourBegin}`} 
                                    dateEnd={`${dateLimit.dateEnd} ${dateLimit.hourEnd}`}
                                    tab={tabSM.key}
                                />
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