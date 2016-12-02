<template>
    <div class="list-panel">
        <div class="row list-panel-tools" v-if="isShowTools">
            <div class="row-left">
                <select-el :options="options" :title="selectTitle" :value.sync="selectValue"></select-el>
            </div>
            <div class="row-middle list-panel-tools-flag">
                <!--<div class="list-panel-tools-flag-title">情绪筛选</div>-->
                <div class="btn-group list-panel-tools-flag">
                    <a class="btn btn-default list-panel-tools-flag-item" href="javascript:void(0);" @click="setSentiment('all');" :class="[sentimentActive == 'all' ? 'active' : '']">{{words.all}}</a>
                    <a class="btn btn-default list-panel-tools-flag-item" href="javascript:void(0);" @click="setSentiment('positive')" :class="[sentimentActive == 'positive' ? 'active' : '']">{{words.positive}}</a>
                    <a class="btn btn-default list-panel-tools-flag-item" href="javascript:void(0);" @click="setSentiment('negative')" :class="[sentimentActive == 'negative' ? 'active' : '']">{{words.negative}}</a>
                    <a class="btn btn-default list-panel-tools-flag-item" href="javascript:void(0);" @click="setSentiment('neutral')" :class="[sentimentActive == 'neutral' ? 'active' : '']">{{words.neutral}}</a>
                </div>
            </div>
            <div class="row-right">
                <div class="btn-group list-panel-tools-filter">
                    <a class="btn btn-default list-panel-tools-filter-item" href="javascript:void(0);" @click="setCount(5);" :class="[filterActive == 5 ? 'active' : '']"> 5</a>
                    <a class="btn btn-default list-panel-tools-filter-item" href="javascript:void(0);" @click="setCount(20)" :class="[filterActive == 20 ? 'active' : '']">20</a>
                    <a class="btn btn-default list-panel-tools-filter-item" href="javascript:void(0);" @click="setCount(50)" :class="[filterActive == 50 ? 'active' : '']">50</a>
                    <a class="btn btn-default list-panel-tools-filter-item" href="javascript:void(0);" @click="setCount(100)" :class="[filterActive == 100 ? 'active' : '']">100</a>
                </div>
            </div>
            <!--<div class="col-md-4">-->
            <!--<i class="fa fa-th-large"></i>-->
            <!--<i class="fa fa-th-list"></i>-->
            <!--</div>-->
        </div>
        <ul class="list-panel-list" v-if="tableList.length">
            <li class="list-panel-list-item row" v-for="item in tableList">
                <!--<a :href="item.url" target="_blank">-->
                <a  @click="showDetail(item);" href="javascript:void(0);">
                    <div class="list-panel-list-item-left list-left">
                        <i class="fa fa-paperclip fa-2
                        x"></i>
                        <div class="list-panel-list-item-left-con">
                            <div class="title">{{{item.title}}}</div>
                            <div class="detail">{{{item.content}}}</div>
                            <div class="time">发布于 {{item.pDate}}</div>
                            <div class="source">来源 {{item.from}} </div>
                        </div>
                    </div>
                    <div class="list-panel-list-item-right list-right">
                        <i class="fa fa-flag icon" :class="item.sentiment | sentiment"></i>
                        <div class="item-data">
                            <div class="row">
                                <div class="title">匹配</div>
                                <div class="time">{{activeAnalyticsTopic.topic_name}}</div>
                            </div>
                            <div class="row">
                                <div class="title">指标</div>
                                <div class="time">
                                    <div class="item" v-if="item.likeCount" ><i class="fa fa-thumbs-up"></i> <span>{{item.likeCount}}</span></div>
                                    <div class="item" v-if="item.fansCount"><i class="fa fa-user"></i> <span>{{item.fansCount}}</span></div>
                                    <div class="item" v-if="item.viewCount"><i class="fa fa-eye"></i> <span>{{item.viewCount}}</span></div>
                                    <div class="item" v-if="item.shareCount"><i class="fa fa-share"></i> <span>{{item.shareCount}}</span></div>
                                    <div class="item" v-if="item.commentsCount"><i class="fa fa-commenting"></i> <span>{{item.commentsCount}}</span></div>
                                    <div class="item" v-if="item.followCount"><i class="fa fa-plus"></i> <span>{{item.followCount}}</span></div>
                                </div>
                                <div class="col-md-offset-3 col-md-9 time"></div>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
        <!--<div v-if="!tableList.length" class="list-panel-tip">{{listTip}}</div>-->
        <!--<div class="list-panel-pager">-->
            <!--<page></page>-->
        <!--</div>-->
    </div>
</template>
<style lang="less" scoped>
    @import "ListPanel.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../../local/local';
    import SelectEl from '../Select/Select.vue';
    import Page from '../Page/Page.vue';
    import { activeAnalyticsTopic } from '../../../vuex/getters';

    export default{
        props: ["list", "options", "selectTitle", "selectValue", "tools"],
        data(){
            const words = Local().comment;
            const common = Local().common;
            return{
                words,
                common,
                listTip: common.nullTip,
                tableList: [],
                filterActive: 20,
                sentimentActive: 'all'
            }
        },
        computed: {
            isShowTools(){
                if(this.tools === false) return false;
                return true;
            }
        },
        vuex: {
            getters: { activeAnalyticsTopic }
        },
        methods: {
            setCount(count){
                this.filterActive = count;
                this.filterItem(count, this.sentimentActive);
            },
            setSentiment(flag){
                this.sentimentActive = flag;
                this.filterItem(this.filterActive, flag);
            },
            filterItem(count, flag){
                if(flag == 'all'){
                    this.tableList = _.filter(this.list, (item, index) => (index < count));
                    return ;
                }
                this.tableList = _.filter(this.list, (item, index) => (index < count && item.sentiment == flag));
            },
            showDetail(item){
                console.log('showDetail', item);
                console.log('route', this.$route);
                const type = this.$route.name, id = item.id;
                if(id){
                    console.log(window.location);
                    console.log(window.location.href);
                    console.log(id);
                    //window.open(window.location.origin+"/#!/"+this.$route.name+"/detail/"+id)
                    window.open(window.location.origin+"/"+this.$route.name+"/detail/"+id)
                    //window.open(window.location.href+"/detail/"+id);
                    /*this.$router.go({
                        name: 'detail',
                        params: { type, id }
                    });*/
                } else {
                    console.log('没有id');
                    location.href = `${item.url}`;
                }
            }
        },
        filters: {
            sentiment(flag){
                let f;
                switch(flag){
                    case "positive":
                        f = "flag-green";
                        break;
                    case "negative":
                        f = "flag-red";
                        break;
                    case "neutral":
                        f = "flag-yellow";
                        break;
                    default:
                        f = "flag-green";
                        break;
                }
                return f;
            }
        },
//        computed: {
//            list(){
//                return this.list;
//            }
//        },
        watch: {
            list(val){
                this.tableList = val;
                this.setCount(20);
            },
            filterActive(val){
                this.setCount(this.filterActive);
            }
        },
        ready(){
            this.setCount(this.filterActive);
            this.setSentiment('all');

        },
        components:{
            SelectEl, Page
        }
    }
</script>
