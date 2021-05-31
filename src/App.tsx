import React, {useEffect, useRef, useState} from 'react';
import {Cesium3DTileset, CesiumComponentRef, Clock, Globe, ImageryLayer, Primitive, Scene, Viewer} from "resium";
import {
    Cartesian3,
    ClockRange,
    ClockStep,
    createWorldTerrain,
    HeadingPitchRoll,
    IonImageryProvider,
    IonResource,
    JulianDate,
    Matrix4,
    Viewer as CesiumViewer
} from "cesium";
import {CesiumToolbarButton, ControlPanel, Drone, Neighborhood, PointOfInterest} from "./components";
import {CesiumContainer} from "./elements";
import {ControlProvider} from "./contexts/ControlProvider";

type CameraView = {
    duration?: number
    maximumHeight?: number
    pitchAdjustHeight?: number
    endTransform?: Matrix4
    destination: Cartesian3,
    orientation: any
}

const initialOrientation = HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
const homeCameraView: CameraView = {
    destination: Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431),
    orientation: {
        heading: initialOrientation.heading,
        pitch: initialOrientation.pitch,
        roll: initialOrientation.roll
    },
    // Add some camera flight animation options
    duration: 2.0,
    pitchAdjustHeight: 2000,
    endTransform: Matrix4.IDENTITY
};

const pointCloudCameraView: CameraView = {
    orientation: new HeadingPitchRoll(5.646733805039757, -0.276607153839886, 6.281110875400085),
    destination: new Cartesian3(4401744.644145314, 225051.41078911052, 4595420.374784433),
    duration: 2.0,
    pitchAdjustHeight: 2000,
    endTransform: Matrix4.IDENTITY
}

const worldTerrain = createWorldTerrain({
    requestWaterMask: true, // required for water effects
    requestVertexNormals: true // required for terrain lighting
})

function App() {

    const [tilesetIndexes, setTilesetIndexes] = useState<Array<number>>()
    const viewer = useRef<CesiumComponentRef<CesiumViewer>>(null)

    const flyToHome = () => {
        viewer.current?.cesiumElement?.camera.flyTo(homeCameraView);
    }

    useEffect(() => {
        viewer.current!.cesiumElement!.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
            e.cancel = true;
            flyToHome()
        });
        setTilesetIndexes(tilesetIndexes)
        flyToHome()
    }, [])

    return (
        <CesiumContainer>
            <Viewer ref={viewer}
                    timeline={false}
                    animation={false}
                    scene3DOnly={true}
                    selectionIndicator={true}
                    baseLayerPicker={false}
                    skyBox={false}
                    targetFrameRate={60}
                    terrainProvider={worldTerrain}
            >
                <Globe>
                    <CesiumToolbarButton
                        style={{position: "absolute", top: "5px", right: "120px"}}
                        onClick={() => viewer.current!.cesiumElement!.camera.flyTo(pointCloudCameraView)}>
                        Church
                    </CesiumToolbarButton>
                    <Scene>
                        <Clock shouldAnimate={true}
                               startTime={JulianDate.fromIso8601("2017-07-11T16:00:00Z")}
                               stopTime={JulianDate.fromIso8601("2017-07-11T16:20:00Z")}
                               currentTime={JulianDate.fromIso8601("2017-07-11T16:00:00Z")}
                               multiplier={2}
                               clockStep={ClockStep.SYSTEM_CLOCK_MULTIPLIER}
                               clockRange={ClockRange.LOOP_STOP}
                        />
                        <Primitive>
                            <Cesium3DTileset url={IonResource.fromAssetId(75343)}/>
                            <Cesium3DTileset url={IonResource.fromAssetId(16421)}/>
                        </Primitive>
                    </Scene>
                    <ImageryLayer imageryProvider={new IonImageryProvider({assetId: 3954})}/>
                    <PointOfInterest/>
                    <ControlProvider>
                        <Drone/>
                        <Neighborhood/>
                        <ControlPanel primitiveIndex={1} onFreeMode={flyToHome}/>
                    </ControlProvider>
                </Globe>
            </Viewer>
        </CesiumContainer>
    );
}

export default App;
