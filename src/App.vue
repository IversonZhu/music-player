<template>
  <div id="app">
    <m-header></m-header>
    <m-tab></m-tab>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import MTab from 'components/m-tab/m-tab'

export default {
  components: {
    MHeader,
    MTab
  },
  name: 'App'
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
