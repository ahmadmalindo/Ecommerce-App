import { 
    getAuthentification,
    getLogin,
    getForgetPwdMember,
    getDashboardMember,
    getTransactionHistory,
    getReceiptTransaction,
    getNearestOutlet,
    getKaryawanStanby,
    getKaryawanOutlet,
    getOrderInput,
    getOrderCancel,
    getInbox,
    getKarywanArtworksView,
    getLogout,
    getFotoUpload,
    getSimpanEmail,
    getSimpanTanggalLahir,
    getChangePassword
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

    async ReceiptTransaction(params) {
        return params = await getReceiptTransaction(params).then((response) => {
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

    async KaryawanOutlet(params) {
        return params = await getKaryawanOutlet(params).then((response) => {
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

    async Logout(params) {
        return params = await getLogout(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async FotoUpload(params) {
        return params = await getFotoUpload(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async SimpanEmail(params) {
        return params = await getSimpanEmail(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async SimpanTanggalLahir(params) {
        return params = await getSimpanTanggalLahir(params).then((response) => {
            const res = response.data
            return res

        }).catch((error) => {
            // return ToastConnection()
        })
    }

    async ChangePassword(params) {
        return params = await getChangePassword(params).then((response) => {
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
