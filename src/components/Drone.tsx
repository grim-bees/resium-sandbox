import React, {useContext, useEffect} from "react";
import {Cartesian3, Color, CzmlDataSource, HermitePolynomialApproximation, VelocityOrientationProperty} from "cesium";
import {useCesium} from "resium";
import {ControlContext} from "../contexts";

export const Drone = () => {
    const viewer = useCesium()
    const {setDrone} = useContext(ControlContext)
    useEffect(() => {
        const dronePromise = CzmlDataSource.load('/SampleData/sampleFlight.czml');
        dronePromise.then((dataSource) => {
            viewer?.viewer?.dataSources.add(dataSource);
            // Get the entity using the id defined in the CZML data
            const drone = dataSource.entities.getById('Aircraft/Aircraft1')!;
            // Attach a 3D model
            drone.model = {
                // @ts-ignore
                uri: '/SampleData/Models/CesiumDrone.gltf',
                // @ts-ignore
                minimumPixelSize: 128,
                // @ts-ignore
                maximumScale: 1000,
                // @ts-ignore
                silhouetteColor: Color.WHITE,
                // @ts-ignore
                silhouetteSize: 2
            };
            // Add computed orientation based on sampled positions
            drone.orientation = new VelocityOrientationProperty(drone?.position);

            // Smooth path interpolation
            // @ts-ignore
            drone?.position?.setInterpolationOptions({
                interpolationAlgorithm: HermitePolynomialApproximation,
                interpolationDegree: 2
            });
            // @ts-ignore
            drone.viewFrom = new Cartesian3(-30, 0, 0);
            setDrone(drone)
        })
    // eslint-disable-next-line
    }, [])
    return (
        <React.Fragment/>
    )
}
