import { Link } from 'react-router-dom'
import './area.scss'


const Area = ({ id, name, type }) => {
    const boxList = [
        {
            id: 1,
            name: '01'
        },
    
        {
            id: 2,
            name: '02'
        },
    
        {
            id: 3,
            name: '03'
        },
    
        {
            id: 4,
            name: '04'
        },
    
        {
            id: 5,
            name: '05'
        },
    
        {
            id: 6,
            name: '06'
        },
    
        {
            id: 7,
            name: '07'
        },
    
        {
            id: 8,
            name: '08'
        },
    
        {
            id: 9,
            name: '09'
        },
    
        {
            id: 10,
            name: '10'
        },
    
        {
            id: 11,
            name: '11'
        },
    
        {
            id: 12,
            name: '12'
        },
    
        {
            id: 13,
            name: '13'
        },
    
        {
            id: 14,
            name: '14'
        }
    ]

    return (
        <div className='area'>
            <div className='area__info'>
                <div className="area__info__name">Khu {name}:</div>
                <div className="area__info__type">{type}</div>
            </div>
            <div className='grid'>
                <ul className="area__box-list row">
                    {
                        boxList.map((box, i) => 
                            <li key={box.id} className="col l-1">
                                <Link to={'/stranger'}>
                                    <div className='area__box-list__item'>
                                        {box.name}
                                    </div>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Area