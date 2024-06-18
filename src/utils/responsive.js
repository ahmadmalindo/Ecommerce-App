import { Platform } from "react-native"
import normalize from "react-native-normalize"

export const responsive  = (number) => {
    number = Platform.OS == 'android' ? number + 2 : number
    return normalize(number, 'width')
}

