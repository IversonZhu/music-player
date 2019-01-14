<template>
    <div class="song-list">
        <ul>
            <li class="item" v-for="song in songs" :key=song.id>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        songs: {
            type: Array,
            default: []
        }
    },
    methods: {
        getDesc(song) {
            return `${song.singer} 所属专辑：${song.album}`
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'

    .song-list
        .item
            display: flex
            align-items: center
            box-sizing: border-box
            height: 64px
            font-size: $font-size-medium
            .content
                flex: 1
                line-height: 20px
                overflow: hidden
                .name
                    no-wrap()
                    color: $color-text
                .desc
                    no-wrap()
                    color: $color-text-d
                    font-size: $font-size-small-s
</style>

