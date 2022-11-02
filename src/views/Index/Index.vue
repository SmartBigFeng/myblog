<template>
  <div>
    <nav-head></nav-head>
    <banner-view></banner-view>
    <gallery-view></gallery-view>
    <index-blog></index-blog>
    <FooterCom></FooterCom>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import NavHead from '@/components/NavHead.vue'
import GalleryView from '@/components/Gallery.vue'
import FooterCom from '@/components/FooterCom.vue'
import IndexBlog from '@/components/IndexBlog.vue'
import BannerView from '@/components/Banner.vue'

defineComponent({
  name: 'IndexView'
})
onMounted(() => {
  document.documentElement.scrollTop = 0
})


</script>

<style lang="scss" scoped>

</style>