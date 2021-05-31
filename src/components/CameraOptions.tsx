import React, {useContext} from "react";
import {ControlWrapper} from "../elements";
import {useCesium} from "resium";
import {ControlContext} from "../contexts";

export type CameraOptionsProp = {
    onFreeMode?: Function
}

export const CameraOptions = ({onFreeMode}: CameraOptionsProp) => {
    const {viewer: viewer1} = useCesium()
    const {drone} = useContext(ControlContext)

    const toggleMode =(event: React.ChangeEvent<HTMLInputElement>) => {
        const mode = event.target.value
        if (mode === "drone") {
            viewer1!.trackedEntity = drone;
        } else {
            viewer1!.trackedEntity = undefined;
            if (onFreeMode) {
                onFreeMode()
            }
        }
    }
    return (
        <ControlWrapper>
            <span><strong>Camera Mode</strong></span>
            <div className="nowrap">
                <input id="freeMode" name="source" type="radio" value="free" defaultChecked={true} onChange={toggleMode}/>
                <label htmlFor="freeMode">Free</label>
            </div>
            <div className="nowrap">
                <input id="droneMode" name="source" type="radio" value="drone" onChange={toggleMode}/>
                <label htmlFor="droneMode">Drone View</label>
            </div>
        </ControlWrapper>
    )
}
