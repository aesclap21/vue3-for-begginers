import { createRouter, createWebHistory } from 'vue-router'
// import NotFound from '../views/NotFound.vue'
// import Admin from '../views/Admin.vue'
// import AppHome from '../views/AppHome.vue'
// import Category from '../views/Category.vue'
// import Create from '../views/Create.vue'

const NotFound = () => import(
  /* webpackChunkName: "NotFound" */ '../views/NotFound.vue'
);
const Admin = () => import(
  /* webpackChunkName: "Admin" */ '../views/Admin.vue'
);
const AppHome = () => import(
  /* webpackChunkName: "AppHome" */ '../views/AppHome.vue'
);
const Category = () => import(
  /* webpackChunkName: "Card-Groupe" */ '../views/Category.vue'
);
const Create = () => import(
  /* webpackChunkName: "Card-Groupe" */ '../views/Create.vue'
);

// const loggedIn = false;
// function isLoggedIn() {
//   if (!loggedIn) return false
// }

const routes = [
  {
    path: '/:pathname(.*)*',
    name: 'Error',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: AppHome
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    // beforeEnter: [isLoggedIn]
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: Category,
    child:[
      {
        path: '/category/:pathName(.*)*',
        name: 'Error',
        component: NotFound
      }
    ]
  },
  {
    path: '/create/:id/:page',
    name: 'Create',
    component: Create
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach( to => {
//   if(to.name === 'Admin')
//   return router.push('/');
// })

export default router
