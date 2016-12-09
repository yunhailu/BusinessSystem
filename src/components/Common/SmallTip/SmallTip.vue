<template>
    <!--<div class="tips">
        <div class="triangle"></div>
        <div class="content">浏览更多，请拨打电话*******</div>
    </div>-->
    <div class="v-popover-tag" @click.stop="pop($event)">
        <slot></slot>
    </div>
    <div class="v-popover-wrap" :style="{left: x + 'px', top: y + 'px', visibility: show ? 'visible' : 'hidden'}" v-el:pop>
        <div class="v-popover-box">
            <div class="v-popover-title">{{title}}</div>
            <div class="v-popover-content">{{content}}</div>
            <div :class="['v-popover-arrow', placement == 'top' ? 'v-popover-arrow-top' : 'v-popover-arrow-bottom']" :style="{left: arrowLeft + 'px'}"></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@import "SmallTip.less";
</style>
<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: '标题'
            },
            content: {
                type: String,
                default: '内容'
            },
            placement: {
                type: String,
                default: 'top'
            }
        },
        data() {
            return {
                show: false,
                arrowLeft: 0,
                x: 0,
                y: 0
            }
        }
        /*props:['title'],
        data(){
            return {

            }
        }*/
    }
</script>