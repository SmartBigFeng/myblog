<template>
  <div>
    <router-view></router-view>
    <el-icon class="scollTop" ref="scrollTopBtn" @click="ScrollToTop" v-show="toptarget">
      <ArrowUp />
    </el-icon>
  </div>
  <aPlayer :audio="audioList" :order="'list'" :mini="true" :autoplay="true" :volume="1" fix-position="r-b"></aPlayer>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import aPlayer from "@/components/aPlayer.vue"
import NavHead from "@/components/NavHead.vue";
const scrollTopBtn = ref(null);
const toptarget = ref(false);
onMounted(() => {
  docScroll();
  window.addEventListener("scroll", docScroll, true);
});
const ScrollToTop = () => {
  document.documentElement.scrollTop = 0;
};
const docScroll = () => {
  toptarget.value = document.documentElement.scrollTop > 400;
};
let audioList = ref([ // 歌曲列表
  {
    name: "老街", // 歌曲名字
    artist: "李荣浩", // 歌曲演唱者
    url: // 歌曲地址（这里用外链地址）
      "/Music/oldStreet.mp3",
    cover: "/Music/老街.jpg", // 歌曲头像
    theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色,
    lrc: '/Music/ljlrc.lrc'
  },
  {
    name: "玫瑰花的葬礼", // 歌曲名字
    artist: "许嵩", // 歌曲演唱者
    url: // 歌曲地址（这里用外链地址）
      "/Music/许嵩-玫瑰花的葬礼.mp3",
    cover: "/Music/Rosefuneral.jpg", // 歌曲头像
    theme: "rgb(127, 218, 180)", // 播放这首歌曲时的主题色,
    lrc: '/Music/Rosefuneral.lrc'
  },
])
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100vh;
  scroll-behavior: smooth;
  position: relative;
  min-width: 1200px;
}

body {
  overflow: overlay;
  transition: 0.3s opacity;
  // background:linear-gradient(30deg,#9fa5d5,#e8f5c8) ;
}

::-webkit-scrollbar {
  width: 8px;
  height: 20vh;
  margin: 0 2px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  margin: 0 2px;
  width: 10px;
  background-color: inherit;
  opacity: 0.6;
  border-radius: 8px;
}

::-webkit-scrollbar:horizontal {
  width: 20vh;
  height: 8px;
  margin: 0 2px;
  background-color: transparent;
}

body[scroll] {
  transition: 0.3s opacity;
}

body[scroll]::-webkit-scrollbar-thumb {
  background-color: #c8c7c5;
  opacity: 1;
}

.el-collapse-item__wrap {
  border: 0 !important;
}

.el-collapse-item__content {
  padding-bottom: 0 !important;
}

.passagehr {
  margin: 30px 0;
}

.passagep {
  font-size: 24px;
}

a {
  display: block;
  text-decoration: none;
}

ul {
  list-style-type: none;
}

/* 离开 */
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(50px)
}

/* 进入 */
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-50px)
}
</style>
<style lang="scss" scoped>
.scollTop {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: gray;
  font-size: 24px;
  position: fixed;
  right: 20px;
  bottom: 100px;
  border-radius: 50%;
  box-shadow: 0 0 5px 5px rgba(255, 0, 0, 0.3);
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
.v-enter-from {
  opacity: 0; // 组件初始先隐藏
  transform: translateX(50px); // 出现的时候向左滑一下的效果
}

.v-leave-to {
  opacity: 0; // 组件离开的时候要隐藏掉
  transform: translateX(-50px); // 离开的时候向左滑一下
}

</style>