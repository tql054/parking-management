import React from "react";
import "./button.scss"

const Button = ({name, onClick, unable}) => {
    return (
        <>
            {unable ? (
                <div>
                    <button className="button unactive">{name}</button>
                </div>
            ):(
                <div>
                    <button className="button" type="submit" onClick={onClick}>{name}</button>
                </div>
            )}
            
        </>
    )
}

export default Button 