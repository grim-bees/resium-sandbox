import {createContext} from "react";
import {Entity, EntityCollection} from "cesium";

export type Context = {
    neighborhoods: EntityCollection | undefined,
    setNeighborhoods: Function
    drone?: Entity | undefined
    setDrone: Function
};

export const ControlContext = createContext<Context>({
    neighborhoods: undefined,
    setNeighborhoods: () => {},
    drone: undefined,
    setDrone: () => {}
});
