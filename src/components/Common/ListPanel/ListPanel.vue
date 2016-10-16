<template>
    <div class="list-panel">
        <div class="row list-panel-tools">
            <div class="col-md-3">
                <select-el :options="options" :title="selectTitle" :value.sync="selectValue"></select-el>
            </div>
            <div class="col-md-3 list-panel-tools-flag">
                <!--<div class="list-panel-tools-flag-title">情绪筛选</div>-->
                <div class="btn-group list-panel-tools-flag">
                    <a class="btn btn-default list-panel-tools-flag-item" href="javascript:void(0);" @click="sentimentItem('all');" :class="[sentimentActive == 'all' ? 'active' : '']">{{words.all}}</a>
                    <a class="btn btn-default list-panel-tools-flag-item" href="javascript:void(0);" @click="sentimentItem('positive')" :class="[sentimentActive == 'positive' ? 'active' : '']">{{words.positive}}</a>
                    <a class="btn btn-default list-panel-tools-flag-item" href="javascript:void(0);" @click="sentimentItem('negative')" :class="[sentimentActive == 'negative' ? 'active' : '']">{{words.negative}}</a>
                    <a class="btn btn-default list-panel-tools-flag-item" href="javascript:void(0);" @click="sentimentItem('neutral')" :class="[sentimentActive == 'neutral' ? 'active' : '']">{{words.neutral}}</a>
                </div>
                <!--<div class="item all"><i class="fa fa-flag fa-2x"></i></div>-->
                <!--<div class="item positive"><i class="fa fa-flag fa-2x"></i></div>-->
                <!--<div class="item negative"><i class="fa fa-flag fa-2x"></i></div>-->
                <!--<div class="item neutral"><i class="fa fa-flag fa-2x"></i></div>-->
            </div>
            <div class="col-md-3">
                <div class="btn-group list-panel-tools-filter">
                    <a class="btn btn-default list-panel-tools-filter-item" href="javascript:void(0);" @click="filterItem(5);" :class="[filterActive == 5 ? 'active' : '']"> 5</a>
                    <a class="btn btn-default list-panel-tools-filter-item" href="javascript:void(0);" @click="filterItem(10)" :class="[filterActive == 10 ? 'active' : '']">10</a>
                    <a class="btn btn-default list-panel-tools-filter-item" href="javascript:void(0);" @click="filterItem(15)" :class="[filterActive == 15 ? 'active' : '']">15</a>
                    <a class="btn btn-default list-panel-tools-filter-item" href="javascript:void(0);" @click="filterItem(20)" :class="[filterActive == 20 ? 'active' : '']">20</a>
                </div>
            </div>
            <!--<div class="col-md-4">-->
            <!--<i class="fa fa-th-large"></i>-->
            <!--<i class="fa fa-th-list"></i>-->
            <!--</div>-->
        </div>
        <ul class="list-panel-list">
            <li class="list-panel-list-item row" v-for="item in tableList">
                <!--<a :href="item.url" target="_blank">-->
                <a v-link="{name: 'detail', params:{type:'result', id:'12345678'}}" target="_blank">
                    <div class="list-panel-list-item-left col-md-8">
                        <i class="fa fa-paperclip fa-3x"></i>
                        <div class="list-panel-list-item-left-con">
                            <div class="title">{{{item.title}}}</div>
                            <div class="detail">{{{item.content}}}</div>
                            <!--<div class="source"> {{item.from}} </div>-->
                            <!--<div class="time">发布于 {{item.pDate}}</div>-->
                            <div class="data">
                                <div class="item" v-if="item.likeCount" ><i class="fa fa-thumbs-up icon"></i> <span>{{item.likeCount}}</span></div>
                                <div class="item" v-if="item.fansCount"><i class="fa fa-user icon"></i> <span>{{item.fansCount}}</span></div>
                                <div class="item" v-if="item.viewCount"><i class="fa fa-eye icon"></i> <span>{{item.viewCount}}</span></div>
                                <div class="item" v-if="item.shareCount"><i class="fa fa-share icon"></i> <span>{{item.shareCount}}</span></div>
                                <div class="item" v-if="item.commentsCount"><i class="fa fa-commenting icon"></i> <span>{{item.commentsCount}}</span></div>
                                <div class="item" v-if="item.followCount"><i class="fa fa-plus icon"></i> <span>{{item.followCount}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="list-panel-list-item-right col-md-4">
                        <i class="fa fa-flag fa-2x icon" :class="item.sentiment | sentiment"></i>
                        <div class="item-data">
                            <div class="row">
                                <div class="col-md-3 title">匹配</div>
                                <div class="col-md-9 time">优步Ubar</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 title">发布于</div>
                                <div class="col-md-9 time">{{item.pDate}}</div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 title">来源</div>
                                <div class="col-md-9 time">消费者报</div>
                            </div>

                            <!--<div class="row">-->
                                <!--<div class="col-md-4" :class="[item.sentiment == 'positive' ? 'active': '']"><i class="fa fa-flag positive"></i> {{words.positive}}</div>-->
                                <!--<div class="col-md-4" :class="[item.sentiment == 'negative' ? 'active': '']"><i class="fa fa-flag negative"></i> {{words.negative}}</div>-->
                                <!--<div class="col-md-4" :class="[item.sentiment == 'neutral' ? 'active': '']"><i class="fa fa-flag neutral"></i> {{words.neutral}}</div>-->
                            <!--</div>-->

                        </div>
                    </div>
                </a>
            </li>
        </ul>
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

    export default{
        props: ["list", "options", "selectTitle", "selectValue"],
        data(){
            const words = Local().comment;
            return{
                words,
                tableList: [],
                filterActive: 10,
                sentimentActive: 'all'
            }
        },
        methods: {
            filterItem(num){
                this.filterActive = num;
                this.tableList = _.filter(this.list, (item, index) => (index < num));
            },
            sentimentItem(flag){
                this.sentimentActive = flag;
                if(flag == 'all'){
                    this.tableList = _.extend([], this.list);
                    return ;
                }
                this.tableList = _.filter(this.list, (item, index) => {
                    return item.sentiment == flag;
                });
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
                //this.sentimentItem('all');
            }
        },
        created(){
            this.filterItem(10);
            this.sentimentItem('all');
        },
        components:{
            SelectEl, Page
        }
    }
</script>
