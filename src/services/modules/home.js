import AxiosRequest from '../request'

export function getHomeHotSuggests() {
    return AxiosRequest.get({
        url: "/home/hotSuggests"
    })
}

export function getHomeCategories() {
    return AxiosRequest.get({
        url: '/home/categories'
    })
}

export function getHomeHouseList(currentPage) {
    return AxiosRequest.get({
        url: '/home/houselist',
        params: {
            page: currentPage
        }
    })
}