<template>
    <footer class="footer1">
        <p>{{coppy}}<span>{{phone}}</span> </p><br>
        <p>沃民高新科技（北京）股份有限公司、工信部电子科技情报所网络舆情研究中心、中国消费者报联合开发</p>
    </footer>
</template>
<style lang="less">
    @import "OrderFooter.less";
</style>
<script type="text/ecmascript-6">
    import Local from "../../local/local";
    export default{
        data(){

            return{
                coppy:'京ICP备14046778号-5 沃民高新科技（北京）股份有限公司提供技术支持  ',
                phone:'联系电话：010-88315479 '
            }
        }
    }
</script>
