<template>
  <div id="banner">
    <div class="effect">
      <div class="box">
        <ul class="minbox">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ol class="maxbox">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
      </div>
    </div>
    <el-icon class="ToProject" @click="scrollToProj">
      <ArrowDown />
    </el-icon>
  </div>
</template>
<script setup>
import { defineComponent, onMounted, ref } from "vue";
defineComponent({
  name: "BannerView"
});
const scrollToProj = () => {
  const docEle = document.documentElement;
  docEle.scrollTop = docEle.clientHeight - 80;
};
</script>

<style lang="scss" scoped>
@function getWidth($n) {
  @return calc($n * 100vw / 1920px);
}

@function getHeight($n) {
  @return calc($n * 100vh / 1080px);
}

$w: getWidth(1px);
$h: getHeight(1px);
@keyframes scrollProj {
  50% {
    transform: scale(1.2);
    background: rgba($color: #e87944, $alpha: 0.5);
    font-size: 32px;
  }
  100% {
    transform: scale(1);
    background: rgba($color: #000000, $alpha: 0);
    font-size: 24px;
  }
}
#banner {
  width: 100%;
  height: calc(100vh - 80px);
  background: url("@/assets/back.jpg") no-repeat;
  background-attachment: fixed;
  overflow: hidden;
  background-size: 100% 100%;
  margin-top: 80px;
  position: relative;
  box-shadow: 0 3px 10px #6dd5ed;
  .ToProject {
    display: block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px #fff;
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

.effect {
  -webkit-perspective: 800px;
  width: 800px;
  height: 700px;
  float: right;
  position: relative;
}

li {
  list-style: none;
}

.box {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 250px auto;
  margin-top: 300px;
  -webkit-transform-style: preserve-3d;
  -webkit-transform: rotateX(-45deg);
  -webkit-animation: move 5s linear infinite;
}

.minbox {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50px;
  top: 50px;
  -webkit-transform-style: preserve-3d;
}

.minbox li {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

.minbox li:nth-child(1) {
  background: url("../../public/img/React.jpg") no-repeat 0 0;
  -webkit-transform: translateZ(50px);
}

.minbox li:nth-child(2) {
  background: url("../../public/img/Vuejs.jpg") no-repeat 0 0;
  -webkit-transform: rotateX(180deg) rotateZ(180deg) translateZ(50px);
}

.minbox li:nth-child(4) {
  background: url("../../public/img/JS.png") no-repeat 0 0;
  -webkit-transform: rotateX(90deg) translateZ(50px);
}

.minbox li:nth-child(5) {
  background: url("../../public/img/H5.png") no-repeat 0 0;
  -webkit-transform: rotateY(-90deg) translateZ(50px);
}

.minbox li:nth-child(6) {
  background: url("../../public/img/css3.png") no-repeat 0 0;
  -webkit-transform: rotateY(90deg) translateZ(50px);
}

.maxbox {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
}

.maxbox li {
  width: 200px;
  height: 200px;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.2;
  -webkit-transition: all 1s ease;
}

.maxbox li:nth-child(1) {
  -webkit-transform: translateZ(100px);
}

.maxbox li:nth-child(2) {
  -webkit-transform: rotateX(180deg) translateZ(100px);
}

.maxbox li:nth-child(3) {
  -webkit-transform: rotateX(-90deg) translateZ(100px);
}

.maxbox li:nth-child(4) {
  -webkit-transform: rotateX(90deg) translateZ(100px);
}

.maxbox li:nth-child(5) {
  -webkit-transform: rotateY(-90deg) translateZ(100px);
}

.maxbox li:nth-child(6) {
  -webkit-transform: rotateY(90deg) translateZ(100px);
}

.box:hover ol li:nth-child(1) {
  -webkit-transform: translateZ(200px);
}

.box:hover ol li:nth-child(2) {
  -webkit-transform: rotateX(180deg) translateZ(200px);
}

.box:hover ol li:nth-child(3) {
  -webkit-transform: rotateX(-90deg) translateZ(200px);
}

.box:hover ol li:nth-child(4) {
  -webkit-transform: rotateX(90deg) translateZ(200px);
}

.box:hover ol li:nth-child(5) {
  -webkit-transform: rotateY(-90deg) translateZ(200px);
}

.box:hover ol li:nth-child(6) {
  -webkit-transform: rotateY(90deg) translateZ(200px);
}

@keyframes move {
  0% {
    -webkit-transform: rotateX(-45deg) rotateY(0deg);
  }

  100% {
    -webkit-transform: rotateX(-45deg) rotateY(360deg);
  }
}
</style>