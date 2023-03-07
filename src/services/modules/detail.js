import AxiosRequest from '../request'

export function getDetailInfos(houseId){
    return AxiosRequest.get({
        url:"/detail/infos",
        params:{
            houseId
        }
    })
}