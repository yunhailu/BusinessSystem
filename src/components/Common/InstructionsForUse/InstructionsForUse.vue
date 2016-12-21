<template>
    <header-component active="instruction"></header-component>
    <div class="instruction-wrap">
        <!--<img class="image" v-bind:src="imgUrl">-->
        <img v-if="isShow == 'wode' || isShow == 'society' || isShow == 'news'" class="image" src="../../../../images/userInstruction.png">
        <img v-if="isShow == 'ccsi'" class="image" src="../../../../images/ccsiInstruction.jpg">
        <img v-if="isShow == 'mediaq'" class="image" src="../../../../images/mediaqInstruction.jpg">
        <!--<img v-if="" class="image" src="../../../../images/userInstruction.png">-->
    </div>
</template>

<style lang="less">
    @import "InstructionsForUse.less";
</style>

<script type="text/ecmascript-6">
    import _ from 'underscore';
    import { WhiteList } from "../../../config/config";
    import HeaderComponent from '../../Header/Header.vue';
    import Local from '../../../local/local';
    function stop(){
        return false;
    }
    window.document.oncontextmenu=stop;
    export default{
        data(){
            const instruction=Local().instruction;
            return {
                imgUrl:instruction.forUse,
                isShow:'wode'
            }
        },
        ready(){
            const whiteName = _.filter(WhiteList, item => (item.domain == location.origin));
            if(!whiteName.length){
                this.isShow = "wode";
            }else{
                this.isShow = whiteName[0].link;
            }
        },
        components:{HeaderComponent}

    }
</script>