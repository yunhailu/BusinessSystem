<template>
    <div class="setting-default" v-show="!activeItem">
        <div class="setting-default-introduction">
            <h4><i class="fa fa-puzzle-piece"></i> {{words.introTitle}}</h4>
            <div class="intro">{{words.intro}}</div>
        </div>
        <div class="row">
            <div class="col-md-4" v-for="box in boxes">
                <a v-link="box.link">
                    <small-box :option="box"></small-box>
                </a>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Default.less";
</style>
<script type="text/ecmascript-6">
    import SmallBox from '../../Common/SmallBox/SmallBox.vue';
    import Local from "../../../local/local";

    export default{
        data(){
            const words = Local().setting;
            return{
                words,
                boxes: [{
                    title: "添加",
                    icon: "fa-plus",
                    theme: "bg-aqua",
                    dec: "添加您的主题",
                    link: {name: "settingAdd"}
                },{
                    title: "编辑",
                    icon: "fa-edit",
                    theme: "bg-yellow",
                    dec: "编辑您的主题",
                    link: ""
                },{
                    title: "删除",
                    icon: "fa-close",
                    theme: "bg-red",
                    dec: "删除您的主题",
                    link: ""
                }]
            }
        },
        components:{
            SmallBox
        }
    }
</script>
