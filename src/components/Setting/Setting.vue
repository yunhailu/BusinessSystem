<template>
    <header-component active="setting"></header-component>
    <div class="divSetBox">
        <menu-component></menu-component>
        <div class="setting-panel">
            <div class="setting-panel-wrap">
                <div class="setting-panel-wrap-title">
                    <i class="fa fa-gear"></i> {{words.title}}
                    <span class="title-dec">{{words.titleDec}}</span>
                </div>
                <router-view></router-view>
                <div class="setting-panel-wrap-add" v-show="activeItem">

                </div>
                <div class="setting-panel-wrap-edit" v-show="activeItem">

                </div>

            </div>
        </div>
    </div>
    <footer-component></footer-component>
</template>
<style lang="less" scoped>
    @import "Setting.less";
</style>
<script  type="text/ecmascript-6">
    import HeaderComponent from '../Header/Header.vue';
    import MenuComponent from './Menu/Menu.vue';
    import Local from "../../local/local";
    import FooterComponent from '../OrderFooter/OrderFooter.vue';

    export default{
        data(){
            const words = Local().setting;
            return{
                words,
                name:'Setting',
                activeItem: false
            }
        },
        components:{
            HeaderComponent,
            MenuComponent,
            FooterComponent
        }
    }
</script>
