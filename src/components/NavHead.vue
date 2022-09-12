<template>
  <header class="bg-black">
    <nav class="nav-container">
      <img class="logo-white" src="@/assets/Head/NavLogo.png" />
      <span class="routerimg" @click="router.push('/')"></span>
      <el-menu class="router-list">
        <el-menu-item class="item-white" style="padding:0;">
          <span class="iconcontainer" @click="router.push('/')">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span class="title">主页</span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;">
          <span class="iconcontainer" @click="router.push('/indexproject')">
            <el-icon>
              <Grid />
            </el-icon>
            <span class="title">项目</span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;">
          <span class="iconcontainer" @click="router.push('/indexblogs')">
            <el-icon>
              <Document />
            </el-icon>
            <span class="title">博客</span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;">
          <span class="iconcontainer" @click="router.push('/aboutme')">
            <el-icon>
              <Avatar />
            </el-icon>
            <span class="title">关于我</span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;">
          <span class="iconcontainer" @click="router.push('/personal')">
            <el-icon>
              <Setting />
            </el-icon>
            <span class="title">个人中心</span>
          </span>
        </el-menu-item>
        <el-menu-item class="item-white" style="padding:0;" :disabled="showtag">
          <span class="iconcontainer" @click="clearCookie">
            <el-icon>
              <SwitchButton />
            </el-icon>
            <span class="title">退出登录</span>
          </span>
        </el-menu-item>
      </el-menu>
    </nav>
  </header>
</template>

<script setup lang="ts">
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
  width: 100vw;
  box-sizing: border-box;
  z-index: 100;

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
    }
    span.routerimg{
      display: block;
      width:220px;
      height:80px;      
      position: absolute;
      left:208px;
      top:0;
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
        @keyframes colorChange {
          20% {
            color: #8fd1e1;
          }
          80% {
            color: #fff;
          }
        }
        span.iconcontainer {
          transition: font-size 0.5s;
          margin: 0 10px;
        }
        span.iconcontainer .el-icon {
          transition: font-size 0.5s;
          animation: colorChange 1s forwards 0.1s;
        }
        &:hover .iconcontainer {
          animation: colorChange 1s forwards 0.1s;
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
</style>