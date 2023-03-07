import {defineStore} from "pinia";
import {getCityRequest} from "@/services";

const useCityStore = defineStore('city', {
    state: () => ({
        citiesData: {},
        currentCity:{ cityName:'北京' }
    }),
    actions: {
        async fetchCitiesData() {
            const res = await getCityRequest()
            this.citiesData = res.data
        }
    }
})

export default useCityStore