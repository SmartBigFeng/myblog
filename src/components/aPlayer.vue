<template>
    <div class="mainPage" ref="playerRef"></div>
</template>
   
<script setup lang="ts">
import APlayer from 'aplayer';
import 'aplayer/dist/APlayer.min.css';
import { reactive, watch, nextTick, computed, getCurrentInstance, onMounted, ref, PropType } from 'vue'
const playerRef = ref(null)
const { proxy } = getCurrentInstance()
const state = reactive({
    instance: null
})
export interface audioListTypes {
    name: string;
    artist: string;
    url: string;
    cover: string;
    theme: string;
    lrc?: string;
}
const props = defineProps({
    // 音乐列表
    audio: {
        type: Array as PropType<audioListTypes[]>,
        required: true,
        default: () => {
            return []
        }
    },
    // 自动播放
    autoplay: {
        type: Boolean,
        default: false
    },
    // 开启吸底模式
    fixed: {
        type: Boolean,
        default: false
    },
    // 开启迷你模式
    mini: {
        type: Boolean,
        default: false
    },
    // 主题色
    theme: {
        type: String,
        default: 'rgba(255,255,255,0.2)'
    },
    // 音频循环播放
    loop: {
        type: String,
        default: 'all' //'all' | 'one' | 'none'
    },
    // 音频循环顺序
    order: {
        type: String,
        default: 'random' //'list' | 'random'
    },
    // 预加载
    preload: {
        type: String,
        default: 'auto' //'auto' | 'metadata' | 'none'
    },
    // 默认音量
    volume: {
        type: Number,
        default: 0.7,
        validator: (value) => {
            return value >= 0 && value <= 1;
        }
    },
    // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    mutex: {
        type: Boolean,
        default: true
    },
    // 传递歌词方式
    lrcType: {
        type: Number,
        default: 3
    },
    // 列表是否默认折叠
    listFolded: {
        type: Boolean,
        default: true
    },
    // 列表最大高度
    listMaxHeight: {
        type: String,
        default: '100px'
    },
    // 存储播放器设置的 localStorage key
    storageName: {
        type: String,
        default: 'aplayer-setting'
    },
    fixPosition: {
        type: String,
        default: '' // l-b 左下角  r-b 右下角
    }
})
let ap = reactive({})
onMounted(() => {
    initPlayer()

})
const initPlayer = () => {
    let options = JSON.parse(JSON.stringify(props))
    delete options.audio;
    delete options.fixPosition;
    ap = new APlayer({
        container: playerRef.value,
        ...props
    });
    setTimeout(()=>{
        ap.events.events.play[0]()
        ap.events.events.pause[0]()
        ap.events.events.play[0]()
    },1000)
    playerRef.value && playerRef.value.setAttribute("class", `${playerRef.value.getAttribute("class")} ${props.fixPosition}`);
}

</script>
   
<style lang='scss' scoped>
.aplayer.aplayer-withlrc .aplayer-lrc {
    display: none;
}

.l-b {
    background: #FCFCFC;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
}

.r-b {
    background: #FCFCFC;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 100;
}
</style>
<style>
.aplayer .aplayer-lrc {
    display: none;
    position: relative;
    width: 220px;
    padding-top: 5px;
    height: 40px;
    text-align: center;
    overflow: hidden;
    margin: -10px 0 7px;
}

.aplayer.aplayer-withlrc .aplayer-info {
    margin-left: 90px;
    height: 90px;
    padding: 0px 7px 0;
}
</style>