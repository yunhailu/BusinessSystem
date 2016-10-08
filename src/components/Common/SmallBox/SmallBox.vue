<template>
    <div class="small-box" :class="option.theme">
        <div class="inner">
            <h3>{{option.title}}</h3>
            <p>{{option.dec}}</p>
        </div>
        <div class="icon">
            <i class="fa" :class="option.icon"></i>
        </div>
        <div class="small-box-footer">
            更多信息 <i class="fa fa-arrow-circle-right"></i>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "SmallBox.less";
</style>
<script type="text/ecmascript-6">

    export default{
        props: ["option"],
        data(){
            return{

            }
        },
        components:{

        }
    }
</script>
