<template>
    <header-component active="dashboard"></header-component>
    <div class="dashboard-detail">
        <div class="container">
            <div class="dashboard-detail-wrap">
                <div class="dashboard-detail-wrap-title">
                    <div class="title"><i class="fa fa-thumb-tack"></i> <span>Ali Pictures</span></div>
                </div>
                <div class="dashboard-detail-wrap-result">
                    <!--<result-component></result-component>-->
                </div>
                <div class="dashboard-detail-wrap-influence"></div>
                <div class="dashboard-detail-wrap-sentiment"></div>
                <div class="dashboard-detail-wrap-theme"></div>
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
    import * as API from "../../widgets/Api";

    export default{
        data(){
            const words = Local().dashboard;
            return{
                words
            }
        },
        components:{
            HeaderComponent,
            //ResultComponent
        },
        route: {
            data(){
                API.getDashboardDetail({id: 123}).then(resp => {
                    console.log("getDashboardDetail", resp);
                });
            }
        }
    }
</script>
