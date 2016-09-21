<template>
    <header-component active="dashboard"></header-component>
    <div class="dashboardPanel">
        <div class="container">
            <div class="titlePanel">
                <div class="title"><i class="fa fa-thumb-tack"></i> <span>Ali Pictures</span></div>
            </div>
            <div class="resultPanel">
                <result-component></result-component>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "DashboardDetail.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import HeaderComponent from '../Header/Header.vue';
    import ResultComponent from '../Result/Result.vue';
    import Local from "../../local/local";

    export default{
        data(){
            const words = Local().dashboard;
            return{
                words
            }
        },
        components:{
            HeaderComponent,
            ResultComponent
        }
    }
</script>
