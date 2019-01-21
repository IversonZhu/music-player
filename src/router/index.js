import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Recommend from 'components/m-recommend/m-recommend'
import Singer from 'components/m-singer/m-singer'
import SingerDetail from 'components/m-singer-detail/m-singer-detail'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/m-recommend'
    },
    {
      path: '/m-recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
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
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/m-search',
      component: Search,
    },
  ]
})
