import Axios from "axios";
import { base_uri } from "./BASE_URL";
import { headersFlexible } from "middlewares";

//penerapan get hilangkan payload langsung header saja

export const getLogin                   =   payload   => Axios.post(`${base_uri}/login.php`, payload, {headers: headersFlexible(payload)});
export const getSiginUp                 =   payload   => Axios.post(`${base_uri}/signUp.php`, payload, {headers: headersFlexible(payload)});
export const getBank                    =   payload   => Axios.get(`${base_uri}/bank`, {headers: headersFormData(payload)});