import {useState} from "react";
import {ControlContext} from "./ControlContext";

type ControlProviderProp = {
    children: any
}

export const ControlProvider = ({children}: ControlProviderProp) => {
    const setDrone = (drone: any) => {
        setControlContext(prevState => {
            return {
                ...prevState,
                drone
            }
        })
    }

    const setNeighborhoods = (neighborhoods: any) => {
        setControlContext(prevState => {
            return {
                ...prevState,
                neighborhoods
            }
        })
    }

    const controlState = {
        neighborhoods: undefined,
        setNeighborhoods,
        drone: undefined,
        setDrone
    }

    const [controlContext, setControlContext] = useState(controlState)
    return (
        <ControlContext.Provider value={controlContext}>
            {children}
        </ControlContext.Provider>
    )
}
