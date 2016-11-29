<template>
    <!--<tabs ></tabs>-->
    <!--<span>Influence</span>-->
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
    <!--<div class="popular">-->
        <!--<ul class="popular-list">-->
            <!--<li class="popular-list-item" v-for="item in popularList">-->
                <!--<i class="fa" :class="[item.icon ? 'fa-'+item.icon : 'fa-cog']"></i>-->
                <!--<span class="popular-list-item-title">{{item.title}}</span>-->
                <!--<div class="popular-list-item-con">-->
                    <!--<div class="popular-list-item-con-source">{{item.source}} - {{item.value}}</div>-->
                    <!--<div class="popular-list-item-con-link">-->
                        <!--<a :href="item.link"  target="_blank">{{item.link}}</a>-->
                    <!--</div>-->
                    <!--<div>{{item.post | addLabel "Post"}}</div>-->
                <!--</div>-->
            <!--</li>-->
        <!--</ul>-->
    <!--</div>-->
    <div class="influenceTable">
        <table class="table table-hover  table-striped">
            <thead>
                <tr>
                    <td><i class="fa fa-user"></i> <span>{{words.influencer}}</span></td>
                    <td><i class="fa fa-comments"></i> <span>{{words.numberOfPosts}}</span></td>
                    <td><i class="fa fa-bar-chart"></i> <span>{{words.sentiment}}</span></td>
                    <td><i class="fa fa-thumbs-up"></i> {{words.like}}</td>
                    <td><i class="fa fa-share-alt"></i> {{words.resend}}</td>
                    <td><i class="fa fa-comment"></i> {{words.comments}}</td>
                    <td><i class="fa fa-share"></i> {{words.rate}}</td>
                </tr>
            </thead>
            <tbody v-if="influancerTable.length">
                <tr id="item.id" v-for="(index, item) in influancerTable" :class="[index % 2 == 0 ? '' : '']">
                    <td>{{item.influencer}}</td>
                    <td>{{item.post}}</td>
                    <td class="barTd"><div class="sentimentBar" v-echarts="item.sentiment | barFormat"></div></td>
                    <td>{{item.likeCount}}</td>
                    <td>{{item.shareCount}}</td>
                    <td>{{item.comments}}</td>
                    <td class="rate"><i class="fa" :class="[item.rate.key == 'up' ? 'fa-arrow-up' : 'fa-arrow-down']"></i> {{item.rate | rateFormat}}</td>
                </tr>
            </tbody>
        </table>
        <!--<div v-if="influancerTable.length" class="paging">-->
            <!--<page></page>-->
        <!--</div>-->
        <div v-if="!influancerTable.length" class="noTableTips">{{noTableTips}}</div>
    </div>

</template>
<style lang="less" scoped>
    @import "Influence.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import moment from 'moment';
    import {Chart, Pie} from '../../../config/config';
    import Local from '../../../local/local';
    import * as Api from '../../../widgets/Api';
    import Tabs from '../../Common/Tabs/Tabs.vue';
    import Page from '../../Common/Page/Page.vue';

    export default{
        props: ['title', 'data', 'remove'],
        data(){
            const words = Local().influence;
            return{
                words,
                popularList: [],
                influancerTable: [],
                influancerList:[],
                noTableTips: words.noTableTips
            }
        },
        methods: {
            getInfluenceList(){
                const subtopic = this.data.subtopic,
                        topic_id = this.data.topic_id,
                        source = this.data.source,
                        time_interval = this.data.time_interval,
                        //time_dimension = this.data.time_dimension,
                        time_dimension = time_interval > 7 ? 1 : 0,
//                        start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
//                        end = moment().format('YYYY-MM-DD'),
                        topic = this.data.topic;
                if(time_interval!=0){
                    const start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                            end = moment().format('YYYY-MM-DD');
                }else {
                    let start = moment().subtract(8, 'hour').format('YYYY-MM-DD HH'),
                            end = moment().format('YYYY-MM-DD HH');
                    start = start.split(' ')[0] + 'T' + start.split(' ')[1];
                    end = end.split(' ')[0] + 'T' + end.split(' ')[1];
                    console.log('start', start, end);
                }
                Api.getInfluenceList({ subtopic, topic_id, source, time_dimension, start, end, topic }).then(resp => {
                    //const resp = {data: {code:0, data: [{id: "1234", influencer: "台湾", posts: 6, like: 123, resend: 32, sentiment: {happy: 5, anger: 15, sorrow: 10, disgust: 0, fear: 5}, rate: {key: "up", value: "24%"}},{"id": "1234", "influencer": "台湾1", "posts": 6, "like": 123, "resend": 32, "sentiment": {happy: 3, anger: 5, sorrow: 10, disgust: 3, fear: 5}, "rate": {"key": "up", "value": "24%"}}] }};
                    if(resp.data.code ==0){
                        const influanceInfos = resp.data.data;
                        this.influancerList = _.map(influanceInfos, info => {
                            return info;
                        });
                        this.influancerTable = _.filter(this.influancerList, (info, index) => {
                                    return (index < 20);
                        });
//                      console.log('这是影响力',this.influancerTable)
                    }
                });
            },
            deleteItem(){
                const detail = this.data;
                this.remove(detail, 'influence');
            },
            init(){
                this.getInfluenceList();
            }
        },
        filters: {
            addLabel(value, label){
                return label + ": " + value;
            },
            rateFormat(rate){
                if(!rate) return "";
                return rate.value;
            },
            barFormat(val){
                const option = {
                    tooltip: _.extend({}, Chart.tooltip, {}),
                    grid: _.extend({}, Chart.grid),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    xAxis: _.extend({}, Chart.xAxis, {
                        type: 'value',
                        show: false
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'category',
                        data: ['sentiment'],
                        show: false
                    }),
                    color: _.extend([], Chart.color),
                    series: [
                        {
                            name: 'Happy',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.happy]
                        },
                        {
                            name: 'Anger',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.anger]
                        },
                        {
                            name: 'Sorrow',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.sorrow]
                        },
                        {
                            name: 'Disgust',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.disgust]
                        },
                        {
                            name: 'Fear',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.fear]
                        }
                    ]
                };
                //console.log(option);
                return option;
            }
        },
        components:{
            Tabs,
            'page': Page
        },
        ready(){
            this.init();
        }
    }
</script>
