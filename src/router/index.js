import {createRouter, createWebHashHistory} from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),

    //配置映射关系
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('@/views/home/Home.vue')
        },
        {
            path: '/favor',
            component: () => import('@/views/favor/Favor.vue')
        },
        {
            path: '/order',
            component: () => import('@/views/order/Order.vue')
        },
        {
            path: '/message',
            component: () => import('@/views/message/Message.vue'),
            meta: {
                hideTabBar: true
            }
        },
        {
            path: '/city',
            component: () => import('@/views/city/City.vue'),
            meta: {
                hideTabBar: true
            }
        },
        {
            path: '/search',
            component: () => import('@/views/search/Search.vue'),
        },
        {
            path: '/detail/:id',
            component: () => import('@/views/detail/Detail.vue')
        }
    ]
})

export default router