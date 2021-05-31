import React, {ReactNode} from "react";
import {BackdropWrapper} from "../elements";

type BackdropProp = {
    children?: ReactNode
}

export const Backdrop = ({children}: BackdropProp) => {
    return (
        <BackdropWrapper>
            {children}
        </BackdropWrapper>
    )
}
