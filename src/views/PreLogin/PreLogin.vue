<template>
  <main>
    <nav-head></nav-head>
    <el-form class="demo-form-inline">
      <el-form-item label="请输入验证码" style="width:300px">
        <el-input v-model="nowcode" placeholder="请输入验证码" />
      </el-form-item>
      <el-form-item style="width:300px">
        <div class="btncontainer">
          <el-button type="primary" plain @click="onSubmit" :loading="loading">申请验证码</el-button>
          <el-button type="warning" @click="toCheck">登陆后台</el-button>
        </div>
      </el-form-item>
    </el-form>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavHead from "@/components/NavHead.vue";
import http from "@/utils/http";
import { ElMessage } from "element-plus";
defineComponent({
  name: "PreLogin"
});
let nowcode = ref("");
let route = useRoute();
let router = useRouter();
let loading = ref(false);
onMounted(() => {});
let onSubmit = () => {
  let nowcookie = document.cookie;
  http.get("login/getCode").then(res => {
    if (res.data.errcode == 0) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 15000);
      ElMessage({
        type: "success",
        message: "验证码发送成功，验证码有效期10分钟"
      });
    }
  });
};
let toCheck = () => {
  let nowcookie = document.cookie;
  http
    .post("login/tvCode", {
      code: nowcode.value
    })
    .then(async res => {
      if (res.data.errcode == 0) {
        let oDate = new Date();
        nowcode.value == "";
        await oDate.setTime(oDate.getTime() + 1000 * 60 * 200);
        document.cookie = "auth=true;expires=" + oDate.toGMTString();
        ElMessage({
          type: "success",
          message: "登陆成功"
        });
        router.push("/personal");
      } else {
        ElMessage({
          type: "error",
          message: "验证码错误或者过期"
        });
      }
    });
};
</script>

<style lang="scss" scoped>
main {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-image: url("@/assets/Login/back3.jpg");
  background-size: 100% 100%;
}
.demo-form-inline {
  box-sizing: border-box;
  position: absolute;
  right: calc(50% - 150px);
  top: calc(50% - 100px);
  border-radius: 5px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(193, 216, 230, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px 20px 0;
}

.btncontainer {
  width: 300px;
  display: flex;
  justify-content: flex-end;
}
</style>