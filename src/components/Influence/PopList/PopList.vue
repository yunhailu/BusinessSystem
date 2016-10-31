<template>
    <tips :visible.sync="visiable" :tipsparam.sync="popListParams">
        <div class="pop-list">

        </div>
    </tips>
</template>
<style lang="less" scoped>
    @import "PopList.less";
</style>
<script  type="text/ecmascript-6">
    import _ from "underscore";
    import Tips from "../../Common/Tips/Tips.vue";

    export default{
        props: ['poplist','visiable'],
        data(){
            return{
                popListParams: {
                    type: "dialog",
                    callback: () => {
                        this.visiable = false;
                    },
                    failback: () => { this.visiable = false; }
                }
            }
        },
        components:{ Tips }
    }
</script>
