import { 
    getLogin,
    getSiginUp,
    getBank
} from "../constants/apiKaveMember";
// import { ToastConnection } from "../constants";

class KaveMember {
    async Login(params) {
        return params = await getLogin(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async SiginUp(params) {
        return params = await getSiginUp(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async Bank(params) {
        return params = await getBank(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }
}

const kaveMember = new KaveMember()

Object.freeze(kaveMember)

export default kaveMember
