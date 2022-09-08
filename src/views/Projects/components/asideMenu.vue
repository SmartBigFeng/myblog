<template>
  <el-aside>
    <ul>
      <li class="card-btn" v-for="item in kinds.kinds" :key="item" @click="renew(item)">{{ item }}</li>
    </ul>
  </el-aside>
</template>

<script setup lang="ts">
import kinds from "@/Mock/projKinds.json";
const emits = defineEmits(["renewTitle"]);
const props = defineProps({
  nowtitle: {
    type: String
  }
});
const renew = item => {
  if (props.nowtitle == item) {
    return;
  } else {
    console.log(item);
    emits("renewTitle", item);
  }
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
ul {
  list-style: none;
  padding: 0;

  li {
    box-sizing: content-box;
    margin: 25 * $h 25 * $w !important;
    height: 132 * $h;
    line-height: 132 * $h;
    text-align: center;
    font-weight: bold;
    font-size: 26 * $h;
    color: white;

    background: #fa9779;
    background: -webkit-linear-gradient(to top, #feb47b, #fa9779);
    background: linear-gradient(to top, #feb47b, #fa9779);
    box-shadow: 5px 6px 15px -5px rgba(0, 0, 0, 0.26);
    border-radius: 15px;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
    }
  }
}
</style>
