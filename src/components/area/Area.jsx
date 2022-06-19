import { Link } from 'react-router-dom'
import './area.scss'
import pmApi from '../../api/pmApi' 
import { useState, useEffect } from 'react'
import Modal from '../modal/Modal'
import AreaInfo from '../area-info/AreaInfo'

const Area = ({ id, name, type, filter, dateBegin, dateEnd, tab }) => {
    const [boxList, setBoxList] = useState([])
    const [idRegister, setIdRegister] = useState()
    const getAllOdo = async () => {
        try {
            const response = await pmApi.getAllOdo(name, {})
            const registedRes = await pmApi.getRegistedOdo(name, {dateBegin, dateEnd})
            // console.log(registedRes)
            response.forEach(element => {
                element.trangthai = 'empty'
                element.iddk = null
                for(let odo of registedRes) {
                    if(odo.tenodo===element.tenodo) {
                        element.iddk = odo.id
                        if(odo.ttthanhtoan === 'Chưa thanh toán') element.trangthai = 'waiting'
                        else {
                            let now = new Date()
                            let dateEnd = new Date(odo.thoigianketthuc)
                            let dateOut = new Date(odo.thoigiankethucthuc)
                            

                            if(dateEnd - now < 0 && odo.thoigiankethucthuc===null){
                                element.trangthai = 'outdate'
                            }else{
                                element.trangthai = 'filled'
                            }
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
                let checkStatus = false
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
        
    }, [dateBegin, dateEnd, tab, name])

    const handleCloseInfo = () => {
        setIdRegister(null)
    }
    console.log(boxList)
    return (
        <>
            {idRegister ? (
            <Modal>
                <AreaInfo  onClose={handleCloseInfo} idRegister={idRegister}/>
            </Modal>):(<></>)}

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
                                        {/* <Link to={'/stranger'}> */}
                                        <div>
                                            <div 
                                                onClick={() => { setIdRegister(box.iddk)} }
                                                className={`area__box-list__item ${box.trangthai}`}>
                                                {box.tenodo.slice(3)}
                                            </div>
                                        </div>
                                    </li>
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