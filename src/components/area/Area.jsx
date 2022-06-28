import { Link } from 'react-router-dom'
import './area.scss'
import pmApi from '../../api/pmApi' 
import { useState, useEffect } from 'react'
import Modal from '../modal/Modal'
import AreaInfo from '../area-info/AreaInfo'
import { createContext } from 'react'
import { useStore } from '../../store/hooks'
import Context from '../../store/Context'
export const AreaContext = createContext()
const Area = ({ id, name, type, filter, dateBegin, dateEnd, tab, refresh}) => {

    const [state, dispatch] = useStore(Context)
    const {accessToken, right} = state

    const [boxList, setBoxList] = useState([])
    const [idRegister, setIdRegister] = useState()
    const [checkoutRegister, setCheckoutRegister] = useState(false)
    const getAllOdo = async () => {
        try {
            const response = await pmApi.getAllOdo(name, {})
            const registedRes = await pmApi.getRegistedOdo(name, {dateBegin, dateEnd})
            response.forEach(element => {
                element.trangthai = 'empty'
                element.iddk = null
                for(let odo of registedRes) {
                    if(odo.tenodo===element.tenodo) {
                        element.iddk = odo.id
                        if(odo.ttthanhtoan === 'Chưa thanh toán') element.trangthai = 'waiting'
                        else {
                            
                                element.trangthai = 'filled'
                        }
                    }
                }
            });
            setBoxList(response)
        } catch(err) {
            console.log(err)
        }
    }

    const getAllOdoVL = async () => {
        try {
             const response = await pmApi.getAllOdo(name, {})
            const registedRes = await pmApi.getUnRegistedOdo(name, {dateBegin, dateEnd})
            response.forEach(element => {
                element.trangthai = 'empty'
                element.iddk = null
                for(let odo of registedRes) {
                    if(odo.tenodo===element.tenodo) {
                        element.iddk = odo.id
                        element.trangthai = 'filled'
                    }
                }
            });
            setBoxList(response)
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        setBoxList([])
        
        switch(tab) {
            case 'KTV': {
                getAllOdo()
                break
            }

            case 'KVL': {
                getAllOdoVL()
                break
            }
        }
        
    }, [refresh, tab, name, checkoutRegister, filter])

    const handleCloseInfo = () => {
        setIdRegister(null)
    }

    const handleCheckout = () => {
        setCheckoutRegister(prevState => !prevState)
    }

    
    return (
        <>
            {idRegister ? (
                <AreaContext.Provider value={{handleCloseInfo, handleCheckout}}>
                    <Modal>
                        <AreaInfo idRegister={idRegister} loaiDk={tab}/>
                    </Modal>
                </AreaContext.Provider>
            ):(<></>)}

            <div className='area'>
                <div className='area__info'>
                    <div className="area__info__name">Khu {name}:</div>
                    <div className="area__info__type">Dành cho {type}</div>
                </div>
                <div className='grid'>
                    <ul className="area__box-list row">
                        {   
                            Object.keys(boxList).length === 0 ?(
                                <div style={{marginTop: '25px', color: '#C20000'}}>Loading...</div>
                            ) : (
                                accessToken ? (
                                    boxList.map((box, i) => 
                                        <li key={box.id} className="col l-1">
                                            {
                                                box.iddk?(
                                                    right <= 2 ? (
                                                        <div 
                                                            onClick={() => {setIdRegister(box.iddk)} }
                                                            className={`area__box-list__item ${box.trangthai}`}>
                                                            {box.tenodo.slice(3)}
                                                        </div>
                                                    ) : (
                                                        <div 
                                                            className={`area__box-list__item ${box.trangthai}`}>
                                                            {box.tenodo.slice(3)}
                                                        </div>
                                                    )
                                                ):(
                                                    
                                                    right !=2 && tab==='KVL' ? (
                                                        <div className={`area__box-list__item ${box.trangthai}`}>
                                                            {box.tenodo.slice(3)}
                                                        </div>
                                                    ) : (
                                                        <Link to={`/dangky-${tab}/${box.tenodo}/${dateBegin}/${dateEnd}/${type.slice(3,4)}`} target="_blank">
                                                            <div className={`area__box-list__item ${box.trangthai}`}>
                                                                {box.tenodo.slice(3)}
                                                            </div>
                                                        </Link>

                                                    )
                                                
                                                )
                                            }
                                            <div>
                                                
                                            </div>
                                        </li>
                                    )

                                ): (
                                    boxList.map((box, i) => 
                                        <li key={box.id} className="col l-1">
                                            <div 
                                                className={`area__box-list__item ${box.trangthai}`}>
                                                {box.tenodo.slice(3)}
                                            </div>
                                        </li>
                                    )
                                )
                            )
                        }
                    </ul>
                </div>
            </div>

        </>
    )
}

export default Area
// export { AreaContext }