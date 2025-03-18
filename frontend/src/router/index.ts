import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Articles from '../pages/Articles.vue'
import Contact from '../pages/Contact.vue'
import Legals from '../pages/Legals.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/articles', name: 'Articles', component: Articles },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/legals', name: 'Legals', component: Legals },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
