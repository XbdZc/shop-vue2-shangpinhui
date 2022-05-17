<template>
  <div class="pagination">
    <!--如果是第一页不能点上一页    -->
    <button :disabled="pageNo==1" @click="putPageNo(pageNo-1)">上一页</button>
    <button v-show="startNumAndEndNum.startNum>1" @click="putPageNo(1)" :class="{active:pageNo==1}">1</button>
    <button v-show="startNumAndEndNum.startNum>1">···</button>
    <!-- 中间部分  -->
    <button v-for="(page,index) in startNumAndEndNum.endNum"
            :key="index"
            v-show="page>=startNumAndEndNum.startNum"
            @click="putPageNo(page)" :class="{active:pageNo==page}">
      {{ page }}
    </button>
    <button v-show="startNumAndEndNum.endNum<getTotalPage-1">···</button>
    <button v-show="startNumAndEndNum.endNum<getTotalPage" @click="putPageNo(getTotalPage)"  :class="{active:pageNo==getTotalPage}">
      {{ getTotalPage }}
    </button>
    <button :disabled="pageNo==getTotalPage" @click="putPageNo(pageNo+1)">下一页</button>
    <button style="margin-left: 15px">
      第<input type="text" style="width: 20px" ref="inputNo" :value="pageNo" @blur="searchByPageNo($event.target.value)">页
    </button>
    <button style="margin-left: 20px">共{{total}}条</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props:['pageNo','pageSize','total','continues'],
  computed:{
    getTotalPage(){
      //向上取整
      return  Math.ceil(this.total/this.pageSize);
    },
    startNumAndEndNum(){
      const {continues,getTotalPage,pageNo} = this;
      let startNum = 0,endNum = 0;
      //如果当前页码数小于连续数就取基本
      if (getTotalPage<=continues){
        startNum = 1;
        endNum = getTotalPage;
      }else{
        startNum = pageNo-parseInt(continues/2)
        endNum = pageNo+parseInt(continues/2)
      }
      if (startNum<1){//起始页数不能小于1
        startNum = 1;
        endNum = continues
      }
      if (endNum>getTotalPage){//结束页数不能大于最大页数
        endNum = getTotalPage;
        startNum = endNum-continues+1
      }
      return {startNum,endNum}
    }
  },
  methods:{
    putPageNo(no){
      this.$emit('getPageNo',no)
    },
    searchByPageNo(value){//按页数搜索
      let pageNo = parseInt(value.replace(/ /g,''));//去除所有空格
      if (pageNo<1 || pageNo>this.getTotalPage){
        this.$refs.inputNo.value=''
        alert(`请输入1~${this.getTotalPage}的数字!!!`);
        return
      }
      this.putPageNo(pageNo);
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
