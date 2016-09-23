<template>
    <header-component active="setting"></header-component>
    <menu-component></menu-component>
    <div class="setting-panel">
        <div class="setting-panel-wrap">
            <div class="setting-panel-wrap-title">
                <i class="fa fa-gear"></i> {{words.title}}
                <span class="title-dec">{{words.titleDec}}</span>
            </div>
            <div class="setting-panel-wrap-default" v-show="!activeItem">
                <div class="setting-panel-wrap-default-introduction">
                    <h4><i class="fa fa-puzzle-piece"></i> {{words.introTitle}}</h4>
                    <div class="intro">{{words.intro}}</div>
                </div>
                <div class="row">
                    <div class="col-md-4" v-for="box in boxes">
                        <small-box :option="box"></small-box>
                    </div>
                </div>
            </div>
            <div class="setting-panel-wrap-add" v-show="activeItem">

            </div>
            <div class="setting-panel-wrap-edit" v-show="activeItem">

            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Setting.less";
</style>
<script  type="text/ecmascript-6">
    import HeaderComponent from '../Header/Header.vue';
    import MenuComponent from './Menu/Menu.vue';
    import SmallBox from '../Common/SmallBox/SmallBox.vue';
    import Local from "../../local/local";

    export default{
        data(){
            const words = Local().setting;
            return{
                words,
                name:'Setting',
                activeItem: false,
                boxes: [{
                    title: "Add",
                    icon: "fa-plus",
                    theme: "bg-aqua",
                    dec: "Add your Topic"
                },{
                    title: "Edit",
                    icon: "fa-edit",
                    theme: "bg-yellow",
                    dec: "Edit your Topic"
                },{
                    title: "Delete",
                    icon: "fa-close",
                    theme: "bg-red",
                    dec: "Delete your Topic"
                }]
            }
        },
        components:{
            HeaderComponent,
            MenuComponent,
            SmallBox
        }
    }
</script>
