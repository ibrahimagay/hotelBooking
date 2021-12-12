import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HotelDateSelection',
    component:() => import('../views/HotelDateSelection.vue')
  },
  {
    path: '/room-type-view-selection',
    name: 'RoomTypeViewSelection',
    component: () => import('../views/RoomTypeViewSelection.vue')
  },
  {
    path: '/preview-payment-transactions',
    name: 'PreviewPaymentTransactions',
    component: () => import('../views/PreviewPaymentTransactions .vue')
  },
  {
    path: '/reservation-successful',
    name: 'ReservationSuccessful',
    component: () => import('../views/ReservationSuccessful.vue')
  },
  {
    path: '/reservation-cancel',
    name: 'ReservationCancel',
    component: () => import('../views/ReservationCancel.vue')
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router