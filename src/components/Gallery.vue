<template>
  <div class="container">
    <div class="gallery">
      <section class="showmore">
        <h2>
          我的项目
          <br />My Projects
        </h2>
        <div class="more" @click="clickToWorks('')">
          <p>MORE</p>
          <el-icon style="font-size: 30px; color: lightgray">
            <arrow-right />
          </el-icon>
        </div>
      </section>
      <el-row justify="start">
        <el-col v-for="(item, index) in kinds.kinds" :span="8" :key="index">
          <section @click="clickToWorks(item)">
            <h3>{{ item }}</h3>
            <template v-for="(i, nowindex) in workImg">
              <img v-if="item == i.title" :key="nowindex" :src="i.url" alt />
            </template>
          </section>
        </el-col>
      </el-row>
    </div>
    <el-icon class="ToBlogs" @click="scrollToBlogs">
      <ArrowDown />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import kinds from "@/Mock/projKinds.json";
defineComponent({
  name: "GalleryView"
});

let router = useRouter();
let innerHeight = ref("650px");
let visiableTag = ref(false);
let workImg = [
  { title: "Web开发", url: require("../assets/indexproject/Web开发.jpg") },
  {
    title: "多屏多端开发",
    url: require("../assets/indexproject/多屏多端开发.jpg")
  },
  {
    title: "数据可视化",
    url: require("../assets/indexproject/数据可视化.jpg")
  }
];

watch(visiableTag, () => {});

onMounted(() => {
  innerHeight.value = document.documentElement.clientHeight * 0.86 + "px";
});

let clickToWorks = async (title = "") => {
  await store.dispatch("works/renewtitle", title);
  router.push("/indexproject");
};
const scrollToBlogs = () => {
  const docEle = document.documentElement;
  docEle.scrollTop = docEle.clientHeight * 2 - 80;
};
</script>

<style lang="scss" scoped>
@keyframes scrollProj {
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
.container {
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url("@/assets/IndexBgImg/start.jpg");
    background-attachment: fixed;
    z-index: -1;
    opacity: 0.2;
  }
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
    animation: scrollProj 2s forwards infinite;
  }
}
.gallery {
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  min-height: 800px;
  height: calc(100vh - 80px);
  max-height: 900px;

  .showmore {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 30px;
    justify-content: center;

    & > p {
      margin: 0 auto;
      line-height: 30px;
    }

    & > h2 {
      width: 100%;
      text-align: center;
      font-size: 28px;
      line-height: 50px;
      font-weight: 500;
      padding: 10px 0;
    }

    div.more {
      font-size: 18px;
      font-weight: bold;
      color: lightgray;
      max-width: 100;
      display: flex;
      justify-content: flex-end;
      align-self: flex-end;
      min-height: 30px;
      padding: 20px;
      cursor: pointer;

      & > p {
        line-height: 30px;
      }

      & > el-icon {
        height: 30px;
        line-height: 30px;
        font-size: 30px !important;
      }
    }
  }

  // &>h2,
  & > h3 {
    width: 100%;
    text-align: center;
    font-size: 32px;
  }

  & > h3 {
    margin-bottom: 50px;
    border-bottom: 0;
  }

  .el-row {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 20px;
    perspective: 3000px;

    section {
      margin: 0 auto;
      width: 365px;
      height: 380px;
      margin-bottom: 30px;
      overflow: hidden;
      border-radius: 15px;
      position: relative;
      box-shadow: 5px 6px 15px -5px rgba(0, 0, 0, 0.26);
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        transform: scale(1.03);
      }

      h3 {
        width: 100%;
        height: 50px;
        font-size: 22px;
        line-height: 50px;
        text-indent: 16px;
        position: absolute;
        font-weight: 500;
        color: #fff;
        //  background-color: yellow;
      }

      & > img {
        width: 100%;
      }

      .mask {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        transition: 0.5s;
        width: 380px;
        height: 100%;
        text-align: center;
        border-top: 0;
        $imgsize: 40%;
        opacity: 0;

        & > img {
          height: $imgsize;
          width: $imgsize;
          margin-top: 100px;
        }

        & > p {
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }

        &:hover {
          background: rgb(255, 255, 255);
          opacity: 0.4;
        }
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
  top: 0;
  display: flex;
  flex-direction: column;

  ul {
    display: flex;
    list-style: none;
    justify-content: flex-end;
    width: 80vw;
    margin: 0 auto;

    li {
      height: 50px;
      width: 50px;
      padding-top: 10px;

      button {
        height: 50px;
        width: 50px;
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
    padding: 0 50px;
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
      // cover contain none scale-down
      height: 100%;
    }
  }
}

.el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 30px !important;
  height: 30px !important;
  background-color: #fff;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: var(--el-transition-duration);
}
</style>
