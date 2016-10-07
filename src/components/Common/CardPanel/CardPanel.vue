<template>
    <div class="card-panel">
        <div class="card-panel-title">{{title}}</div>
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
    @import "CardPanel.less";
</style>
<script>
    export default{
        props: ["title"],
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>
