<template>
  <div class="indexblog">
    <section>
      <h2 class="title">My Blogs</h2>
      <p class="title">
        在这里我会分享一些关于工作和生活,以及我感兴趣的一些内容
      </p>
      <div class="more" @click="router.push('/indexblogs')">
        <p>MORE</p>
        <el-icon style="font-size: 30px; color: lightgray">
          <arrow-right />
        </el-icon>
      </div>
    </section>
    <div id="blog-wraper" v-if="blogItems.length">
      <div class="cards" v-for="item in blogItems" :key="item._id" @click="handelView(item._id)">
        <h3>{{ item.kinds }}</h3>
        <span>{{ item.infos.posttime }}</span>
        <figure>
          <figcaption>
            <h2>{{ item.infos.blogtitle }}</h2>
            <p v-if="item.infos.intro?.length < 20" class="passage" show-after="200">{{ item.infos.intro }}</p>
            <el-tooltip v-else placement="right" popper-class="popcontent">
              <template #content>
                  {{ item.infos.intro }}
              </template>
              <p class="passage">{{ item.infos.intro }}</p>
            </el-tooltip>
          </figcaption>
        </figure>
      </div>
    </div>
    <template v-else>
      <el-empty description="当前分类暂无项目" />
    </template>
    <el-icon class="ToFooter" @click="scrollToFooter">
      <ArrowDown />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
defineComponent({
  name: "IndexBlog",
});
let router = useRouter();
let leftBlogs = ref([]);
let rightBlogs = ref([]);
let blogItems = computed(() => {
  return store.state.blogs.allBlogs.slice(0,8);
});
onMounted(async () => {
  if (store.state.blogs.allBlogs.length == 0) {
    await store.dispatch("blogs/getAllBlogs");
  }
});
let handelView = (_id: string) => {
  router.push({path:'/blogdetails',query:{id:_id}})
};
const scrollToFooter = () => {
  const docEle = document.documentElement;
  docEle.scrollTop = docEle.clientHeight * 3 - 80;
};
</script>

<style lang="scss" scoped>
h2.title,
p.title {
  margin: 0 auto;
  width: 1200px;
  text-align: center;
}

@mixin frame {
  border-radius: 10px;
  box-shadow: 1px 1px 8px 0px #ebebeb;
}

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

.indexblog {
  padding-top: 80px;
  min-height: 800px;
  height: calc(100vh - 80px);
  max-height: 900px;
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: url("@/assets/IndexBgImg/end.jpg");
    background-attachment: fixed;
    z-index: -1;
    opacity: 0.6;
  }

  .ToFooter {
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

section {
  width: 1200px;
  margin: 0 auto;
  height: 150px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;

  &>p {
    margin: 0 auto;
    line-height: 40px;
    text-justify: distribute;
  }

  &>h2 {
    line-height: 60px;
    font-size: 28px;
    font-weight: 500;
  }

  &>h3 {
    width: 100%;
    text-align: center;
    font-size: 22px;
    padding: 10px 0;
  }

  &>h3 {
    border-bottom: 0;
  }

  div.more {
    font-size: 18px;
    font-weight: bold;
    color: lightgray;
    max-width: 100;
    align-self: flex-end;
    display: flex;
    justify-content: flex-end;
    height: 30px;
    padding: 10px;
    cursor: pointer;

    &>p {
      line-height: 30px;
    }

    &>el-icon {
      height: 30px;
      line-height: 30px;
      font-size: 30px !important;
    }
  }
}

#blog-wraper {
  width: 1200px;
  min-width: 200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-height: 600px;
  flex-wrap: wrap;

  div.cards {
    box-sizing: border-box;
    padding: 0 10px;
    height: 270px;
    line-height: 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    width: 290px;
    cursor: pointer;
    transition: all 0.5s;
    cursor: pointer;
    background-color: rgba($color: #fff, $alpha: 0.5);

    &:hover {
      transform: scale(1.03);
      box-shadow: 8px 8px 25px -5px rgba(0, 255, 255, 0.30);
    }

    h3 {
      font-size: 20px;
      color: rgba($color: #000000, $alpha: 0.5);
      font-weight: 500;
      padding-top: 10px;
      width: 100%;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 8px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      transition:all 0.5s;

      span {
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        vertical-align: bottom;
      }
    }

    figure {
      flex: 1;
      display: flex;
      flex-direction: row;

      .img-box {
        margin-right: 30px;
        margin-top: 10px;
        height: 150px;
        width: 150px;
        overflow: hidden;
        background-color: rgba($color: #000000, $alpha: 0);
      }

      img {
        height: 150px;
        width: 150px;
      }

      figcaption {
        flex: 1;
        display: flex;
        height: 170px;
        flex-direction: column;

        h2 {
          margin-top: 8px;
          margin-bottom: 10px;
          height: 60px;
        }

        p {
          flex: 1;
          margin: 0;
          resize: none;
          word-wrap: break-word;
          word-break: break-all;
          white-space: pre-wrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

      }
    }
  }
}

.el-empty {
  padding-top: 0;
}
</style>
<style>
  .popcontent{
    width:280px;
    font-size: 20px;
  }
</style>