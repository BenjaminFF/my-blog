import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import blogContainer from '@/components/router-comps/blog-container';
import blogCategory from '@/components/router-comps/blog-category';

Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blogContainer',
      component: blogContainer
    },
    { path: '/blogCategory/:title',
      name:'blogCategory',
      component: blogCategory
    },
    {
      path: '/blog',
      name: 'blogContainer',
      component: blogContainer
    },
  ]
})
