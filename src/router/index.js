import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/m-rank/m-rank'
import Search from 'components/m-search/m-search'
import Recommend from 'components/m-recommend/m-recommend'
import Singer from 'components/m-singer/m-singer'
import SingerDetail from 'components/m-singer-detail/m-singer-detail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/m-recommend'
    },
    {
      path: '/m-recommend',
      component: Recommend
    },
    {
      path: '/m-singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/m-rank',
      component: Rank
    },
    {
      path: '/m-search',
      component: Search
    },
  ]
})
