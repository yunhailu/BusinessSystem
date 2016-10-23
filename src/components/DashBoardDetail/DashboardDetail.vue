<template>
    <header-component active="dashboard"></header-component>
    <div class="dashboard-detail">
        <div class="container">
            <div class="dashboard-detail-wrap" v-for="detail in details">
                <div class="dashboard-detail-wrap-title">
                    <div class="title"><i class="fa fa-thumb-tack"></i> <span>{{name}}</span></div>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.summary">
                    <result-component :title="words.result" :data="detail"></result-component>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.sentiment">
                    <sentiment-component :title="words.sentiment"></sentiment-component>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.comment">
                    <sentiment-component :title="words.sentiment"></sentiment-component>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.influence">
                    <influence-component :title="words.influence"></influence-component>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.theme">
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
                words,
                name: "",
                details: []
            }
        },
        methods: {
            getDashboardDetail(){
                const id = this.$route.params.id;
                API.getDashboardDetail({ id }).then(resp => {
                    console.log("getDashboardDetail", resp.data);
                    if(resp.data.code == 0){
                        const detail = resp.data.data;
                        this.name = detail.name;
                        this.details = detail.data;
                    }
                });
            },
            init(){
                this.getDashboardDetail();
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
                this.init();
            }
        }
    }
</script>
