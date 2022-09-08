<template >
  <router-link v-for="item in state.coverInfo" :to="'/blogdetails/' + item._id">
    <div class="blogbox">
      <span class="genre-type">{{ item.kinds }}</span>
      <div class="img-box">
        <img :src="item.infos.fileurl" />
      </div>
      <span
        :class="item.infos.compos == '原创' ? 'genre-original' : 'genre-retransmit'"
      >{{ item.infos.compos }}</span>
      <h5>{{ item.infos.blogtitle }}</h5>
      <p>{{ item.infos.posttime }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
let state = defineProps({
  coverInfo: {
    type: Array
  }
});
</script>

<style lang="scss" scoped>
.blogbox {
  box-sizing: border-box;
  position: relative;
  float: left;
  margin-top: 40px;
  margin-right: 50px;
  padding: 12px;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > .img-box img {
    transition: all 0.5s;
  }

  &:hover .img-box img {
    transform: scale(1.05);
  }

  .img-box {
    width: 323px;
    height: 323px;
    border-radius: 6px;
    overflow: hidden;

    img {
      display: inline-block;
      height: 100%;
    }
  }

  .genre-type {
    z-index: 10;
    position: absolute;
    top: 24px;
    left: 24px;
    display: inline-block;
    padding: 8px 14px;
    background-color: #e6e6e6;
    border-radius: 4px;
    color: #000;
    font-size: 20px;
    font-weight: 700;
  }

  .genre-retransmit {
    width: 60px;
    text-align: center;
    margin: 10px 0px;
    border-radius: 6px;
    color: #000;
    font-size: 18px;
    background-color: #c7ecfc;
  }

  .genre-original {
    width: 60px;
    text-align: center;
    margin: 10px 0px;
    border-radius: 6px;
    color: #000;
    font-size: 18px;
    background-color: #f7c7cc;
  }

  h5 {
    margin-top: 20px;
    height: 40px;
    font-size: 28px;
    color: #5f5f5f;
  }

  p {
    margin-top: 28px;
    margin-bottom: 20px;
    font-size: 16px;
    color: #5f5f5f;
  }
}
</style>