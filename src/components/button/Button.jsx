import React from "react";
import "./button.scss"

const Button = ({name, onClick}) => {
    return (
        <div>
            <button className="button" type="submit" onClick={onClick}>{name}</button>
        </div>
    )
}

export default Button 