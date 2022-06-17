import Area from '../area/Area'
import './side-map.scss'
import pmApi from '../../api/pmApi' 
import { useEffect } from 'react'
import axios from 'axios'

const areas = [
    {
        name: 'KTVA',
        type: 'Từ 5 chỗ trở xuống'
    },

    {
        name: 'KTVB',
        type: 'Từ 7 chỗ trở xuống'
    },
]



const SideMap = () => {

    return (
        <div className="side-map container">
            <h2>Sơ đồ ô đỗ</h2>
            
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