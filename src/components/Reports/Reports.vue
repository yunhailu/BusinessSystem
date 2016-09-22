<template>
    <header-component active="reports"></header-component>
    <span>{{name}}</span>
    <div class="reports">

    </div>
</template>
<style lang="less" scoped>
    @import "Reports.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import HeaderComponent from '../Header/Header.vue';

    export default{
        data(){
            return{
                name: "Reports & Alerts"
            }
        },
        components:{
            HeaderComponent
        }
    }
</script>
