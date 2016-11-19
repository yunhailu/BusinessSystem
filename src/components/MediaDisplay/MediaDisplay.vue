<template>
    <div class="hot-panel">

        <div class="row">
            <div class="col-md-6 hot-today">
                <card-panel :title="words.todayHotsRanking">
                    <ul class="hot-today-list">
                        <li v-for="item in hotsTodayRankings"  class="hot-today-list-item" @click="showDetail(item,0);">
                            <span class="hot-today-list-item-index">{{ ($index + 1) }}</span>
                            <span class="hot-today-list-item-text">{{item.title}}</span>
                        </li>
                    </ul>
                </card-panel>
            </div>

            <div class="col-md-6 hot-sentiment">
                <card-panel :title="words.sentiment | title">
                    <div v-echarts="sentimentOption" :loading="sentimentLoading" class="hot-sentiment-pie" theme=""></div><!--infographic,macarons-->
                </card-panel>
            </div>
        </div>
        <!--情绪比例，热词排行-->
        <div class="row">

            <div class="col-md-6 hot-words">
                <card-panel :title="words.wordsRanking | title">
                    <div v-echarts="hotWordsOption" :loading="hotWordsLoading" class="hot-words-cloud" ></div>
                </card-panel>
            </div>

            <div class="col-md-6 hot-sentiment">
                <card-panel :title="sontitle">
                    <div v-echarts="sentimentSonOption" :loading="sentimentSonLoading" class="hot-sentiment-pie" theme=""></div><!--infographic,macarons-->
                </card-panel>
            </div>



        </div>
        <div class="row">
            <div class="col-md-6 hot-sentiment">
                <card-panel :title="tit11">
                    <div v-echarts="sexOption" :loading="sexLoading" class="hot-sentiment-pie" theme=""></div><!--infographic,macarons-->
                </card-panel>
            </div>

            <div class="col-md-6 hot-sentiment">
                <card-panel :title="tit12">
                    <div v-echarts="ageOption" :loading="ageLoading" class="hot-sentiment-pie" theme=""></div><!--infographic,macarons-->
                </card-panel>
            </div>
        </div>
        <div class="row">

            <div class="col-md-6 hot-ranking">
            <card-panel :title="tit13">
            <ul class="hot-ranking-list">
            <li v-for="item in datatitle"  class="hot-ranking-list-item" >
            <span class="hot-ranking-list-item-index">{{ ($index + 1) }}</span>
            <span class="hot-ranking-list-item-text">{{item.title}}</span>
            </li>
            </ul>
            </card-panel>
            </div>

            <div class="col-md-6 hot-ranking">
                <card-panel :title="tit14">
                    <ul class="hot-ranking-list">
                        <li v-for="item in datatitle0"  class="hot-ranking-list-item" >
                            <span class="hot-ranking-list-item-index">{{ ($index + 1) }}</span>
                            <span class="hot-ranking-list-item-text">{{item.title}}</span>
                        </li>
                    </ul>
                </card-panel>
            </div>
        </div>


    </div>


</template>
<style lang="less" scoped>
    @import "MediaDisplay.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../local/local';
    import { Chart, Pie } from '../../config/config';
    import * as Api from '../../widgets/Api';
    import CardPanel from '../Common/CardPanel/CardPanel.vue';

    export default{
        data(){
            const words = Local().hotEvent;
            const common = Local().common;
            return{

                words,
                common,
                sontitle:'子话题的表现',
                img: "",
                datatitle:[
                    {title:'#金马奖# 金马53荣耀时刻最佳女主角访谈影音曝光'},
                    {title:' @范冰冰 表示如果没有电影的故事和画面'},
                    {title:'可能构不成一个很完整的她'},
                    {title:'周冬雨 透露和@马思纯 有不一样的沟通方式'},
                    {title:'生活，吴可熙称喜爱的所有元素都在电影里'}

                ],
                datatitle0:[
                    {title:'#金马奖# 金马53荣耀时刻最佳女主角访谈影音曝光'},
                    {title:' @范冰冰 表示如果没有电影的故事和画面'},
                    {title:'可能构不成一个很完整的她'},
                    {title:'周冬雨 透露和@马思纯 有不一样的沟通方式'},
                    {title:'生活，吴可熙称喜爱的所有元素都在电影里'}

                ],

                activeHot: {
                    name: "",
                    value: ""
                },
                source:"",
                hot:'',
                tit11:"男女比例分布",
                tit12:"年龄分布",
                tit13:"男性关注话题",
                tit14:"女性关注话题",

                // 热点情绪占比
                sentimentOption: {

                    title: _.extend({}, Pie.title, { show: false}),
                    tooltip: _.extend({}, Pie.tooltip),
                    legend: _.extend({}, Pie.legend, {
                        orient: 'vertical',
                        left: 10,
                        top: 10,
                        data: [common.happy, common.anger, common.sorrow, common.disgust, common.fear]
                    }),
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    textStyle: Pie.textStyle,
                    toolbox: Pie.toolbox,
                    series:[
                        {
                            name: words.sentiment,
                            type:'pie',
                            radius: ['25%', '80%'],
                            center: ['50%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[]
                        },
                    ],
                },
                sentimentLoading: false,

                sentimentSonOption: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    toolbox: Pie.toolbox,
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:[]
                    },

                    series: [
                        {
                            name:'热门子话题',
                            type:'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:35, name:'123'},
                                {value:679, name:'223'},
                                {value:335, name:'增强w'},
                                {value:679, name:'营销广告w'},
                                {value:88, name:'搜索引擎'}
                            ]
                        },
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['40%', '55%'],

                            data:[
                                {value:335, name:'保护意识'},
                                {value:310, name:'男演员'},
                                {value:234, name:'剩余'},
                                {value:135, name:'深圳'},
                                {value:1048, name:'气象台'},
                                {value:251, name:'预警'},
                                {value:147, name:'创业板'},
                                {value:102, name:'电影'}
                            ]
                        }
                    ]
                },
                sentimentSonLoading: false,


                sexOption: {
                    // title: {
                    //     text:'性别分布'
                    // },
                    tooltip: {},
                    color:[ '#3598DC', '#737373'],
                    legend: {
                        data:['男','女']
                    },
                    xAxis: {
                        data: ['性别']
                    },
                    yAxis: {},
                    series: [{
                        name: '男',
                        type: 'bar',
                        data: [25]
                    }, {
                            name: '女',
                            type: 'bar',
                            data: [15]
                        }]
                },
                sexLoading:false,

                ageOption:{
                    // title: {
                    //     text:'性别分布'
                    // },
                    tooltip: {},
                    color:[ '#F1C40F', '#3598DC', '#737373'],
                    legend: {
                        data:['年龄分布']
                    },
                    xAxis: {
                        data: ["10~20岁","20~30岁","30~40岁","40~50岁","50~60岁","60岁以上"]
                    },
                    yAxis: {},
                    series: [{
                        name: '年龄分布',
                        type: 'bar',
                        data: [54, 20, 36, 16, 18, 20]
                    }]
                },
                ageLoading:false,


                //实时热点排行
                hotsRanking: [],
                hotsRankings:{},
                popHotsRanking:[],

                //热点字符云
                hotWordsLoading: false,
                hotWordsOption: {
                    tooltip: {},
                    series: {
                        //grid: {x:0, x2:0},
                        type: 'wordCloud',
                        gridSize: 14,
                        sizeRange: [12, 50],
                        rotationRange: [-90, 90],
                        shape: 'circle',
                        width: '95%',
                        height: '90%',
                        textPadding: 6,
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'rgb(' + [
                                                Math.round(Math.random() * 160 + 50),
                                                Math.round(Math.random() * 160 + 50),
                                                Math.round(Math.random() * 160 + 50)
                                            ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        //data: [{"name":"brush","value":1.7320508075688772}],数据结构
                        data: []
                    }
                },

                //今日热点排行
                hotsTodayRanking: [],
                hotsTodayRankings: {},
                activeEvent:{},
                // 热点事件散点图-------over
                scatterOption: {
                    tooltip: { position: 'top', formatter(params, ticket, callback){
                        //console.log(params);
                        return `值: ${params.value[1]}`;
                    }},
                    textStyle: _.extend({}, Chart.textStyle),
                    title: [],
                    singleAxis: [],
                    series: []
                },
                scatterLoading: true,
                //气泡图热点事件


            }
        },
        methods: {
            getHotRealtime(){
                return Api.getHotRealtime({}).then(resp => {
                    console.log('getHotRealtime', resp.data);
                    if(resp.data.code == 0){
                        this.scatterLoading = false;
                        const scatters = resp.data.data;
                        this.scatterOption.title = _.map(scatters, (scatter, index) => {
                            return ({
                                textBaseline: 'middle',
                                textStyle: {fontSize: 16},
                                top: `${index * 20 + 10}%`,
                                text: scatter.name
                            });
                        });
                        this.scatterOption.singleAxis = _.map(scatters, (scatter, index) => {
                            return ({
                                left: 180,
                                type: 'category',
                                boundaryGap: false,
                                data: _.map(scatter.data, item => item.date),
                                top: `${4 + index * 20}%`,
                                height: '10%',
                                axisLine: {
                                    lineStyle: {color: '#aaa'}
                                },
                                splitLine: {
                                    lineStyle: {type: 'dashed'}
                                },
                                axisLabel: {
                                    interval: 2
                                }
                            });
                        });
                        this.scatterOption.series = _.map(scatters, (scatter, index) => {
                            const max = _.chain(scatter.data)
                                        .map(value => value.value)
                                        .max(value => value).value(),
                                    step = Math.ceil(max / 50);
                            return ({
                                singleAxisIndex: index,
                                coordinateSystem: 'singleAxis',
                                type: 'scatter',
                                data: _.map(scatter.data, (item, index) => [index, item.value]),
                                symbolSize(dataItem) {
                                    return dataItem[1] / step;
                                }
                            });
                        });
                    }
                });
            },
            showDetail(item,idx){
                if(idx ==0){
                    this.source = '';
                };
                if(idx ==1){
                    this.source ='';
                }
                this.activeHot = {name:item.title,value:item};
                console.log('aaa',this.activeHot);
                this.showChart(this.activeHot);
            },
            showChart(activeHot){
                const activeSentiment = activeHot.value.sentiment;
                const activeWordCloud = activeHot.value.word_cloud;
                const ouu=this.getw(activeWordCloud,0,6);
                console.log('ouu',ouu);



                //this.sexOption.xAxis.data=this.getw(activeWordCloud,0,6);
                this.ageOption.series[0].data=_.shuffle(this.getw(activeWordCloud,1,6));
                const fir=_.first(this.getw(activeWordCloud,1,3));
                const las=_.last(this.getw(activeWordCloud,1,3));
                this.sexOption.series[0].data=[fir];
                this.sexOption.series[1].data=[las];
                const wdq78=_.shuffle(2,234,56,36,23,123,465,21,344,44);

                this.sentimentSonOption.series[1].data[0].value=Math.floor(Math.random()*100);

                this.sentimentSonOption.series[1].data[1].value=Math.floor(Math.random()*100);

                this.sentimentSonOption.series[1].data[2].value=Math.floor(Math.random()*100);
                this.sentimentSonOption.series[1].data[3].value=Math.floor(Math.random()*100);
                this.sentimentSonOption.series[1].data[4].value=Math.floor(Math.random()*100);
                this.sentimentSonOption.series[1].data[5].value=Math.floor(Math.random()*100);
                this.sentimentSonOption.series[1].data[6].value=Math.floor(Math.random()*100);
                this.sentimentSonOption.series[1].data[7].value=Math.floor(Math.random()*100);

                const wer= _.shuffle([
                    {title:'#金马奖# 金马53荣耀时刻最佳女主角访谈影音曝光'},
                    {title:' @范冰冰 表示如果没有电影的故事和画面'},
                    {title:'可能构不成一个很完整的她'},
                    {title:'周冬雨 透露和@马思纯 有不一样的沟通方式'},
                    {title:'生活，吴可熙称喜爱的所有元素都在电影里'}

                ]);
                const wer0= _.shuffle([
                    {title:'#金马奖# 金马53荣耀时刻最佳女主角访谈影音曝光'},
                    {title:'周冬雨 透露和@马思纯 有不一样的沟通方式'},
                    {title:' @范冰冰 表示如果没有电影的故事和画面'},
                    {title:'可能构不成一个很完整的她'},
                    {title:'生活，吴可熙称喜爱的所有元素都在电影里'}

                ]);
                this.datatitle0=wer0;

                this.datatitle=wer;












                //console.log(_.first(_.range(0, 40, 5)));






                console.log('activeWordCloud00000',activeWordCloud);
                console.log('activeSentiment1211',activeSentiment.happy,activeSentiment.anger,this.common.disgust);
                this.sentimentOption.series[0].data=[
                 {value:activeSentiment.happy,name : this.common.happy}, {value: activeSentiment.anger, name: this.common.anger}, {value: activeSentiment.sorrow, name: this.common.sorrow},{value: activeSentiment.disgust, name: this.common.disgust}, {value: activeSentiment.fear, name: this.common.fear}
                 ];

                 this.hotWordsOption.series.data=_.map(activeWordCloud,(value,key)=>{
                     return {"name":key,"value":value}
                 })
                console.log('this.hotWordsOption.series.data',this.hotWordsOption.series.data)
            },


            getw(item,idc,idh){
                const sexdatak=_.keys(item);
                const sexdatav=_.values(item);
                const a =[];
                const b =[];
                for(var i=0; i<idh; i++){
                    a.push(_.keys(item)[i]);
                    b.push(_.values(item)[i]);
                };
                if(idc==0){ return a;};
                if(idc==1){ return b;};

            },




            //当天
            getTodayList(){
                Api.getTodayList({}).then(resp => {
                    console.log('resp', resp);
                    if (resp.data.code == 0) {

                        console.log('今日数据结构',resp.data.data);
                        this.hotsTodayRanking = _.keys(resp.data.data);
                        this.hotsTodayRankings = _.each(_.toArray(_.object(_.pairs(resp.data.data))), (value, key)=> {
                            return value.title = (this.hotsTodayRanking)[key];
                        });
                        const sexName=_.map(this.hotsTodayRanking,function(name){ return name.substring(0,4);});
                        this.hotsRankings=this.hotsTodayRankings;
                       // this.sexOption.xAxis.data=this.hotsTodayRanking;   //男女分布
                        //this.sexOption.xAxis.data=sexName;   //男女分布

                        console.log('hotsTodayRanking',this.hotsTodayRanking);
                        console.log('hotsTodayRankings',this.hotsTodayRankings);

                        //const sexdatak=_.keys(this.hotsTodayRankings[0].word_cloud);



                        this.sentimentSonOption.series[0].data[0].name=this.getw(this.hotsTodayRankings[0].word_cloud,0,1);
                        this.sentimentSonOption.series[0].data[1].name=this.getw(this.hotsTodayRankings[1].word_cloud,0,1);
                        this.sentimentSonOption.series[0].data[2].name=this.getw(this.hotsTodayRankings[2].word_cloud,0,1);
                        this.sentimentSonOption.series[0].data[3].name=this.getw(this.hotsTodayRankings[3].word_cloud,0,1);
                        this.sentimentSonOption.series[0].data[4].name=this.getw(this.hotsTodayRankings[4].word_cloud,0,1);
















                        const uiuys=this.hotsTodayRanking;





















                        //console.log('sexdatak',sexdatak);
                        //console.log('sexdatav',sexdatav);






                        if (this.activeHot.name == '') {
                            this.activeHot = {name: (this.hotsTodayRanking)[0], value: (this.hotsTodayRankings)[0]};

                            console.log('初始化this.activeHot', this.activeHot);
                            this.showChart(this.activeHot);
                    }
                }
            }
                )
                }
        },
        filters: {
            title(title){
                let hot = this.activeHot.name;
                const source = this.source;
                if(hot.length>=18){
                    hot = hot.substring(0,15)+'...';
                };
                return `${title} (${source}:${hot} )`;

            }
        },
        created(){
            this.getTodayList();
            this.getHotRealtime();


        },
        components:{ CardPanel }
    }
</script>
