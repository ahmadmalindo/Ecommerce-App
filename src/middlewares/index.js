import { storage } from "helper/storage"

export function headersFlexible (payload) {
    const token = storage.getString("token")
    
    let config = {
        'Content-Type': 'application/json',
    }

    if (payload instanceof FormData) {
        config["Content-Type"] = 'multipart/form-data'
    }
    
    if (token !== null) {
        config.Authorization = `Basic ${token}`
    }

    console.log(JSON.stringify(config))

    return config
}