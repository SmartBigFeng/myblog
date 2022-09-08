<template>
    <div class="imgsShow" v-show="visiableTag" ref="showDialog">
        <ul>
            <li><button>放大</button></li>
            <li><button>切换</button></li>
            <li><button @click="visiableTag = false">关闭</button></li>
        </ul>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="http://image.woshipm.com/wp-files/2022/05/WT1uP1rpUhMfliOz6VQN.jpg!/both/623x336" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="http://image.woshipm.com/wp-files/2022/05/4mH0ItZ106YuZ2HrxtOX.jpg!/both/623x336" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="http://image.woshipm.com/wp-files/2022/05/MgXhWYsKQkU0puMhHEcG.jpg!/both/623x336" alt="">
                </div>
            </div>
            <!-- 左右按钮 -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <!-- 小圆点-->
            <div class="swiper-pagination"></div>
        </div>
        <p class="describe">
            这里是我的作品描述
        </p>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, defineProps, ref, watch } from 'vue'
import Swiper from 'swiper'
defineComponent({
    name: 'SwiperCom'
})
let state = defineProps({
    visiableTag: {
        type: Boolean
    }
})
let swiperCon = ref(null)

onMounted(() => {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
            cirular: true
        },
        /*clickable :true,点击分页器的指示点分页器会控制Swiper切换。 */
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
})
defineComponent({
    name: 'GalleryView'
})
let visiableTag = ref(false);
let showDialog = ref(null);
watch(state, () => {
    console.log(state.visiableTag)
    showDialog.value.style.top = document.documentElement.scrollTop + 'px'
    document.onscroll = () => {
        showDialog.value.style.top = document.documentElement.scrollTop + 'px'
    }
})

</script>

<style lang="scss" scoped>
div.imgsShow {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    top: 0;

    ul {
        display: flex;
        list-style: none;
        justify-content: end;
        width: 90%;
        margin: 0 auto;

        li {
            height: 60px;
            width: 100px;

            button {
                height: 100%;
                width: 100%;
            }
        }
    }

    .swiper-container {
        flex: 1;
        width: 90%;
        display: flex;
        justify-content: center;

        .swiper-slide {
            width: 1200px !important;
            width: 800px;
            background-color: red;
            ;
            img{
                width: 90%;
            }
        }
    }

    .swiper-button-prev {
        height: 5%;
        width: 5%;
        position: absolute;
        left: 0;
        top: 47.5%;
    }

    .swiper-button-next {
        height: 5%;
        width: 5%;
        position: absolute;
        right: 0;
        top: 47.5%;
    }

    .describe {
        height: 80px;
        line-height: 80px;
        padding: 0 5%;
    }
}
</style>