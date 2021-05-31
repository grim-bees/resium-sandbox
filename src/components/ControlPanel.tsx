import React from "react";
import {Backdrop} from "./Backdrop";
import {TileStylingOptions} from "./TileStylingOptions";
import {DisplayOptions} from "./DisplayOptions";
import {CameraOptions} from "./CameraOptions";

type ControlPanelProp = {
    primitiveIndex: number,
    onFreeMode?: Function
}

export const ControlPanel = ({primitiveIndex, onFreeMode}: ControlPanelProp) => {
    return (
        <Backdrop>
            <TileStylingOptions primitiveIndex={primitiveIndex}/>
            <DisplayOptions />
            <CameraOptions onFreeMode={onFreeMode} />
        </Backdrop>
    )
}
