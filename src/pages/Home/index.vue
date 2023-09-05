<template>
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav></TypeNav>
        <List/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floor in floorList" :key="floor.key" :list="floor"/>
    </div>
</template>
<script>
import List from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import { mapState } from 'vuex'
export default {
    name:'HomeI',
    components:{List,Recommend,Rank,Like,Floor},
    data() {
        return {}
    },
    mounted(){
        this.$store.dispatch('getFloorList')
        this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({floorList:state=>state.home.floorList}),
    }
}
</script>
<style></style>