import axios from 'axios';
import MMKVStorage from 'react-native-mmkv-storage';

export default async () => {

    const storage = new MMKVStorage.Loader().initialize();

    axios.interceptors.request.use(
        async config => {
            const token = storage.getString("token");
            console.log('token', token);
            if (token !== null) {
                config.headers['Authorization'] = `Bearer ${token}`;
                config.headers['Content-Type']  = 'application/json';
            } else {
                config.headers['Content-Type']  = 'application/json';
            }

            return config;
        },
        err => Promise.reject(err),
    );
};
