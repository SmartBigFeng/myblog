<template>
    <el-aside>
      <el-menu :default-active="defaultActive" router>
        <el-menu-item index="/mysetting" to="/mysetting">
          <el-icon> <chat-line-square /> </el-icon>我的信息
        </el-menu-item>
        <el-menu-item index="/opussetting" to="/opussetting">
          <el-icon> <document-checked /> </el-icon>作品管理
        </el-menu-item>
        <el-menu-item index="/myblogs" to="/myblogs">
          <el-icon> <food /> </el-icon>Blog管理
        </el-menu-item>
        <el-menu-item index="/addblog" to="/addblog">
          <el-icon> <food /> </el-icon>发布Blog
        </el-menu-item>
        <el-menu-item index="/auth" to="/auth">
          <el-icon> <food /> </el-icon>评论审核
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
let defaultActive = ref("/mysetting");
onMounted(() => {
  defaultActive.value = route.path;
});
watch(route, () => {
  defaultActive.value = route.path;
});
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

.el-aside {
  background: #d3dce6;
  height: calc(100vh - 80px);
  width: 220 * $w;
  min-width: 180px;
  box-sizing: border-box;

  & > .goIndex {
    display: flex;
    align-items: center;
    height: 56px;
    line-height: 56px;
    font-size: var(--el-menu-item-font-size);
    color: var(--el-menu-text-color);
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;

    & > el-icon {
      width: 1em;
    }

    & > a {
      margin-left: 10px;
    }
  }
  .el-menu,
  .el-menu-item {
    background-color: #d3dce6;
  }
}
</style>
