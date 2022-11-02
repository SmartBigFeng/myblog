<template>
  <div>
    <nav-head></nav-head>
    <div id="container">
      <el-container>
        <asideMenu @renewTitle="renewTitle" :nowtitle="nowtitle"></asideMenu>
        <el-main v-loading="vLoadingTag">
          <h2>{{ nowtitle }}</h2>
          <template v-if="nowinfos.length">
            <section class="cards-container">
              <div class="cards" v-for="item in nowinfos" :key="item.url">
                <img :src="item.url" alt @click="[(visiableTag = true), showSwiper(item.projname)]" />
              </div>
            </section>
          </template>
          <template v-else>
            <el-empty description="当前分类暂无项目" />
          </template>
        </el-main>
      </el-container>
      <div class="imgsShow" v-if="visiableTag" ref="showDialog">
        <ul>
          <li>
            <button @click="visiableTag = false">
              <el-icon style="font-size: 24px; color: gray">
                <close-bold />
              </el-icon>
            </button>
          </li>
        </ul>
        <div class="block text-center">
          <el-carousel
            :height="innerHeight"
            arrow="always"
            trigger="click"
            indicator-position="outside"
            :autoplay="false"
          >
            <el-carousel-item v-for="item in nowimgs.worksurl" :key="item">
              <img :src="item" class="projectShow" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { defineComponent, ref, watch, onMounted, reactive ,onBeforeMount} from "vue";
import NavHead from "@/components/NavHead.vue";
import asideMenu from "./components/asideMenu.vue";
import FooterCom from "@/components/FooterCom.vue";
import projKinds from "@/Mock/projKinds.json";
defineComponent({
  name: "WorkView"
});
let visiableTag = ref(false);
let showDialog = ref(null);
let innerHeight = ref("650px");
let nowimgs = ref([]);
let nowinfos = ref([]);
let nowdata = ref({});
let nowtitle = ref("");
const renewTitle = newval => {
  console.log(newval)
  nowtitle.value = newval;
  nowinfos.value = [];
  store.dispatch("works/list", { title: nowtitle.value }).then(res => {
    if (Object.keys(res).length > 0) {
      if(!res || !res.data){
        nowdata.value=[]
        return;
      }
      nowdata.value = res.data;
      for (let item in nowdata.value.infos) {
        nowinfos.value.push({
          projname: nowdata.value.infos[item].projname,
          url: nowdata.value.infos[item].worksurl[0]
        });
      }
    }
  });
};
onBeforeMount(() => {
  document.documentElement.scrollTop = 0;
});
onMounted(async () => {
  innerHeight.value = document.documentElement.clientHeight * 0.86 + "px";
  document.documentElement.scrollTop = 0;
  nowtitle.value = store.state.works.title;
  nowtitle.value = projKinds.kinds[0];
  await store.dispatch("works/list", { title: nowtitle.value }).then(res => {
    nowdata.value = res.data;
    for (let item in nowdata.value.infos) {
      nowinfos.value.push({
        projname: nowdata.value.infos[item].projname,
        url: nowdata.value.infos[item].worksurl[0]
      });
    }
  });
});
watch(visiableTag, () => {
  if (visiableTag.value == true) {
    let rightbtn = document.querySelector(".el-carousel__arrow--left");
  }
});

let showSwiper = projname => {
  nowimgs.value = nowdata.value.infos.find(item => item.projname == projname);
};
</script>

<style lang="scss" scoped>
#container {
  min-height: 100vh;
  margin-top: 80px;
}

@function getWidth($n) {
  @return calc($n * 100vw / 1920px);
}

@function getHeight($n) {
  @return calc($n * 100vh / 1080px);
}

$w: getWidth(1px);
$h: getHeight(1px);

.el-container {
  padding-top: 80 * $h;
  padding-bottom: 200 * $h;
  height: calc(100vh - 80px);
  .el-aside {
    margin-left: 10 * $w;
    border-right: 0;
    width: 338 * $w;
    box-sizing: border-box;
  }

  .el-main {
    padding-left: 75 * $w;

    h2 {
      font-size: 36 * $h;
      margin-bottom: 50 * $h;
    }

    section {
      width: 1350 * $w;
      display: flex;
      flex-wrap: wrap;

      .cards {
        width: 420 * $w;
        height: 288 * $h;
        margin: 0 42 * $w 42 * $w 0;
        background-color: gray;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .cards:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}

div.imgsShow {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 80px;
  display: flex;
  flex-direction: column;
  z-index: 20;

  ul {
    display: flex;
    list-style: none;
    justify-content: flex-end;
    width: 80vw;
    margin: 0 auto;

    li {
      height: 50 * $h;
      width: 50 * $h;
      padding-top: 10 * $h;

      button {
        height: 50 * $h;
        width: 50 * $h;
        border-radius: 50%;
        border: 5px solid gray;
        background-color: rgba(255, 255, 255, 0);
        box-sizing: border-box;
        cursor: pointer;
      }
    }
  }

  .el-carousel {
    margin: 0 auto;
    padding: 0 50 * $w;
    $height: 90vh;
    width: 1.7 * $height;

    .el-carousel__item {
      margin: 0;
      text-align: center;
      position: absolute;
      left: 0;
      top: 0;
    }

    img {
      vertical-align: middle;
      object-fit: scale-down;
      height: 100%;
    }
  }
}

.el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 30 * $w !important;
  height: 30 * $h !important;
  background-color: #fff;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: var(--el-transition-duration);
}
.projectShow {
  height: 50%;
}
</style>
