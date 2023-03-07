import axios from 'axios'

import { BASE_URL, TIMEOUT } from './config'
import useMainStore from "@/stores/modules/main";

const mainStore = useMainStore()

class AxiosRequest {
    constructor(baseURL, timeout=10000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })

        // 拦截器实现isloading
        this.instance.interceptors.request.use(config => {
            mainStore.isLoading = true
            return config
        }, err => {
            return err
        })
        this.instance.interceptors.response.use(res => {
            mainStore.isLoading = false
            return res
        }, err => {
            mainStore.isLoading = false
            return err
        })

    }




    request(config) {
        // mainStore.isLoading = true
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                // mainStore.isLoading = false
                resolve(res.data)
            }).catch(err => {
                // mainStore.isLoading = false
                reject(err)
            })
        })
    }

    get(config) {
        return this.request({ ...config, method: "get" })
    }

    post(config) {
        return this.request({ ...config, method: "post" })
    }
}

export default new AxiosRequest(BASE_URL, TIMEOUT)


