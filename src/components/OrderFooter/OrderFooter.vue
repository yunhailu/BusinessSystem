<template>
    <footer class="footer1">
        <p>{{footer.coppy}}</p><br>
        <p>{{footer.cooperation}}</p>
    </footer>
</template>
<style lang="less" scoped>
    @import "OrderFooter.less";
</style>
<script type="text/ecmascript-6">
    import Local from "../../local/local";
    export default{
        data(){
            const footer = Local().footer;
            return{
                footer,
            }
        }
    }
</script>
