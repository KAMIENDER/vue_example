import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import shouye from '@/page/shouye'
import blog from '@/page/blog'
import wangpan from '@/page/wangpan'
import Upload from '@/page/upload.vue'
import Animate from '@/page/animate.vue'
import detail from '@/page/animatedetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shouye',
      component: shouye
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/wangpan',
      name: 'wangpan',
      component: wangpan
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/animate',
      name: 'animate',
      component: Animate
    },
    {
      path: '/detail',
      name: 'animate_detail',
      component: detail
    }
  ]
})
