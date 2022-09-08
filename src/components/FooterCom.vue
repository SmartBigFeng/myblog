<template>
  <footer>
    <section>
      <h4>Get In Touch</h4>
      <h2>Let's work together</h2>
      <p>
        If you are interested in my work experience, please
        <span
          @click="postToNew(`https://mail.163.com/`)"
        >contact me</span>.
      </p>
      <figure>
        <figcaption>
          <img src="@/assets/FooterCom/headimg.jpg" />
        </figcaption>
        <span @click="postToNew(`https://mail.163.com/`)">Email Address</span>
      </figure>
      <div class="websites">
        <nav class="inner" aria-label="weibo">
          <span @click="postToNew(`https://juejin.cn/`)">
            <img src="@/assets/FooterCom/掘金.jpg" class="innerImg" />
            <p class="innerTitle">掘金</p>
          </span>
        </nav>
        <nav class="inner" aria-label="weibo">
          <span @click="postToNew(`https://stackoverflow.com/`)">
            <img src="@/assets/FooterCom/stackoverflow.jpg" class="innerImg" />
            <p class="innerTitle">SO</p>
          </span>
        </nav>
        <nav class="inner" aria-label="weibo">
          <span @click="postToNew(`https://www.csdn.net/`)">
            <img src="@/assets/FooterCom/csdn.jpg" class="innerImg" />
            <p class="innerTitle">CSDN</p>
          </span>
        </nav>
        <nav class="inner" aria-label="weibo">
          <span @click="postToNew(`https://www.jianshu.com/`)">
            <img src="@/assets/FooterCom/简书.jpg" class="innerImg" />
            <p class="innerTitle">简书</p>
          </span>
        </nav>
      </div>
      <p class="footwords">&copy;2022 AlI rights reserved. - Designed & Coded by lalala</p>
    </section>
  </footer>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
defineComponent({
  name: "FooterCom"
});
const postToNew = (newurl: string) => {
  window.open(newurl);
};
</script>

<style lang="scss" scoped>
footer {
  height: calc(100vh - 80px);
  background: #25272b;
  padding-top: 98px;
  box-sizing: border-box;
  width: 100%;
  // background: url("@/assets/IndexBgImg/end.jpg") no-repeat center center;
  // background-attachment: fixed;
  // overflow: hidden;
  section {
    width: 1200px;
    min-height: 100px;
    margin: 0 auto;
    text-align: center;

    & > h4 {
      font-size: 32px;
      color: white;
    }

    & > h2 {
      font-size: 46px;
      color: white;
      font-family: "proxima-nova", sans-serif;
      margin-bottom: 20px;
      letter-spacing: 5px;
    }

    & > p {
      color: white;
      max-width: 700px;
      font-size: 20px;
      margin: 0 auto;

      & > span {
        text-decoration: none;
        text-decoration: underline;
        color: #fff;
        cursor:pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    p.footwords {
      color: #b2b2b2;
      font-size: 16px;
    }

    figure {
      justify-content: center;
      padding: 70px 0 65px 0;
      display: flex;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      $innerHeigh: 70px;

      img {
        width: $innerHeigh;
        height: $innerHeigh;
        border-radius: 50%;
      }

      span {
        display: block;
        cursor: pointer;
        text-decoration: none;
        height: 50px;
        line-height: 50px;
        width: 350px;
        background-color: #25272b;
        margin-left: 20px;
        transition: 0.5s;
        border-radius: 10px;
        border: 2px solid #fff;
        font-size: 26px;
        color: #fff;

        &:hover {
          color: #aaa;
        }
      }
    }

    .websites {
      display: flex;
      justify-content: center;
      margin-bottom: 75px;

      .inner {
        margin: 0 20px;

        span {
          text-decoration: none;
          cursor: pointer;
        }

        .innerImg {
          width: 56px;
          height: 56px;
          border-radius: 50%;
        }

        .innerTitle {
          padding: 5px 0;
          color: white;
        }
      }
    }
  }
}
</style>
