import React, {useContext} from "react";
import {ControlWrapper} from "../elements";
import {useCesium} from "resium";
import {ControlContext} from "../contexts";

export const DisplayOptions = () => {

    const viewer = useCesium()
    const {neighborhoods} = useContext(ControlContext)

    const toggleShadow = (event: React.ChangeEvent<HTMLInputElement>) => {
        viewer!.viewer!.shadows = event.target.checked;
    }

    const toggleNeighborhoods = (event: React.ChangeEvent<HTMLInputElement>) => {
        neighborhoods!.show = event.target.checked
    }

    return (
        <ControlWrapper>
            <span><strong>Display Options</strong></span>
            <div className="nowrap">
                <input id="shadows" type="checkbox" onChange={toggleShadow}/>
                <label htmlFor="shadows">Shadows</label>
            </div>
            <div className="nowrap">
                <input id="neighborhoods" type="checkbox" onChange={toggleNeighborhoods} defaultChecked={true}/>
                <label htmlFor="neighborhoods">Neighborhoods</label>
            </div>
        </ControlWrapper>
    )
}
