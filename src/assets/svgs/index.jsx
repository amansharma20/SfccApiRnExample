import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

export function GoBack(props) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <G data-name="Layer 2">
                <Path
                    d="M19 11H7.14l3.63-4.36a1 1 0 10-1.54-1.28l-5 6a1.19 1.19 0 00-.09.15c0 .05 0 .08-.07.13A1 1 0 004 12a1 1 0 00.07.36c0 .05 0 .08.07.13a1.19 1.19 0 00.09.15l5 6A1 1 0 0010 19a1 1 0 00.64-.23 1 1 0 00.13-1.41L7.14 13H19a1 1 0 000-2z"
                    data-name="arrow-back"
                />
            </G>
        </Svg>
    )
}

