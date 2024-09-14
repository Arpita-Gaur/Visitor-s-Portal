// import Vue from 'vue';
import {createRouter,createWebHistory}from 'vue-router';
import DashboardIng from '../components/Dashboard.vue';
import LoginPage from '../components/LoginPage.vue';
import CheckIn from '../components/CheckIn.vue';
import DashPage from '../components/DashPage.vue';
import CheckOut from '../components/CheckOut.vue';
import BookIng from '../components/BookIng.vue';
import UpdateData from '../components/UpdateData.vue';



const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardIng
  },
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/CheckIn',
    name: 'CheckIn',
    component: CheckIn
  },
  {
    path: '/DashPage',
    name: 'DashPage',
    component: DashPage
  },
  {
    path: '/CheckOut',
    name: 'CheckOut',
    component: CheckOut
  },
  {
    path: '/BookIng',
    name: 'BookIng',
    component: BookIng
  },{
    path: '/UpdateData',
    name: 'UpdateData',
    component: UpdateData
  },
  
//   {
//     path: '/',
//     redirect: '/login'
//   }
];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes  // Make sure routes are used here
// });
const router=createRouter(
    {
        history:createWebHistory(),
        routes,
    }
);
export default router;
