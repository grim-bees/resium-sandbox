import React from "react";

export const CesiumToolbarButton:
    React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button className="cesium-button cesium-toolbar-button" {...props}>{children}</button>
    )
}
