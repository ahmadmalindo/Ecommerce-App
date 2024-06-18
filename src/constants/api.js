import Axios from "axios";
import { base_uri } from "./BASE_URL";
import { headersFlexible } from "middlewares";

//penerapan get hilangkan payload langsung header saja

export const getLogin                   =   payload   => Axios.post(`${base_uri}/login`, payload, {headers: headersFlexible(payload)});
export const getLogOut                  =   payload   => Axios.post(`${base_uri}/logout`, payload, {headers: headersFlexible(payload)});