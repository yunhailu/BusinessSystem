<template>
    <!--<nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
        <div class="container">
            <p>{{footer.coppy}}</p><br>
            <p>{{footer.cooperation}}</p>
        </div>
    </nav>-->
    <footer class="footer">
        <p>{{footer.coppy}}</p>
        <p>{{footer.cooperation}}</p>
    </footer>
</template>
<style lang="less">
    @import "Footer.less";
</style>
<script type="text/ecmascript-6">
    import Local from "../../local/local";
    export default{
        data(){
            const footer=Local().footer;
            return{
                footer
                /*coppy:'京ICP备14046778号-5 沃民高新科技（北京）股份有限公司提供技术支持  ',
                phone:'联系电话：010-88315473 '*/
            }
        }
    }
</script>
