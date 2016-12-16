<template>
    <header-component active="dashboard"></header-component>
    <div class="dashboard-detail">
        <div class="container">
            <div class="dashboard-detail-wrap" v-for="detail in details">
                <div class="dashboard-detail-wrap-box" v-if="detail.summary || detail.sentiment || detail.comment || detail.influence || detail.theme">
                    <div class="dashboard-detail-wrap-box-title">
                        <div class="saveBtn" @click="saveAction();"><i class="fa fa-save"></i> <span>{{words.save}}</span></div>
                        <div class="title"><i class="fa fa-thumb-tack"></i> <span>{{name}}</span></div>
                    </div>
                    <div class="relatedTopic">关键词:{{detail.topic}}</div>
                    <div class="dashboard-detail-wrap-box-module" v-if="detail.summary">
                        <result-component :title="words.result" :data.sync="detail" :remove="removeItem" :master.sync="detail.summarymaster" :sub.sync="detail.summarysub"></result-component>
                    </div>
                    <div class="dashboard-detail-wrap-box-module" v-if="detail.sentiment">
                        <sentiment-component :title="words.sentiment" :data="detail" :remove="removeItem" :master.sync="detail.sentimentmaster" :sub.sync="detail.sentimentsub"></sentiment-component>
                    </div>
                    <div class="dashboard-detail-wrap-box-module" v-if="detail.comment">
                        <comment-component :title="words.comment" :data="detail" :remove="removeItem" :master.sync="detail.commentmaster" :sub.sync="detail.commentsub"></comment-component>
                    </div>
                    <div class="dashboard-detail-wrap-box-module" v-if="detail.influence">
                        <influence-component :title="words.influence" :data="detail" :remove="removeItem" ></influence-component>
                    </div>
                    <div class="dashboard-detail-wrap-box-module" v-if="detail.theme">
                        <theme-component :title="words.theme" :data="detail" :remove="removeItem" :wordcloud.sync="detail.themewordcloud" :scatter.sync="detail.themescatter" :bar.sync="detail.themebar" :top.sync="detail.themetop"></theme-component>
                    </div>
                    <div class="dashboard-detail-wrap-box-module" v-if="false">
                        <compare-component :title="words.compare" :data="compare" :remove="removeItem" :master.sync="detail.comparemaster" :sub.sync="detail.comparesub" :secsub.sync="detail.comparesecsub"></compare-component>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <tips :visible.sync="loadingParams.visiable" :tipsparam.sync="loadingParams"></tips>
</template>
<style lang="less" scoped>
    @import "DashboardDetail.less";
</style>
<script type="text/ecmascript-6">
    window.ExportImages = (function(){
        let imgs = [];
        return {
            getImages(){
                return imgs;
            },
            insert(image){
                const isExist = _.some(imgs, item => (image.topic == item.topic && image.topic_id == item.topic_id && image.key == item.key));
                if(isExist){
                    imgs = _.filter(imgs, item => {
                        return !(item.topic === image.topic && item.topic_id === image.topic_id && item.key === image.key);
                    });
                }
                imgs.push(image);
            },
            remove(){
                imgs = [];
            }
        };
    })();

    import _ from 'underscore';
    import HeaderComponent from '../Header/Header.vue';
    import InfluenceComponent from './Influence/Influence.vue';
    import ResultComponent from './Result/Result.vue';
    import CommentComponent from './Comment/Comment.vue';
    import SentimentComponent from './Sentiment/Sentiment.vue';
    import ThemeComponent from './Theme/Theme.vue';
    import Tips from '../Common/Tips/Tips.vue';
    import CompareComponent from './Compare/Compare.vue';


    import Local from "../../local/local";
    import * as Api from "../../widgets/Api";
    import { insertExportImages, removeExportImages } from "../../vuex/actions";
    import { exportImages } from '../../vuex/getters'

    export default{
        data(){
            const words = Local().dashboard;
            return{
                words,
                name: "",
                details: [],
                compare:[],
                imgs: [],
                loadingParams: {
                    visiable: false,
                    type: 'loading',
                    content: "请稍候......"
                }
            }
        },
        vuex: {
            actions: { insertExportImages, removeExportImages },
            getters: { exportImages }
        },
        methods: {
            formatImgs(details){
                let imgs = _.chain(details)
                        .map(value => {
                            const imgs = [];
                            if(value.summary){
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "summary_master", value: value.summarymaster});
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "summary_sub", value: value.summarysub});
                            }
                            if(value.sentiment){
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "sentiment_master", value: value.sentimentmaster});
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "sentiment_sub", value: value.sentimentsub});
                            }
                            if(value.comment){
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "comment_master", value: value.commentmaster});
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "comment_sub", value: value.commentsub});
                            }
                            if(value.theme){
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "theme_wordcloud", value: value.themewordcloud});
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "theme_scatter", value: value.themescatter});
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "theme_trend", value: value.themebar});
                                imgs.push({ topic: value.topic, topic_id: value.topic_id, key: "theme_top", value: value.themetop});
                            }
                            return imgs;
                        })
                        .flatten().value();
                return imgs;
            },
            getDashboardDetail(){
                const id = this.$route.params.id;
                Api.getDashboardDetail({ id }).then(resp => {
                    if(resp.data.code == 0){
                        const detail = resp.data.data;
                        this.name = detail.name;
                        this.details = detail.data;
                        const compare = detail.compare;
                        console.log('details',this.details);
                        this.details = _.map(this.details, value => {
                            value.summarymaster = "";
                            value.summarysub = "";
                            value.sentimentmaster = "";
                            value.sentimentsub = "";
                            value.commentmaster = "";
                            value.commentsub = "";
                            value.themewordcloud = "";
                            value.themebar = "";
                            value.themetop = "";
                            return value;
                        });
                        console.log('this.details',this.details);
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
            exportReport(){
                this.loadingParams.visiable = true;
                //imgs存放关键字信息
                this.imgs = this.formatImgs(this.details);
                const id = this.$route.params.id;
                const imgs = JSON.stringify(this.exportImages);
                //console.log(imgs);
                //window.open(`http://118.244.212.122:8008/export/report?id=${id}&imgs=${imgs}`);
                Api.exportReport({ id, imgs }).then(resp => {
                    console.log(resp);
                    this.loadingParams.visiable = false;
                    if(resp.data.code == 0){
                        window.open(`${resp.data.data.link}`);
                    }
                });
            },
            saveAction(){
                this.exportReport();
            },
            init(){
                this.removeExportImages();
                this.getDashboardDetail();
            }
        },
        components:{
            HeaderComponent,
            ResultComponent,
            InfluenceComponent,
            CommentComponent,
            SentimentComponent,
            ThemeComponent,
            Tips,
            CompareComponent
        },
        route: {
            data(){
                this.init();
            }
        }
    }
</script>
