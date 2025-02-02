import Axios from "axios";
import { base_uri_rajaongkir, api_key_rajaongkir } from "./BASE_URL";
import { headersFlexible } from "middlewares";

//penerapan get hilangkan payload langsung header saja

export const getProvince                =   payload   => Axios.get(`${base_uri_rajaongkir}/wilayah/provinsi?api_key=${api_key_rajaongkir}`, {headers: headersFlexible(payload)});
export const getCity                    =   payload   => Axios.get(`${base_uri_rajaongkir}/wilayah/kabupaten?api_key=${api_key_rajaongkir}&id_provinsi=${payload?.id_provinsi}`, {headers: {key: api_key_rajaongkir}});