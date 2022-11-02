<template >
  <router-link v-for="item in state.coverInfo" :to="'/blogdetails/?id=' + item._id" :key="item.id">
    <div class="blogbox">
      <div class="img-box">
        <img :src="item.infos.fileurl" />
      </div>
      <div class="content">
        <h5 class="titlestyle">{{ item.infos.blogtitle }}</h5>
        <p class="introduce">{{ item.infos.intro }}</p>
        <div class="desinfos">
          <span class="posttime">{{ item.infos.posttime }} </span>
          <span class="genre-type">{{ item.kinds }}</span>
          <span :class="item.infos.compos == '原创' ? 'genre-original' : 'genre-retransmit'">{{ item.infos.compos
          }}</span>
        </div>
      </div>
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
  width: 510px;
  margin-top: 40px;
  margin-right: 50px;
  padding: 12px 0 12px 12px;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.26);
  cursor: pointer;
  display: flex;
  text-decoration: none;
  .img-box {
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    img {
        transition: all 1s;
        display: inline-block;
        width: 140px;
        height: 140px;
      }
    }

  .content {
    padding: 0 12px 0 16px;
    max-width:300px;
    .titlestyle {
      font-size: 24px;
      padding:8px 0;
      color: #000;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .introduce {
      height:65px;
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color:#666;
    }
    .desinfos{
      display: flex;
      height:30px;
      width:300px;
      align-items: center;
      justify-content: space-between;
      &>span{
        padding-left: 16px;
        position: relative;
        &::before{
          content:'';
          display:block;
          width:4px;
          height:4px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.26);
          position: absolute;
          top:calc(50% - 2px);
          left:6px;
        }
      }
      .posttime{
        color:#000;
      }
      .genre-type {
          display: inline-block;
          background-color: #e6e6e6;
          border-radius: 4px;
          color: #000;
          font-size: 16px;
          font-weight: 700;
          padding:2px 4px 2px 16px;
        }
    }
  }

 

  .genre-retransmit {
    display: inline-block;
    padding:2px 4px 2px 16px;
    text-align: center;
    border-radius: 6px;
    color: #000;
    font-size: 16px;
    font-weight: 700;
    background-color: #c7ecfc;
  }

  .genre-original {
    display: inline-block;
    padding:2px 4px 2px 16px;
    text-align: center;
    border-radius: 6px;
    color: #000;
    font-size: 16px;
    font-weight: 700;
    background-color: #f7c7cc;
  }

}

.el-empty {
  margin-top: 100px;
}
</style>