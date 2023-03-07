import AxiosRequest from '../request'

export function getCityRequest() {
    return AxiosRequest.get({
        url:'/city/all'
    })

}