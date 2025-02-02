import { 
    getProvince,
    getCity,
} from "../constants/apiRajaOngkir";

class ApiRajaOngkir  {
    async Province(params) {
        return params = await getProvince(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return error.response.data
            // return ToastConnection()
        })
    }

    async City(params) {
        return params = await getCity(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return error.response.data
            // return ToastConnection()
        })
    }
}

const apiRajaOngkir = new ApiRajaOngkir()

Object.freeze(apiRajaOngkir)

export default apiRajaOngkir
