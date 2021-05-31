import {fireEvent, render, screen} from "@testing-library/react";
import {
    DefaultStyle,
    HeightOption,
    HeightStyle,
    NoneOption,
    TileStylingOptions,
    TransparentOption,
    TransparentStyle
} from "./TileStylingOptions";
import {CesiumContext} from "resium";

describe("<TileStylingOptions>", () => {

    test("has widget title", () => {
        render(<TileStylingOptions primitiveIndex={1}/>)
        expect(screen.getByText("3d Tile Styling")).toBeInTheDocument()
    })

    test("change style value", () => {
        const primitive = {
            style: undefined
        }
        const viewer = {
            scene: {
                primitives: {
                    get: (number: number) => {
                        return primitive
                    }
                }
            }
        }
        const {getByTestId} = render(
            <CesiumContext.Provider value={{viewer}}>
                <TileStylingOptions primitiveIndex={1}/>
            </CesiumContext.Provider>
        )
        fireEvent.change(getByTestId("tileStyle"), {target: {value: NoneOption}})
        expect(primitive.style).toBe(DefaultStyle)
        fireEvent.change(getByTestId("tileStyle"), {target: {value: HeightOption}})
        expect(primitive.style).toBe(HeightStyle)
        fireEvent.change(getByTestId("tileStyle"), {target: {value: TransparentOption}})
        expect(primitive.style).toBe(TransparentStyle)
    })
})
