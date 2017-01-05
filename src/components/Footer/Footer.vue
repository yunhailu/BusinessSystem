<template>
    <footer class="footer">
        <p>{{footer.coppy}}</p>
        <p>{{footer.cooperation}}</p>
    </footer>
</template>
<style lang="less" scoped>
    @import "Footer.less";
</style>
<script type="text/ecmascript-6">
    import Local from "../../local/local";
    export default{
        data(){
            const footer=Local().footer;
            return{
                footer
            }
        }
    }
</script>
