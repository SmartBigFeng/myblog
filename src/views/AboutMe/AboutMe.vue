<template>
  <transition name="slide-fade">
  <div class="box">
    <nav-head></nav-head>
    <div class="show">
      <div class="below swing_skew_1">
        <img src="@/assets/aboutMe/me.jpg" />
      </div>
      <div class="above">
        <h4>Hi!</h4>
        <p>
          我是程序员，我会写程序，我不会写bug。
          我是程序员，我会写程序，我不会写bug。
          我是程序员，我会写程序，我不会写bug。
          我是程序员，我会写程序，我不会写bug。
          我是程序员，我会写程序，我不会写bug。
        </p>
      </div>
      <el-icon class="ToBlogs" @click="scrollToBlogs">
        <ArrowDown />
      </el-icon>
    </div>
    <el-icon class="ToFooter" @click="scrollFooter">
      <ArrowDown />
    </el-icon>
  </div>
</transition>
  <footer-com></footer-com>
</template>

<script setup lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import { defineComponent, onBeforeMount, ref, onMounted } from "vue";
import UnitBlog from "@/components/unitBlog.vue";
import NavHead from "@/components/NavHead.vue";
import FooterCom from "@/components/FooterCom.vue";

defineComponent({
  name: "AboutMe"
});

let allBlogs = ref([]);

onBeforeMount(async () => {
  if (store.state.blogs.allBlogs.length == 0) {
    store.dispatch("blogs/getAllBlogs");
  }
  store.state.blogs.allBlogs.map((v, i) => {
    if (i < 6) allBlogs.value.push(v);
  });
});
onMounted(() => {
  document.documentElement.scrollTop = 0;
});
const scrollToBlogs = () => {
  const docEle = document.documentElement;
  docEle.scrollTop = docEle.clientHeight - 80;
};
const scrollFooter = () => {
  const docEle = document.documentElement;
  docEle.scrollTop = docEle.clientHeight * 2 - 80;
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

@keyframes scrollBlogs {
  50% {
    transform: scale(1.2);
    background: rgba($color: #483f59, $alpha: 0.5);
    font-size: 32px;
  }

  100% {
    transform: scale(1);
    background: rgba($color: #000000, $alpha: 0);
    font-size: 24px;
  }
}

.box {
  margin: 0 auto;
  width: 1200px;
  margin-top: 80px;
  height: calc(100vh - 80px);
  .show {
    position: relative;
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;

    .ToBlogs {
      display: block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 24px;
      color: #000;
      border-radius: 50%;
      box-shadow: 0 0 10px #000;
      position: absolute;
      left: calc(50% - 25px);
      bottom: 10px;
      display: flex;
      flex-direction: column;
      justify-items: center;
      cursor: pointer;
      transition: all 0.5s;
      transform-origin: 50% 50% 0;
      animation: scrollBlogs 2s forwards infinite;
    }

    .below {
      position: absolute;
      width: 867px;
      height: 100%;

      img {
        margin-top: 10vh;
        height: 60vh;
        object-fit: contain;
        border-radius:10px;
      }
    }

    .above {
      box-sizing: border-box;
      position: absolute;
      right: -20px;
      top: 40px;
      padding: 40px 20px;
      width: 580px;
      background: linear-gradient(to bottom, #21aabb, #6dd5ed);
      border-radius: 10px;

      h4 {
        font-size: 28px;
      }

      p {
        margin-top: 16px;
        font-size: 20px !important;
        line-height: 32px;
        height: 60vh;
      }
    }
  }
}
.swing_skew_1{
    -webkit-animation:swing_skew_1 1s ease;
    -webkit-transform-origin:0% 100%;
}
@-webkit-keyframes swing_skew_1{
  0% {
    opacity: 0;
    -webkit-transform:translateX(400px) skew(-45deg)
  }
  30%{
    opacity:1;
    -webkit-transform:translateX(0) skew(8deg);
  }
  50%{
    -webkit-transform:translateX(0) skew(-3deg);
  }
  70%{
    -webkit-transform:translateX(0) skew(1deg);
  }
}
</style>