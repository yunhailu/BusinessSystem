<template>
    <header-component active="instruction"></header-component>
    <div class="instruction-wrap">
        <img class="image" src="../../../../images/userInstruction.jpg">
    </div>
</template>

<style lang="less">
    @import "InstructionsForUse.less";
</style>

<script type="text/ecmascript-6">
    import HeaderComponent from '../../Header/Header.vue';
    function stop(){
        return false;
    }
    window.document.oncontextmenu=stop;
    export default{
        data(){
            return {
                isShow:'wode'
            }
        },
        components:{HeaderComponent}

    }
</script>