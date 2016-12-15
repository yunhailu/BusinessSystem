<template>
    <div class="tips">
        <!--<i class="fa fa-angle-up fa-2x" aria-hidden="true"></i>-->
        <div class="content">{{title}}</div>
    </div>
</template>
<style lang="less" scoped>
@import "SmallTip.less";
</style>
<script type="text/ecmascript-6">
    export default {
        props: ["title"],
       data(){
           return {

           }
       }
    }
</script>