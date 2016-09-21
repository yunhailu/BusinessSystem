<template>
    <header-component active="dashboard"></header-component>
    <div class="dashboard-detail">
        <div class="container">
            <div class="dashboard-detail-wrap">
                <div class="dashboard-detail-wrap-title">
                    <div class="title"><i class="fa fa-thumb-tack"></i> <span>Ali Pictures</span></div>
                </div>
                <div class="dashboard-detail-wrap-module">
                    <result-component :title="words.result"></result-component>
                </div>
                <div class="dashboard-detail-wrap-module">
                    <sentiment-component :title="words.sentiment"></sentiment-component>
                </div>
                <div class="dashboard-detail-wrap-module">
                    <influence-component :title="words.influence"></influence-component>
                </div>
                <div class="dashboard-detail-wrap-module">
                    <theme-component :title="words.theme"></theme-component>
                </div>
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
    import InfluenceComponent from './Influence/Influence.vue';
    import ResultComponent from './Result/Result.vue';
    import SentimentComponent from './Sentiment/Sentiment.vue';
    import ThemeComponent from './Theme/Theme.vue';
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
            ResultComponent,
            InfluenceComponent,
            SentimentComponent,
            ThemeComponent
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
