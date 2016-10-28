<template>
    <header-component active="dashboard"></header-component>
    <div class="dashboard-detail">
        <div class="container">
            <div class="dashboard-detail-wrap" v-for="detail in details">
                <div class="dashboard-detail-wrap-title">
                    <div class="title"><i class="fa fa-thumb-tack"></i> <span>{{name}}</span></div>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.summary">
                    <result-component :title="words.result" :data="detail" :remove="removeItem"></result-component>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.sentiment">
                    <sentiment-component :title="words.sentiment" :data="detail" :remove="removeItem"></sentiment-component>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.comment">
                    <comment-component :title="words.comment" :data="detail" :remove="removeItem"></comment-component>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.influence">
                    <influence-component :title="words.influence" :data="detail" :remove="removeItem"></influence-component>
                </div>
                <div class="dashboard-detail-wrap-module" v-if="detail.theme">
                    <theme-component :title="words.theme" :data="detail" :remove="removeItem"></theme-component>
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
    import CommentComponent from './Comment/Comment.vue';
    import SentimentComponent from './Sentiment/Sentiment.vue';
    import ThemeComponent from './Theme/Theme.vue';


    import Local from "../../local/local";
    import * as Api from "../../widgets/Api";

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
                Api.getDashboardDetail({ id }).then(resp => {
                    console.log("getDashboardDetail", resp.data);
                    if(resp.data.code == 0){
                        const detail = resp.data.data;
                        this.name = detail.name;
                        this.details = detail.data;
                    }
                });
            },
            removeItem(detail, category, callback){
                const params = {
                    id: this.$route.params.id,
                    topic: detail.topic,
                    topic_id: detail.topic_id
                };
                params[category] = 0;
                Api.removeDashboardItem(params).then(resp => {
                    console.log(resp.data);
                    _.each(this.details, detail => {
                        if(detail.topic == params.topic){
                            detail[category] = 0;
                        }
                    });
                    callback && callback(resp.data);
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
            CommentComponent,
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
