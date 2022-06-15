import { Link } from 'react-router-dom'
import './area.scss'
import pmApi from '../../api/pmApi' 
import { useState, useEffect } from 'react'

const Area = ({ id, name, type }) => {
    const [boxList, setBoxList] = useState([])
    const getAllOdo = async () => {
        try {
            const response = await pmApi.getAllOdo(name, {})
            setBoxList(response)
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllOdo()
    }, [])

    return (
        <div className='area'>
            <div className='area__info'>
                <div className="area__info__name">Khu {name}:</div>
                <div className="area__info__type">{type}</div>
            </div>
            <div className='grid'>
                <ul className="area__box-list row">
                    {   
                        Object.keys(boxList).length === 0 ?(
                            <div style={{marginTop: '25px', color: '#C20000'}}>Loading...</div>
                        ) : (
                            boxList.map((box, i) => 
                                <li key={box.id} className="col l-1">
                                    <Link to={'/stranger'}>
                                        <div className='area__box-list__item'>
                                            {box.tenodo}
                                        </div>
                                    </Link>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Area