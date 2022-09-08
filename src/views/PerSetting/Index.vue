<template>
  <div class="common-layout">
    <nav-head></nav-head>
    <el-container>
      <AsideMenu></AsideMenu>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavHead from "@/components/NavHead.vue";
import AsideMenu from "@/views/PerSetting/components/AsideMenu.vue";
</script>

<style lang="scss" scoped>
@function getWidth($n) {
  @return calc($n * 100vw / 1920px);
}

@function getHeight($n) {
  @return calc($n * 100vh / 1080px);
}

$w: getWidth(1px);
$h: getHeight(1px);

.common-layout {
  width: 100%;
  box-sizing: border-box;
  padding-top: 80px;
  height: calc(100vh - 80px);
}

.el-header {
  background: #b3c0d1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
