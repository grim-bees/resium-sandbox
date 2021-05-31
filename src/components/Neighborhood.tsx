import React, {useContext, useEffect} from "react";
import {useCesium} from "resium";
import {
    BoundingSphere,
    defined,
    DistanceDisplayCondition,
    Ellipsoid,
    GeoJsonDataSource,
    HorizontalOrigin,
    VerticalOrigin
} from "cesium";
import {ControlContext} from "../contexts";


export const Neighborhood = () => {
    const {viewer} = useCesium();
    const {setNeighborhoods} = useContext(ControlContext)

    useEffect(() => {
        const geoJsonOptions = {
            clampToGround: true
        };
        // Load neighborhood boundaries from a GeoJson file
        // Data from : https://data.cityofnewyork.us/City-Government/Neighborhood-Tabulation-Areas/cpf4-rkhq
        const neighborhoodsPromise = GeoJsonDataSource.load('/SampleData/sampleNeighborhoods.geojson', geoJsonOptions);
        // Save an new entity collection of neighborhood data
        let neighborhoods;
        // @ts-ignore
        neighborhoodsPromise.then((dataSource) => {
            // Add the new data as entities to the viewer
            // @ts-ignore
            viewer.dataSources.add(dataSource);
            neighborhoods = dataSource.entities;
            // Get the array of entities
            dataSource.entities.values.filter(entity => defined(entity.polygon)).forEach(entity => {
                // Use kml neighborhood value as entity name
                // @ts-ignore
                entity.name = entity.properties.neighborhood;
                // Set the polygon material to a random, translucent color
                // @ts-ignore
                entity.polygon.material = Cesium.Color.fromRandom({
                    red: 0.1,
                    maximumGreen: 0.5,
                    minimumBlue: 0.5,
                    alpha: 0.6
                });
                // Tells the polygon to color the terrain. ClassificationType.CESIUM_3D_TILE will color the 3D tileset, and ClassificationType.BOTH will color both the 3d tiles and terrain (BOTH is the default)
                // @ts-ignore
                entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
                // Generate Polygon center
                // @ts-ignore
                const polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                let polyCenter = BoundingSphere.fromPoints(polyPositions).center;
                polyCenter = Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                // @ts-ignore
                entity.position = polyCenter;
                // Generate labels
                entity.label = {
                    // @ts-ignore
                    text: entity.name,
                    // @ts-ignore
                    showBackground: true,
                    // @ts-ignore
                    scale: 0.6,
                    // @ts-ignore
                    horizontalOrigin: HorizontalOrigin.CENTER,
                    // @ts-ignore
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    // @ts-ignore
                    distanceDisplayCondition: new DistanceDisplayCondition(10.0, 8000.0),
                    // @ts-ignore
                    disableDepthTestDistance: 100.0
                };
            })
            setNeighborhoods(neighborhoods)
        })
        // eslint-disable-next-line
    }, [])
    return (
        <React.Fragment/>
    )
}
