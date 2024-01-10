import {createWebHistory, createRouter, RouterView} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/auth/DashboardView.vue'
import ArtistManagementView from '../views/auth/ArtistManagementView.vue'
import UserManagementView from '../views/auth/UserManagementView.vue'
import MusicManagementView from '../views/auth/MusicManagementView.vue'
import ArtistView from '../views/ArtistView.vue'
import MusicList from '../components/MusicList.vue'
import NotFound from '../components/NotFound.vue'
import Forbidden from '../components/ForbiddenView.vue'


const router= createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'landing',
            component:HomeView
        },
        {
            path:'/home',
            name:'homepage',
            component:HomeView
        },
        {
            path:'/musics',
            name:'music',
            component: MusicList,
        },
        {
            path:'/sign-up',
            name:'signup',
            component:SignupView
        },{
            path:'/login',
            name:'login',
            component:LoginView
        },
        {
            path:'/artists',
            name:'artists',
            component:ArtistView
        },
        // auth routes start
        {
            path:'/dashboard',
            name:'dashboard',
            component:DashboardView,
            meta:{
                requiresAuth:true
            }
        },
        {
            path:'/dashboard/music-management',
            name:'dashboard-music',
            component:MusicManagementView,
            meta:{
                requiresAuth:true
            }
        },
        {
            path:'/dashboard/artist-management',
            name:'dashboard-artist',
            component:ArtistManagementView,
            meta:{
                requiresAuth:true
            }
        },
        {
            path:'/dashboard/user-management',
            name:'dashboard-user',
            component:UserManagementView,
            meta:{
                requiresAuth:true
            }
        },
        // auth routes end


        {
            path:'/:pathMatch(.*)',
            name:'notfound',
            component:NotFound
        },
        {
            path:'/forbidden',
            name:'forbidden',
            component:Forbidden
        }

    ]
})

const token = localStorage.getItem('token')
const isLoggedIn = (token==null || token =="" || token ==undefined)?false:true 
// handling auth routes 
router.beforeEach((to,from,next)=>{
    if(to.matched.some((record)=>record.meta.requiresAuth)){
        if(isLoggedIn){
            next()
        }else{
            // router.push('/login')
            router.push('/forbidden')
        }
    }else{
        next()
    }
})


export default router