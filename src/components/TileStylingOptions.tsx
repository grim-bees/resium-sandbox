import React from 'react';
import {useCesium} from "resium";
import {Cesium3DTileStyle} from "cesium";
import {ControlWrapper} from "../elements";

export const DefaultStyle = new Cesium3DTileStyle({
    color: "color('white')",
    show: true
});

export const TransparentStyle = new Cesium3DTileStyle({
    color: "color('white', 0.3)",
    show: true
})

export const HeightStyle = new Cesium3DTileStyle({
    color: {
        conditions: [
            // eslint-disable-next-line
            ["${Height} >= 300", "rgba(45, 0, 75, 0.5)"],
            // eslint-disable-next-line
            ["${Height} >= 200", "rgb(102, 71, 151)"],
            // eslint-disable-next-line
            ["${Height} >= 100", "rgb(170, 162, 204)"],
            // eslint-disable-next-line
            ["${Height} >= 50", "rgb(224, 226, 238)"],
            // eslint-disable-next-line
            ["${Height} >= 25", "rgb(252, 230, 200)"],
            // eslint-disable-next-line
            ["${Height} >= 10", "rgb(248, 176, 87)"],
            // eslint-disable-next-line
            ["${Height} >= 5", "rgb(198, 106, 11)"],
            ["true", "rgb(127, 59, 8)"]
        ]
    }
})

export const NoneOption = "none"
export const HeightOption = "height"
export const TransparentOption = "transparent"

type TileStylingControlProp = {
    primitiveIndex: number
}

export const TileStylingOptions = ({primitiveIndex}: TileStylingControlProp) => {

    const {viewer} = useCesium()

    const setTileStyle = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let style = DefaultStyle;
        switch (event.target.value) {
            case 'height':
                style = HeightStyle; break
            case 'transparent':
                style = TransparentStyle; break
        }
        viewer!.scene.primitives.get(primitiveIndex).style = style
    }

    return (
        <ControlWrapper>
            <span><strong>3d Tile Styling</strong></span>
            <div>
                <select data-testid="tileStyle" id="tileStyle" onChange={setTileStyle}>
                    <option value={NoneOption}>None</option>
                    <option value={HeightOption}>Height</option>
                    <option value={TransparentOption}>Transparent</option>
                </select>
            </div>
        </ControlWrapper>
    )
}
