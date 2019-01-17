<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {ERR_OK} from 'api/config'
    import {getSingerDetail, getMusic} from 'api/singer'
    import {createSong} from 'common/js/song'
    import MusicList from 'components/m-music-list/m-music-list'

    export default {
        created() {
            this._getsingerDetail()
        },
        data() {
            return {
                songs: []
            }
        },
        computed: {
            title() {
                return this.singer.name
            },
            bgImage() {
                return this.singer.avatar
            },
            ...mapGetters([
                'singer'
            ]) 
        },
        methods: {
            _getsingerDetail(){
                if(!this.singer.id) {
                    this.$router.push('/m-singer')
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if(res.code === ERR_OK) {
                        this.songs = this._normalizeSongs(res.data.list)
                        console.log(this.songs)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if (musicData.songid && musicData.albummid) {
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
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>

