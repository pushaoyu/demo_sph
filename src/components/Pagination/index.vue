<template>
    <div class="pagination">
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>

        <button :class="{active:pageNo==page}" @click="$emit('getPageNo',page)" v-for="(page, index) in startNumAndEndNum.end" v-if="page >= startNumAndEndNum.start">{{ page }}</button>

        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button :class="{active:pageNo == totalPage}" @click="$emit('getPageNo',totalPage)" v-if="startNumAndEndNum.end < totalPage">{{ totalPage }}</button>
        <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo == totalPage">下一页</button>

        <button style="margin-left: 30px">共{{ totalPage }}页</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],

    computed: {
        // 计算总页数
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },

        // 计算出连续的页码的起始数字与结束数字
        startNumAndEndNum() {
            let { continues, totalPage, pageNo } = this
            // 定义两个变量存储起始数字与结束数字
            let start = 0
            let end = 0
            if (continues > totalPage) { // 不正常现象 总页数没有连续页码多
                start = 1
                end = totalPage
            } else { // 正常现象
                start = pageNo - parseInt(continues / 2)
                end = pageNo + parseInt(continues / 2)
                if (start < 1) { //比如当前在第1页第2页
                    start = 1
                    end = continues
                }
                if (end > totalPage) {
                    start = pageNo - continues + 1
                    end = totalPage
                }
            }
            return { start, end }
        }
    }
}
</script>
  
<style lang="less" scoped>
.active{
    background-color: skyblue;
}
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
  