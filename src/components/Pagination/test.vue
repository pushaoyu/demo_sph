<template>
    <div class="pagination">
        
        <button>上一页</button>
        <button v-if="startNumAndEndNum.start >1">1</button>
        <button v-if="startNumAndEndNum.start >2">···</button>

        <!-- 中间部分 -->
        <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>startNumAndEndNum.start">{{ page }}</button>

        <button>···</button>
        <button v-if="startNumAndEndNum.end<totalPage">{{ totalPage }}</button>
        <button v-if="startNumAndEndNum.end<totalPage-1">下一页</button>

        <button style="margin-left: 30px">共 {{ totalPage }} 页</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],

    computed: {
        //计算总页数
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },

        startNumAndEndNum() {
            let { totalPage, continues, pageNo } = this
            let start = 0
            let end = 0
            if (continues > totalPage) { //不正常情况
                start = 1
                end = totalPage
            } else {
                start = pageNo - parseInt(continues / 2)
                end = pageNo + parseInt(continues / 2)
                if (start < 1) {
                    start = 1
                    end = continues
                }
                if (end > totalPage) {
                    end = totalPage
                    start = pageNo - continues + 1
                }
            }
            return {start,end}
        }
    }
}
</script>
  
<style lang="less" scoped>
.pagination {
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
  