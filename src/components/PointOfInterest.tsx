import React, {useEffect} from "react";
import {useCesium} from "resium";
import {Cartographic, defined, DistanceDisplayCondition, JulianDate, KmlDataSource, Math, VerticalOrigin} from "cesium";

export const PointOfInterest = () => {
    const viewer = useCesium()
    useEffect(() => {
        const kmlOptions = {
            camera: viewer?.viewer?.scene.camera,
            canvas: viewer?.viewer?.scene.canvas,
            clampToGround: true
        };
        // Load geocache points of interest from a KML file
        // Data from : http://catalog.opendata.city/dataset/pediacities-nyc-neighborhoods/resource/91778048-3c58-449c-a3f9-365ed203e914
        // @ts-ignore
        const geocachePromise = KmlDataSource.load('/SampleData/sampleGeocacheLocations.kml', kmlOptions);

        // Add geocache billboard entities to scene and style them
        geocachePromise.then(dataSource => {
            // Add the new data as entities to the viewer
            viewer.viewer?.dataSources.add(dataSource);

            // Get the array of entities
            dataSource.entities.values.filter(entity => defined(entity.billboard)).forEach(entity => {
                // Adjust the vertical origin so pins sit on terrain
                // @ts-ignore
                entity.billboard.verticalOrigin = VerticalOrigin.BOTTOM;
                // Disable the labels to reduce clutter
                entity.label = undefined;
                // Add distance display condition
                // @ts-ignore
                entity.billboard.distanceDisplayCondition = new DistanceDisplayCondition(10.0, 20000.0);
                // Compute latitude and longitude in degrees
                const cartographicPosition = Cartographic.fromCartesian(entity!.position!.getValue(JulianDate.now()));
                const latitude = Math.toDegrees(cartographicPosition.latitude);
                const longitude = Math.toDegrees(cartographicPosition.longitude);
                // Modify description
                // @ts-ignore
                entity.description = `<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>
                    <tr><th>Longitude</th><td>${longitude.toFixed(5)}</td></tr>
                    <tr><th>Latitude</th><td>${latitude.toFixed(5)}</td></tr>
                    </tbody></table>`;
            });
        });
        // eslint-disable-next-line
    }, [])
    return <React.Fragment/>
}
