<template>
  <div>
    <router-view />
    <el-icon class="scollTop" ref="scrollTopBtn" @click="ScrollToTop" v-show="toptarget">
      <ArrowUp />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
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
  right: 50px;
  bottom: 50px;
  border-radius: 50%;
  box-shadow: 0 0 5px #f00;
  cursor: pointer;
}
</style>
