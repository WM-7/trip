import {defineStore} from "pinia";
import {getHomeCategories, getHomeHotSuggests, getHomeHouseList} from "@/services";

const useHomeStore = defineStore('home', {
    state: () => ({
        hotSuggests: [],
        categories: [],

        currentPage:1,
        houseList:[]

    }),
    actions: {
        async fetchHomeHotSuggests() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchHomeCategories() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHomeHouseList() {
            const res = await getHomeHouseList(this.currentPage)
            this.houseList.push(...res.data)
            this.currentPage++
        }

    }
})

export default useHomeStore