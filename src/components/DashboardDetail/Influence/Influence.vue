<template>
    <div class="panel-title">
        <span class="panel-title-text">{{title}}</span>
        <div class="panel-title-delete" @click="deleteItem();"><i class="fa fa-minus"></i></div>
    </div>
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
                        time_dimension = time_interval > 7 ? 1 : 0;
                let start,end;
                if(time_interval!=0){
                     start = moment().subtract(time_interval, 'days').format('YYYY-MM-DD'),
                            end = moment().format('YYYY-MM-DD');
                }else {
                     start = moment().subtract(8, 'hour').format('YYYY-MM-DD HH'),
                            end = moment().format('YYYY-MM-DD HH');
                    start = start.split(' ')[0] + 'T' + start.split(' ')[1];
                    end = end.split(' ')[0] + 'T' + end.split(' ')[1];
                    console.log('start', start, end);
                }
                Api.getInfluenceList({ subtopic, topic_id, source, time_dimension, start, end}).then(resp => {
                    if(resp.data.code ==0){
                        const influanceInfos = resp.data.data;
                        this.influancerList = _.map(influanceInfos, info => {
                            return info;
                        });
                        this.influancerTable = _.filter(this.influancerList, (info, index) => {
                                    return (index < 20);
                        });
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
                    graphic:[
                        {
                            type: 'text',
                            z: -10,
                            left: 'center', // 相对父元素居中
                            top: 'middle',  // 相对父元素居中
                            //rotation: Math.PI / 4,
                            style: {
                                fill: '#eee',
                                text:Local().common.source,
                                font: 'bold 12px Microsoft YaHei'
                            }
                        }
                    ],
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    series: [
                        {
                            name: 'Happy',
                            type: 'bar',
                            stack: 'sentiment',
                            label: {
                                normal: {
                                    show: false,
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
                                    show: false,
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
                                    show: false,
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
                                    show: false,
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
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data: [val.fear]
                        }
                    ]
                };
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
