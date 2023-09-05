<template>
    <div class="swiper-container" id="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" :key="item.id">
                <!-- <img :src="require('./images/' + item.imgUrl)" /> -->
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
    
<script>
import Swiper from 'swiper'
export default {
    name: 'CarouselTil',
    props: ['list'],
    data() {
        return {}
    },
    watch: {
        list: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    new Swiper('.swiper-container', {
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true, //分页器点击切换
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })
            }

        }
    },
    
}

</script>
    
<style></style>