<template>
  <div>
    <div class="box">
      <nav-head></nav-head>
      <main>
        <div class="main-head">
          <div class="main-head-one">
            <p>按内容分类</p>
            <el-select v-model="condition.kinds" placeholder="按内容分类" popper-class="select" size="large">
              <el-option v-for="item in optionKinds" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="main-head-two">
            <p>按时间分类</p>
            <el-select v-model="condition.conyear" placeholder="按年份分类" popper-class="select" size="large">
              <el-option v-for="item in optionYears" :key="item.value" :label="item.label + '年'" :value="item.value" />
            </el-select>
            <el-select v-model="condition.conmonth" placeholder="按月份分类" popper-class="select" size="large">
              <el-option v-for="month in 12" :key="month" :label="month + '月'" :value="month" />
            </el-select>
          </div>
          <div class="main-head-three">
            <p>按原创分类</p>
            <el-select v-model="condition.compos" placeholder="按原创分类" popper-class="select" size="large">
              <el-option value="原创" />
              <el-option value="转载" />
            </el-select>
          </div>
          <div>
            <p style="margin: 16px 0;height:28px;"></p>
            <el-button class="reset_btn" @click="reset">重置</el-button>
          </div>
        </div>
        <div class="main-content">
          <unit-blog v-if="allBlogs.length" :coverInfo="allBlogs"></unit-blog>
          <template v-else>
            <el-empty description="暂无数据" />
          </template>
        </div>
        <span class="load-in">//未完待续......</span>
      </main>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import {
  defineComponent,
  ref,
  onBeforeMount,
  defineAsyncComponent,
  onMounted,
  watch
} from "vue";
import NavHead from "@/components/NavHead.vue";
import FooterCom from "@/components/FooterCom.vue";
import optionKinds from "@/Mock/blogKinds.json";
const UnitBlog = defineAsyncComponent(() =>
  import("@/components/unitBlog.vue")
);
defineComponent({
  name: "BlogView",
});

let allBlogs = ref([]);
let optionYears = ref([]);
let condition = ref({
  kinds: "",
  conyear: "",
  conmonth: "",
  compos: "",
});
onMounted(() => {
  if (store.state.blogs.allBlogs.length == 0) {
    store.dispatch("blogs/getAllBlogs", {}).then((res) => {
      allBlogs.value = res
    });
  } else {
    allBlogs.value = store.state.blogs.allBlogs.slice(0, 9);
  }
  document.documentElement.scrollTop = "0";
  let nowyear = new Date().getFullYear();
  for (let startyear = 2022; startyear <= nowyear; startyear++) {
    optionYears.value.push({
      value: startyear + "",
      label: startyear + "",
    });
  }
});
const reset = () => {
  condition.value.kinds = ''
  condition.value.compos = ''
  condition.value.conmonth = ''
  condition.value.conyear = ''
  store
    .dispatch("blogs/getAllBlogs", {
      type: "condition",
      condition: {},
    })
    .then((res) => {
      allBlogs.value = res.slice(0, 9);
    });
}
watch(condition.value, () => {
  let newcondition = JSON.parse(JSON.stringify(condition.value));
  newcondition.conmonth =
    (newcondition.conmonth + "").length == 1
      ? "0" + newcondition.conmonth
      : newcondition.conmonth;
  newcondition.posttime = newcondition.conyear + "-" + newcondition.conmonth + '-';
  newcondition.kinds == "" ? delete newcondition.kinds : "";
  newcondition.posttime == "-" ? delete newcondition.posttime : "";
  newcondition.compos == "" ? delete newcondition.compos : "";
  delete newcondition.conyear;
  delete newcondition.conmonth;
  store
    .dispatch("blogs/getAllBlogs", {
      type: "condition",
      condition: newcondition,
    })
    .then((res) => {
      allBlogs.value = res.slice(0, 9);
    });
});
</script>

<style lang="scss">
.select {
  text-align: center;
}
</style>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

.box {
  margin: 0 auto;
  width: 1200px;
  margin-top: 80px;

  main {
    min-height: calc(100vh - 80px);
  }

  .main-head {
    display: flex;
    font-size: 22px;
    color: #5f5f5f;

    div {
      margin-right: 30px;

      p {
        margin: 16px 0;
      }

      .el-select {
        width: 200px;
      }

      .reset_btn {
        padding: 4px 20px;
        height: 40px;
      }
    }
  }

  .main-content {
    width: 1251px;
    padding: 0px 2px;
    padding-bottom: 10px;
    overflow: hidden;
  }

  .load-in {
    display: inline-block;
    padding-top: 100px;
    font-size: 26px;
    color: #b0b0b0;
  }
}
</style>
