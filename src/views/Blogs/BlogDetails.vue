<template>
  <div class="box" v-loading="loading">
    <NavHead></NavHead>
    <div class="container">
      <div class="breadcrumb">
      <button class="breadBtn" @click="router.push('/indexblogs')">返回</button>
      <span class="separator">|</span>
      <button class="breadBtn">{{ nowblog.kinds }}</button>
    </div>
    <main>
      <div class="blogtitleinfo">
        <h2>博客标题 : {{ nowblog.blogtitle }}</h2>
        <div class="assit">
          <img :src="nowblog.fileurl" style="height: 30px; width: 30px" />
          <p class="main-time">发布时间 : {{ nowblog.posttime }}</p>
        </div>
      </div>
      <p :title="nowblog.intro">{{ nowblog.intro }}</p>
      <h4 style="font-size: 32px; margin-top: 30px">正文部分</h4>
      <div
        v-html="
         dataHandle(data)
        "
      ></div>
    </main>
    </div>
  </div>
  <footer-com></footer-com>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, reactive, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavHead from "@/components/NavHead.vue";
import FooterCom from "@/components/FooterCom.vue";
import http from "@/utils/http";
defineComponent({
  name: "BlogDetails"
});
let loading = ref(false)
let data = ref("");
let router = useRouter();
let route = useRoute();
let nowblog = ref({});
const dataHandle=(data:string)=>{
  // data.replace('p><p', `p class='passagep'><hr class='passagehr' /><p`).replace('code><p', `code><p class='passagep' /><hr class='passagehr' /><p`)
  let oridata = data;
  oridata=oridata.replace(/<h3/g,'<h3 style="padding:16px 0;"')
  return oridata.replace(/\/pre>/g, `\/pre><p class='passagep' /><hr class='passagehr' />`)
}
// 生命周期钩子函数
onMounted(() => {
  loading.value=true;
  document.documentElement.scrollTop = 0;
  // route.params.id
  http
    .post("/blogs/getOne", {
      _id: route.query.id,
    })
    .then(async res => {
      if (res) {
        nowblog.value = JSON.parse(JSON.stringify(res.data));
        data.value = nowblog.value.fileflud;
      }
      loading.value=false;
    });
});
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

.box {
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 80px;
  padding: 70px 85px 0 85px;
  min-height: calc(100vh - 80px);
  width: 1200px;
  background-color: #f2f2f2;

  .breadcrumb {
    font-size: 30px;
    height: 30px;
    line-height: 1;
    .breadBtn {
      color: #000;
      font-weight: 700;
      outline: none;
      border: 0;
      font-size: 30px;
      height: 30px;
      cursor: pointer;
    }

    .separator {
      margin: 0 60px;
    }
  }
  div.container{
    -webkit-animation:zoom_move_6 0.5s;
  }
  main {
    padding-top: 40px;

    .blogtitleinfo {
      display: flex;
      height: 60px;
      justify-content: space-between;
      align-items: center;
      .assit {
        width: 40%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .main-time {
          font-size: 20px;
          color: #b0b0b0;
        }
        img {
          margin-right: 20px;
          height: 30px;
          width: 30px;
        }
      }
      p {
        font-size: 20px;
      }
    }
  }
}

@-webkit-keyframes zoom_move_6 {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-400px) scale(0);
  }
}
</style>
<style>
pre{
  background: rgba(0, 0, 0, 0.7);
  color:#ccc;
  font-size: 16px;
  display: block;
  padding:10px;
  margin:10px 0;
}
</style>
