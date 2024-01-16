import Axios from "axios";
import { base_uri } from "./BASE_URL";

//AUTH
export const getAuthentification        =   payload   => Axios.post(`${base_uri}APICabang/getAuth.php`, payload);
export const getLogin                   =   payload   => Axios.post(`${base_uri}APICabang/loginMem.php`, payload);
export const getForgetPwdMember         =   payload   => Axios.post(`${base_uri}APICabang/forgetPwdMember.php`, payload);
export const getDashboardMember         =   payload   => Axios.post(`${base_uri}APICabang/homeMember.php`, payload);
export const getTransactionHistory      =   payload   => Axios.post(`${base_uri}APICabang/trxHistory.php`, payload);
export const getNearestOutlet           =   payload   => Axios.post(`${base_uri}APICabang/locationMember.php`, payload);
export const getKaryawanStanby          =   payload   => Axios.post(`${base_uri}APICabang/standby.php`, payload);
export const getOrderInput              =   payload   => Axios.post(`${base_uri}APICabang/orderInput.php`, payload);
export const getOrderCancel             =   payload   => Axios.post(`${base_uri}APICabang/orderCancel.php`, payload);
export const getInbox                   =   payload   => Axios.post(`${base_uri}APICabang/inbox.php`, payload);
