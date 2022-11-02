<template>
  <header class="bg-black">
    <nav class="nav-container">
      <img class="logo-white" src="@/assets/Head/NavLogo.png" @click="router.push('/')" />
      <el-menu class="router-list">
        <el-menu-item class="item-white" style="padding:0;">
          <span class="head_span" @click="router.push('/')">
            <el-icon>
              <HomeFilled />
            </el-icon>主页
            <span class="t_r"></span>
            <span class="r_b"></span>
            <span class="b_l"></span>
            <span class="l_t"></span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;">
          <span class="head_span" @click="router.push('/indexproject')">
            <el-icon>
              <Grid />
            </el-icon>项目
            <span class="t_r"></span>
            <span class="r_b"></span>
            <span class="b_l"></span>
            <span class="l_t"></span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;">
          <span class="head_span" @click="router.push('/indexblogs')">
            <el-icon>
              <Document />
            </el-icon>博客
            <span class="t_r"></span>
            <span class="r_b"></span>
            <span class="b_l"></span>
            <span class="l_t"></span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;">
          <span class="head_span" @click="router.push('/aboutme')">
            <el-icon>
              <Avatar />
            </el-icon>关于我
            <span class="t_r"></span>
            <span class="r_b"></span>
            <span class="b_l"></span>
            <span class="l_t"></span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;">
          <span class="head_span" @click="router.push('/personal')">
            <el-icon>
              <Setting />
            </el-icon>个人中心
            <span class="t_r"></span>
            <span class="r_b"></span>
            <span class="b_l"></span>
            <span class="l_t"></span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;" :disabled="showtag">
          <span class="head_span" @click="clearCookie">
            <el-icon>
              <SwitchButton />
            </el-icon>退出登录
            <span class="t_r"></span>
            <span class="r_b"></span>
            <span class="b_l"></span>
            <span class="l_t"></span>
          </span>
        </el-menu-item>
      </el-menu>
    </nav>
  </header>
</template>

<script setup>
import { defineComponent, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
defineComponent({
  name: "NavHead"
});
const showtag = computed(() => {
  return document.cookie == "";
});
onMounted(() => {});
//清空cookie
function clearCookie() {
  if (showtag.value) return;
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie =
        keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString(); //清除当前域名下的
      document.cookie =
        keys[i] +
        "=0;path=/;domain=" +
        document.domain +
        ";expires=" +
        new Date(0).toUTCString();
      document.cookie =
        keys[i] +
        "=0;path=/;domain=kevis.com;expires=" +
        new Date(0).toUTCString();
    }
  }
  router.push("/");
}

const router = useRouter();
</script>

<style lang="scss" scoped>
$height: 80px;

header {
  position: fixed;
  left: 0;
  top: 0;
  height: $height;
  line-height: $height;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;

  .nav-container {
    box-sizing: border-box;
    width: 1200px;
    margin: 0 auto;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;

    .logo-white {
      align-self: center;
      width: 208px;
      height: 57px;
      object-fit: contain;
      cursor: pointer;
    }

    .router-list {
      width: 600px;
      $bgcolor: rgba(0, 0, 0, 0);
      display: flex;
      list-style: none;
      justify-content: space-between;
      align-items: center;
      background: $bgcolor;
      border-right: 0 !important;

      .item-white {
        display: block;
        box-sizing: content-box;
        height: $height;
        line-height: $height;
        padding: 0 10px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background-color: rgba(0, 0, 0, 0);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.2s;
        &:hover {
          color: #8fd1e1;
        }
        span.head_span {
          display: flex;
          align-items: center;
          padding:0 20px;
          position: relative;
          margin:0 8px;
          &:hover {
              -webkit-animation: anima_wobble 2s;
            }
          .t_r{
            position: absolute;
            top:0;
            left:0;
            height:2px;
            width:0;
            background-color: #8fd1e1;
            transition:all linear 0.3s;
          }
          .b_l{
            position: absolute;
            bottom:0;
            right:0;
            height:2px;
            width:0;
            background-color: #8fd1e1;
            transition:all linear 0.3s;
          }
          &:hover .t_r,&:hover .b_l{
            width:100%;
          }
          .r_b{
            position: absolute;
            top:0;
            right:0;
            height:0;
            width:2px;
            background-color: #8fd1e1;
            transition:all linear 0.3s;
          }
          .l_t{
            position: absolute;
            bottom:0;
            left:0;
            height:0;
            width:2px;
            background-color: #8fd1e1;
            transition:all linear 0.3s;
          }
          &:hover .r_b,&:hover .l_t{
            height:100%;
          }
        }
      }
    }
  }
}

.bg-black {
  background-color: #25272b;
}

.bg-white {
  background-color: #fff;
  box-shadow: -5px 2px 5px 0px rgba(0, 0, 0, 0.1);
}

.headers {
  width: 100%;

  height: 100px;
  background-color: #25272b;
}
@-webkit-keyframes anima_wobble{
  7.5% {
    -webkit-transform: translateX(-15%) rotate(-3deg);
  }
  15% {
    -webkit-transform: translateX(12%) rotate(2deg);
  }
  22.5% {
    -webkit-transform: translateX(-9%) rotate(-2deg);
  }
  30% {
    -webkit-transform: translateX(6%) rotate(1deg);
  }
  37.5% {
    -webkit-transform: translateX(-3%) rotate(-1deg);
  }
  50%{
      -webkit-transform: translateX(0) rotate(0deg)
  }
}
</style>