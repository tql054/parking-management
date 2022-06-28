import React from "react";
import './pop-up.scss'

const PopUp = ({handleOK, handleCancel}) => {
    return (
        <div className="area-info">
            <div className="area-info__title"></div>
            <div className="area-info__controller">
                
                <Button name={'Đóng'} />
            </div>
        </div>
    )
}

export default PopUp