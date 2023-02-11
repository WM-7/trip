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
            component: () => import('@/views/message/Message.vue')
        }
    ]
})

export default router