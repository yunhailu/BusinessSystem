<template>
    <header-component active="analytics"></header-component>
    <menu-component></menu-component>
    <div class="main-panel-wrap">
        <!--<router-view></router-view>-->
    </div>
</template>
<style lang="less">
    @import "Analytics.less";
</style>
<script  type="text/ecmascript-6">
    import HeaderComponent from '../Header/Header.vue';
    import MenuComponent from './Menu/Menu.vue';
    import Local from "../../local/local";

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'header-component': HeaderComponent,
            'menu-component': MenuComponent
        },
        route: {
            data(){

            }
        }
    }
</script>
