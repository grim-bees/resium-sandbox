import React from "react";
import {useCesium} from "resium";
import {IonResource, Cesium3DTileset} from "cesium";

export const PointCloud = () => {
    const viewer = useCesium()
    const tileset = new Cesium3DTileset({
        url: IonResource.fromAssetId(16421),
    });
    viewer.viewer?.scene.primitives.add(tileset)
    return (
        <React.Fragment/>
    )
}
