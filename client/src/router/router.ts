import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../components/dashboard/Dashboard.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
