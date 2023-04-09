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
        <div v-html="
          dataHandle(data)
        "></div>
      </main>
      <div class="comment-view" style="padding:0;">
        <u-comment ref="compref" :key="activKey" :config="config" @submit="submit" @like="like">
          <template #list-title>全部评论</template>
        </u-comment>
      </div>
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
import emoji from "./emoji"
import { UToast, CommentApi, ConfigApi, CommentSubmitParam } from 'undraw-ui'
import remarkApi from "@/api/remarkApi"
import moment from "moment";
import { AxiosRequestConfig } from "axios";
// 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases
// static文件放在public下,引入emoji.ts文件可以移动到自定义位置
interface remarkCommentApi extends CommentApi {
  blogId: string,
  authed: boolean
}
let compref = ref(null)
const config = reactive<ConfigApi>({
  user: {
    id: '1',
    username: 'visitor',
    avatar: 'http://192.168.3.9:3000/staticImg/avater.jpeg',
    likeIds: []
  },
  emoji: emoji,
  comments: []
})
const activKey = () => {
  return String((new Date()).getTime())
}
//获取文件url
function createObjectURL(blob: Blob) {
  if (window.URL) {
    return window.URL.createObjectURL(blob)
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(blob)
  } else {
    return ''
  }
}


let temp_id = 100
// 提交评论事件
const submit = ({ content, parentId, files, finish }: CommentSubmitParam) => {
  /**
   * 上传文件后端返回图片访问地址，格式以', '为分割; 如:  '/static/img/program.gif, /static/img/normal.webp'
   */
  let contentImg = files.map((e: File) => createObjectURL(e)).join(', ')
  let comment: remarkCommentApi = {
    blogId: `${route.query.id}`,
    id: String((temp_id += 1)),
    parentId: parentId,
    authed: false,
    uid: config.user.id,
    address: '来自江苏',
    content: content,
    likes: 0,
    createTime: moment(Number((new Date()).getTime())).format('YYYY-MM-DD HH:mm:ss'),
    contentImg: contentImg,
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: 0,
      homeLink: `#`
    },
    reply: null
  }

  remarkApi.postRemark(comment).then((res: AxiosRequestConfig): void => {
    if (res.data.errcode == "0") {
      remarkApi.getRemark().then((inner) => {
        config.comments = inner.data.list;
      })
    }
    finish()
  })
}

// 删除评论
const remove = (id: number, finish: () => void): void => {
  setTimeout(() => {
    finish()
    alert(`删除成功: ${id}`)
  }, 200)
}

//举报用户
const report = (id: number, finish: () => void): void => {
  setTimeout(() => {
    finish()
    alert(`举报成功: ${id}`)
  }, 200)
}

// 点赞按钮事件
const like = (id: number, finish: () => void): void => {
  setTimeout(() => {
    finish()
  }, 200)
}

config.comments = []
defineComponent({
  name: "BlogDetails"
});
let loading = ref<boolean>(false)
let data = ref<string>("");
let router = useRouter();
let route = useRoute();
let nowblog = ref<object>({});
const dataHandle = (data: string): string => {
  // data.replace('p><p', `p class='passagep'><hr class='passagehr' /><p`).replace('code><p', `code><p class='passagep' /><hr class='passagehr' /><p`)
  let oridata = data;
  oridata = oridata.replace(/<h3/g, '<h3 style="padding:16px 0;"')
  return oridata.replace(/\/pre>/g, `\/pre><p class='passagep' /><hr class='passagehr' />`)
}
// 生命周期钩子函数
onMounted(() => {
  loading.value = true;
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
      loading.value = false;
    });
  remarkApi.getRemark({ blogId: route.query.id }).then((res) => {
    config.comments = res.data.list;
  })
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
  padding: 70px 20px 0 20px;
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

  div.container {
    -webkit-animation: zoom_move_6 0.5s;
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
pre {
  background: rgba(0, 0, 0, 0.7);
  color: #ccc;
  font-size: 16px;
  display: block;
  padding: 10px;
  margin: 10px 0;
}
</style>
