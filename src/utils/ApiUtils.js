import { 
    getLogin,
    getLogOut,
} from "../constants/api";

class ApiUtils  {
    async Login(params) {
        return params = await getLogin(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return error.response.data
            // return ToastConnection()
        })
    }

    async LogOut(params) {
        return params = await getLogOut(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            return error.response.data
            // return ToastConnection()
        })
    }
}

const apiUtils = new ApiUtils()

Object.freeze(apiUtils)

export default apiUtils
