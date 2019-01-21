<template>
    <transition name="slide">
       <music-list :bg-image="bgImgae" :title="title" :songs="songs" :rank="rank"></music-list> 
    </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from 'components/m-music-list/m-music-list'
    import {mapGetters} from 'vuex'
    import {getMusicList} from 'api/rank'
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'
    import {getMusic} from 'api/singer'

    export default {
        data() {
            return {
                songs: [],
                rank: true
            }
        },
        created() {
            this._getMusicList()
        },
        methods: {
            _getMusicList() {
                if(!this.topList.id) {
                    this.$router.push('/m-rank')
                    return
                }
                getMusicList(this.topList.id).then((res) => {
                    if(res.code === ERR_OK) {
                        this.songs = this._normalizeSongs(res.songlist)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    const musicData = item.data
                    if (musicData.songmid && musicData.albummid) {
                        getMusic(musicData.songmid).then((res) => {
                            if (res.code === ERR_OK) {
                                const svkey = res.data.items
                                const songVkey = svkey[0].vkey
                                ret.push(createSong(musicData, songVkey))
                            }
                        })
                    }
                })
                return ret
            }
        },
        computed: {
            title() {
                return this.topList.topTitle
            },
            bgImgae() {
                if(this.songs.length) {
                    return this.songs[0].image
                }
                return ''
            },
            ...mapGetters([
                'topList'
            ])
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
