<template>
    <footer class="footer"> <p>{{coppy}}<span>{{phone}}</span> </p></footer>
</template>
<style lang="less">
    @import "Footer.less";
</style>
<script type="text/ecmascript-6">
    import Local from "../../local/local";
    export default{
        data(){

            return{
                coppy:'京ICP备14046778号-5 沃民高新科技（北京）股份有限公司提供技术支持  ',
                phone:'联系电话：010-88315473 '
            }
        }
    }
</script>
