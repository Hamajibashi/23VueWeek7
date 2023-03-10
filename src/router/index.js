import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../views/Front/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Admin/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Admin/AdminProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/Admin/AdminOrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/Admin/AdminCouponsView.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/Admin/AdminArticlesView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
