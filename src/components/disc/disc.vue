<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from 'components/m-music-list/m-music-list'
    import {mapGetters} from 'vuex'
    import {getSongList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import {getMusic} from 'api/singer'
    import {createSong} from 'common/js/song'
    export default {
        data() {
            return {
                songs: []
            }
        },
        computed: {
            title() {
                return this.disc.dissname
            },
            bgImage() {
                return this.disc.imgurl
            },
            ...mapGetters([
                'disc'
            ])
        },
        components: {
            MusicList
        },
        methods: {
            _getSongList() {
                if(!this.disc.dissid) {
                    this.$router.push('/m-recommend')
                    return
                }
                getSongList(this.disc.dissid).then((res) => {
                    if(res.code === ERR_OK) {
                        //console.log(res.cdlist[0].songlist)
                        this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    if (item.songmid && item.albummid) {
                        getMusic(item.songmid).then((res) => {
                            if (res.code === ERR_OK) {
                                const svkey = res.data.items
                                const songVkey = svkey[0].vkey
                                ret.push(createSong(item, songVkey))
                            }
                        })
                    }
                })
                return ret
            }
        },
        created() {
            this._getSongList()
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
