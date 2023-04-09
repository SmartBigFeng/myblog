import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index/Index.vue')
  },
  {
    path: '/indexblogs',
    name: 'indexblogs',
    component: () => import('@/views/Blogs/Blogs.vue')
  },
  {
    path: '/blogdetails',
    name: 'blogdetails',
    component: () => import('@/views/Blogs/BlogDetails.vue'),
    children: [
      {
        path: '/blogdetails/:id',
        component: () => import('@/views/Blogs/BlogDetails.vue')
      }
    ]
  },
  {
    path: '/indexproject',
    name: 'myworks',
    component: () => import('@/views/Projects/Projects.vue')
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    component: () => import('@/views/AboutMe/AboutMe.vue')
  },
  {
    path: '/prelogin',
    name: 'PreLogin',
    component: () => import('@/views/PreLogin/PreLogin.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    redirect: '/mysetting',
    component: () => import('@/views/PerSetting/Index.vue'),
    children: [
      {
        path: '/mysetting',
        name: 'mysetting',
        component: () => import('@/views/PerSetting/MySetting/MySetting.vue')
      },
      {
        path: '/opussetting',
        name: 'opussetting',
        component: () => import('@/views/PerSetting/OpusSetting/OpusSetting.vue')
      },
      {
        path: '/myblogs',
        name: 'blogsetting',
        component: () => import('@/views/PerSetting/MyBlogs/MyBlogs.vue')
      },
      {
        path: '/addblog',
        name: 'addblog',
        component: () => import('@/views/PerSetting/AddBlog/AddBlog.vue')
      },
      {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/PerSetting/Auth/auth.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next) => {
  if (document.cookie == '' && (to.path == '/personal' || to.path == '/mysetting' || to.path == '/opussetting' || to.path == '/myblogs' || to.path == '/addblog')) {
    router.push('/prelogin');
  }
  if (to.path == '/') {
    if (store.state.blogs.allBlogs.length == 0) {
      await store.dispatch('blogs/getAllBlogs', {
        type: 'all'
      })
    }
    if (store.state.works.infos.length == 0) {
      await store.dispatch('works/renewinfo');
    }
  }
  next();
})
export default router
