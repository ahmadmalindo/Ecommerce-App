import { 
    getAuthentification,
    getLogin,
    getForgetPwdMember,
    getDashboardMember,
    getTransactionHistory,
    getNearestOutlet,
    getKaryawanStanby,
    getOrderInput,
    getOrderCancel,
    getInbox,
    getKarywanArtworksView
} from "../constants/apiMySalon";
// import { ToastConnection } from "../constants";

class MySalon {
    async Authentification(params) {
        return params = await getAuthentification(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async Login(params) {
        return params = await getLogin(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async ForgetPwdMember(params) {
        return params = await getForgetPwdMember(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async DashboardMember(params) {
        return params = await getDashboardMember(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async TransactionHistory(params) {
        return params = await getTransactionHistory(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async NearestOutlet(params) {
        return params = await getNearestOutlet(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async KaryawanStanby(params) {
        return params = await getKaryawanStanby(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async OrderInput(params) {
        return params = await getOrderInput(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async OrderCancel(params) {
        return params = await getOrderCancel(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async Inbox(params) {
        return params = await getInbox(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async KarywanArtworksView(params) {
        return params = await getKarywanArtworksView(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }
}

const mySalon = new MySalon()

Object.freeze(mySalon)

export default mySalon
