<template>

    <div class="hot-panel"  >


        <div class="row" name="dfs1">

<img class="logo-icon pull-left"  src="../Media/images/gushi.png" />
            <label for="sourchWord" class="col-sm-2 control-label"></label>
            <button type="submit" id="sourchWordSumit"  value="sou" class="btn btn-primary" v-on:click="getSourchData(sourchWord)" >搜索</button>
            <div class="col-sm-4 " id="sourchWordbox">
                <input type="text" v-model="sourchWord" class="form-control" id="sourchWord" :placeholder="words.topic"  @keyup.enter="getSourchData(sourchWord)">
            </div>


            <div class="col-sm-4 tip">

            </div>
        </div>

        <div class="row">
            <card-panel :title="displayTitle">
                <br>
                <br>
                <div class="col-md-12 hot-today">
                    <ul class="hot-today-list">
                        <li v-for="item in Titles"  class="hot-today-list-item" @click="getRefreshData(item.title,item.subtopic,$index);">
                            <span class="hot-today-list-item-index">{{ ($index + 1) }}</span>
                            <span class="hot-today-list-item-text">{{item.title}}</span>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar" aria-valuenow="60" v-bind:style="{width:item.value/maxHot+'%'} " aria-valuemin="0"  aria-valuemax="100">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </card-panel>
        </div> <!--财经热点的列表-->

        <div class="row">
            <card-panel :title="'情绪表现:'+sonTitle">

            <div class="col-md-7 hot-today">

                <div v-echarts="sentimentLineOption" :loading="sentimentLineLoading" class="hot-sentiment-pie"  theme=""></div><!--sentimentLineOption,macarons-->

            </div>

            <div class="col-md-5 hot-sentiment">

                    <div v-echarts="sentimentPieOption" :loading="sentimentPieLoading" class="hot-sentiment-pie" theme=""></div><!--sentimentPieOption,macarons-->

            </div>

            </card-panel>
        </div> <!--情绪趋势line+pie-->

        <!--情绪比例，热词排行-->
        <div class="row">
            <card-panel :title="'词云分布'+sonTitle">
            <div class="col-md-6 hot-words">

                    <div v-echarts="hotWordsOption" :loading="hotWordsLoading" class="hot-words-cloud" ></div>

            </div>



                <div class="col-md-6 titleSon">

                    <br>
                    <span class="sexmen">相关子话题</span>

                    <ul class="titleSon-list">
                        <li v-for="subtopic in subtopics"  class="titleSon-list-item" >
                            <a :href="subtopic.link" target="_blank" >
                            <span class="titleSon-list-item-index">{{ ($index + 1) }}</span>
                            <span class="titleSon-list-item-text">{{subtopic.title}}</span>
                            </a>
                        </li>
                    </ul>

                </div>

            </card-panel>
        </div>

        <div class="row">
            <card-panel :title="'性别比例:'+sonTitle">
            <div class="col-md-6 hot-sentiment">

                    <div v-echarts="sexOption" :loading="sexLoading" class="hot-sentiment-pie" theme=""></div><!--infographic,macarons-->
            </div>

            <div class="col-md-6 hot-sentiment">

                <div v-echarts="sexPieOption" :loading="sexPieLoading" class="hot-sentiment-pie" theme=""></div><!--infographic,macarons-->

            </div>

            </card-panel>
        </div>

    

        <div class="row">
            <card-panel :title="'性别关注:'+sonTitle">
                <br>
                <br>
            <div class="col-md-6 hot-ranking">
                <span class="sexmen1">男性关注</span>
                <br>
            <ul class="hot-ranking-list">
            <li v-for="item in follow0"  class="hot-ranking-list-item"  @click="showDetail(item.mid)" >

            <span class="hot-ranking-list-item-index">{{ ($index + 1) }}</span>
            <span class="hot-ranking-list-item-text">{{item.title}}</span>

            </li>
            </ul>

            </div>

            <div class="col-md-6 hot-ranking">
                <span class="sexmen1">女性关注</span>
                <br>
                    <ul class="hot-ranking-list">

                        <li v-for="item in follow1"  class="hot-ranking-list-item" @click="showDetail(item.mid)" >
                            <!--<a :href="item.link" target="_blank" >-->
                            <span class="hot-ranking-list-item-index">{{ ($index + 1) }}</span>
                            <span class="hot-ranking-list-item-text">{{item.title}}</span>
                            <!--</a>-->
                        </li>

                    </ul>

            </div>
            </card-panel>
        </div>

        <!--sourch-for-->


    </div>

<qservice> </qservice>


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
    import qservice from '../QQservice/QQservice.vue';

    export default{
        props: ['sourchWord'],
        data(){
            const words = Local().hotEvent;
            const common = Local().common;
            return{
                words,
                common,

                Titles:[
                    {title:'MORE Health携手美国最新儿童白血病临床试验',value:142},
                    {title:'全国微信1000强月度报告（2016.11）丨清博指数独家',value:93},
                    {title:'乐视否认员工排队离职，传高层四处筹钱找合作',value:83},
                    {title:'复盘”罗尔事件：短短几天 慈善捐款事件大翻转',value:53},
                    {title:'罗尔事件：每个重大事件发生其实都是社会一次进化',value:33}
                ],
                displayTitle:'财经热点排行榜',
                sonTitle:'(#金马奖# 金马53荣耀时刻最佳女主角)',
                subtopics:[{title:'#金马奖# 金马53荣耀时刻最佳女主角访谈影音曝光',value:42},
                    {title:'@范冰冰 表示如果没有电影的故事和画面',value:53},
                    {title:'可能构不成一个很完整的她',value:23},
                    {title:'周冬雨 透露和@马思纯 有不一样的沟通方式',value:33},
                    {title:'生活，吴可熙称喜爱的所有元素都在电影里',value:43}],
                sontitle:'子话题的表现',
                img: "",
                mywort:false,
                maxHot:123,


                follow0:[
                    '#金马奖# 金马53荣耀时刻最佳女主角访谈影音曝光',
                    '@范冰冰 表示如果没有电影的故事和画面',
                    '可能构不成一个很完整的她',
                    '周冬雨 透露和@马思纯 有不一样的沟通方式',
                    '生活，吴可熙称喜爱的所有元素都在电影里'

                ],

                follow1:[
                    '#金马奖# 金马53荣耀时刻最佳女主角访谈影音曝光',
                    ' @范冰冰 表示如果没有电影的故事和画面',
                    '可能构不成一个很完整的她',
                    '周冬雨 透露和@马思纯 有不一样的沟通方式',
                    '生活，吴可熙称喜爱的所有元素都在电影里'

                ],
            lineseries:[
                        {
                            name:'满意',
                            type:'line',
                            stack: '总量',
                            data:[120, 12, 11, 134, 90, 230, 210]
                        },
                        {
                            name:'愤怒',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 11, 234, 290, 330, 310]
                        },
                        {
                            name:'失望',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 14, 190, 330, 410]
                        },
                        {
                            name:'反感',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'害怕',
                            type:'line',
                            stack: '总量',
                            data:[20, 32, 1, 94, 190, 330, 130]
                        }
                    ],

            start:'2016-12-05',
            end:'2016-12-11',
            topic:'罗一笑',
            subtopic:'事件',
                activeHot: {
                    name: "",
                    value: ""
                },


                // 热点情绪占比

                sentimentLineOption:{
                    title: {
                        text: '热点情绪占比',
                        show:false
                    },
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid:{
                        left:0,
                        right:'5%',
                        bottom:'3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        axisTick: {
                            show: true,
                            alignWithLabel: false,
                            interval: 'auto',
                            inside: true,
                            length: 2,},
                        axisLabel: {
                            show: true,
                            interval:0,
                            inside: false,
                            rotate: 15
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    graphic:Chart.graphic,
                    series:[
                        {
                            name:'满意',
                            type:'line',
                            stack: '总量',
                            data:[120, 12, 11, 134, 90, 230, 210]
                        },
                        {
                            name:'愤怒',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 11, 234, 290, 330, 310]
                        },
                        {
                            name:'失望',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 14, 190, 330, 410]
                        },
                        {
                            name:'反感',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'害怕',
                            type:'line',
                            stack: '总量',
                            data:[20, 32, 1, 94, 190, 330, 130]
                        }
                    ]
                },
                sentimentLineLoading:false,

                sentimentPieOption:{
                    title : {
                        // text: '年龄分布',
                        subtext: '情绪分布',
                        x:'center'
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    color:['#2FCC71','#E64D3D', '#F1C40F', '#3598DC', '#737373'],
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {

                        left: 'left',
                        data: ["满意","愤怒","失望","反感","害怕"]
                    },
                    graphic:Chart.graphic,
                    series : [
                        {
                            label: {
                                normal: {
                                    show:true,
                                    formatter: " {b}:({d}%)"

                                }},
                            name: '情绪分布',
                            type: 'pie',
                            radius: ['45%', '65%'],
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'满意'},
                                {value:310, name:'愤怒'},
                                {value:234, name:'失望'},
                                {value:135, name:'反感'},
                                {value:1548,name:'害怕'}


                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
                sentimentPieLoading:false,

                sexOption: {
                    // title: {
                    //     text:'性别分布'
                    // },
                    tooltip: {
                        trigger: 'item',

                    },
                    color:[ '#3598DC', '#737373'],
                    legend: {
                        data:'性别'
                    },
                    xAxis: {
                        data: ['男','女']
                    },
                    yAxis: {},
                    graphic:Chart.graphic,
                    series: [{
                        barGap:'40%',
                        barWidth:25,
                        name: '性别',
                        type: 'bar',
                        data: [15,24],
                        label: {
                            normal: {
                                show:true,
                                formatter: " {c}"

                            }}
                    }]
                },
                sexLoading:false,

                sexPieOption:{
                title : {

                    subtext: '男女比例',
                    x:'center'
                },
                tooltip : {

                },
                graphic:Chart.graphic,

                series : [
                    {
                        name: '男女比例',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'男'},
                            {value:310, name:'女'},
                        ],
                        label: {
                            normal: {
                                show:true,
                                formatter: " {b}:({d}%)"

                            }},
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
                sexPieLoading:false,

                ageOption:{
                    // title: {
                    //     text:'性别分布'
                    // },
                    tooltip: {},
                    color:[  '#91C7AE', '#737373'],
                    legend: {
                        data:['年龄分布']
                    },
                    xAxis: {
                        data: ["0~20岁","20~30岁","30~40岁","40~50岁","50~60岁","60岁以上"]
                    },
                    yAxis: {},
                    series: [{
                        barWidth:20,
                        name: '年龄分布',
                        type: 'bar',
                        data: [54, 20, 36, 16, 18, 20]
                    }]
                },
                ageLoading:false,

                agePieOption:{
                    title : {
                        // text: '年龄分布',
                        subtext: '年龄分布',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {

                        left: 'left',
                        data: ["0~20岁","20~30岁","30~40岁","40~50岁","50~60岁","60岁以上"]
                    },
                    series: [
                        {
                            label: {
                                normal: {
                                    show:true,
                                    formatter: " {b}:({d}%)"

                                }},
                            name: '年龄分布',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'0~20岁'},
                                {value:310, name:'20~30岁'},
                                {value:234, name:'30~40岁'},
                                {value:135, name:'40~50岁'},
                                {value:1548, name:'50~60岁'},
                                {value:1548, name:'60岁以上'}

                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
                agePieLoading:false,

                //我的数据整理
                allTitle:[],
                sentimentLineData:[],

                //我的数据整理

                //实时热点排行
                hotsRanking: [],
                hotsRankings:{},
                popHotsRanking:[],

                //热点字符云
                hotWordsLoading: false,
                hotWordsOption: {
                    tooltip: {},
                    graphic:Chart.graphic,
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
                         data: [{"name":"brush1","value":1.7320508075688772},
                                {"name":"brush2","value":2.7320508075688772},
                                {"name":"brush3","value":6.7320508075688772}]
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
                    series:[]
                },
                scatterLoading: true,
                //气泡图热点事件


            }
        },
        methods: {
            //my functions


            //sourch function
            getdateymd(a){
            const date = new Date(a);
                const Y = date.getFullYear()+'-';
                const M = (date.getMonth()+1< 10 ? '0'+(date.getMonth()+1):date.getMonth()+1)+'-';
                const D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate());
                return Y+M+D;
            },

            showDetail(xids){
                if(xids!=null){ window.open(window.location.origin+"/"+this.$route.name+"/detail/"+xids);}
            },

            trim(str){
                return str.replace(/(^\s*)|(\s*$)/g,'');
            },
            getSourchData(a){
                //sourch-function
                console.log('aaa:',a);

<<<<<<< HEAD
                if(_.isEmpty(a)){
=======

                if(_.isEmpty(this.trim(a))){
>>>>>>> 83dedc58dd18b53cb438bfc4f3bbd1414c1c9138
                    alert('关键词不为空！请重新输入！！！');

            }
            else{

                    console.log(a);

                    const iu = _.now();
                    this.start = this.getdateymd(iu - (60 * 60 * 24 * 1000) * 7).toString();
                    this.end = this.getdateymd(iu).toString();



                    const start = this.start;
                    const end = this.end;
                    this.topic = a;
                    const topic = a;
                    Api.getMediaHotspot({topic, start, end}).then(resp => {
                        if (resp.data.code == 0) {
                            //const HotspotData = resp.data.data;

                            this.Titles = _.sortBy(resp.data.data, function (item) {
                                return -item.value;
                            });

                            const swer = _.values(_.pick(_.first(this.Titles), 'value'));
                            this.maxHot = _.flatten(swer, true)[0] / 109;
                            this.sonTitle = this.Titles[0].title;

                            this.getRefreshData(this.Titles[0].title, this.Titles[0].subtopic);


                        }
                    });


                }




            },

            getRefreshData(title,subtopics){
            this.sonTitle=title;
            //console.log('subtopic',subtopics);
            //const maxHot =this.maxHot;
            const myss=this.lineseries;

            const start=this.start;
            const end=this.end;
            const topic=this.topic;
            const subtopic=subtopics;



            Api.getMediaWordcloud({topic, subtopic, start, end}).then(resp => {
                    if(resp.data.code ==0){
                        const mediaData = resp.data.data;

                        console.log('weakj:',resp.data.data);
                        this.subtopics=mediaData.subtopics;
                        this.hotWordsOption.series.data=mediaData.wordcloud;
                    }
                });

            Api.getMediaGender({topic, subtopic, start, end}).then(resp => {
                if(resp.data.code ==0){
                    const mediaData0 = resp.data.data;
                    const conte0=mediaData0.focus;
                    const adada=_.omit(mediaData0.gender,'n');
                this.sexOption.series[0].data=_.values(adada);
                const degs= _.map(adada,(value,key)=>{
                    if (key=='m'){key="男"};
                    if (key=='f'){key="女"};
                    return {"name":key,"value":value}
                });

                this.sexPieOption.series[0].data=degs;
                console.log('wanglipeng:',this.sexPieOption.series[0].data);
                console.log('wanglipeng2:',mediaData0.focus);


                this.follow0=mediaData0.focus.m;
                this.follow1=mediaData0.focus.f;

                    } });

                Api.getMediaMood({topic, subtopic, start, end}).then(resp => {
                if(resp.data.code ==0){


                  const mediaMood =_.sortBy(resp.data.data, 'date');
                  const sdf=_.map(mediaMood,(item)=>{
                    item=_.values(_.pick(item,'date'));
                    return item;
                });

                this.sentimentLineOption.xAxis.data=_.flatten(sdf,true);


                 const sdf1=_.map(mediaMood,(item)=>{
                    item=_.values(_.pick(item,'mood'));
                    return item;
                });
                const sdf2=_.flatten(sdf1,true);
                const happy0=_.map(sdf2,(item)=>{
                    item=_.values(_.pick(item,'happy'));
                    return item;
                });
                 const happy=_.flatten(happy0,true);
                 const anger0=_.map(sdf2,(item)=>{
                    item=_.values(_.pick(item,'anger'));
                    return item;
                });
                const anger=_.flatten(anger0,true);


                 const sorrow0=_.map(sdf2,(item)=>{
                    item=_.values(_.pick(item,'sorrow'));
                    return item;
                });
                const sorrow=_.flatten(sorrow0,true);


                const disgust0=_.map(sdf2,(item)=>{
                    item=_.values(_.pick(item,'disgust'));
                    return item;
                });
                const disgust=_.flatten(disgust0,true);

                const fear0=_.map(sdf2,(item)=>{
                    item=_.values(_.pick(item,'fear'));
                    return item;
                });
                const fear=_.flatten(fear0,true);

                const lineserie=_.map(myss,(item)=>{
                    if(item.name=='满意'){item.data=happy;};
                    if(item.name=='愤怒'){item.data=anger;};
                    if(item.name=='失望'){item.data=disgust;};
                    if(item.name=='害怕'){item.data=fear;};
                    if(item.name=='反感'){item.data=sorrow;};
                    item.value=_.reduce(item.data, function(memo, num){ return memo + num; }, 0);
                    return item;
                });

                this.sentimentLineOption.series=lineserie;
                this.sentimentPieOption.series[0].data=_.map(lineserie,(item)=>{
                    item=_.pick(item,'name','value');
                    return item;
                });


                }
            });


            },

//            getRefreshData1(title,idx){
//                //接受参数title数值
//                this.sonTitle=title;
//                //const bidx=idx;
//                //情绪数据的处理
//
//             const newData=this.allData;
//             console.log('yyy',title);
//             console.log('yyy',newData);
//
//             const titleKeys=_.keys(this.allData);
//             const contents1= _.values(this.allData);
//             const contents2=_.map(contents1, (item)=> {
//                    item=_.pick(item,'hotValue');
//                    return item;
//                });
//                console.log('yyy',titleKeys);
//                console.log('y21121yy',contents2);
//
//
//
//
//
//             console.log('contents1',contents1[idx].sentiment);
//             const newDateLa = _.map(contents1[idx].sentiment, (item)=> {
//                    item.type='line';
//                    item.stack='总量';
//                    item.value=_.reduce(item.data, function(memo, num){ return memo + num; }, 0);
//                    return item;
//                });
//
//                this.sentimentLineOption.xAxis.data=contents1[idx].date;
//                this.sentimentLineOption.series=newDateLa; // chartlines
//                this.sentimentPieOption.series[0].data=_.map(newDateLa, (item)=> {
//                    item=_.pick(item,'name','value');
//                    return item;
//                });
//
//                //key-value的转化
//                this.hotWordsOption.series.data=_.map(contents1[idx].word_cloud,(value,key)=>{
//                    return {"name":key,"value":value}
//                });
//                this.subtopics=contents1[idx].subtopic;
//
//                const sexData=_.map(contents1[idx].sex,(item)=>{
//                    item=_.values(_.pick(item,'value'));
//                    return item;
//                });
//                this.sexOption.series[0].data=_.flatten(sexData);
//                this.sexPieOption.series[0].data=contents1[idx].sex;
//
//                const ageData=_.map(contents1[idx].age,(item)=>{
//                    item=_.values(_.pick(item,'value'));
//                    return item;
//                });
//
//                console.log('ageData',ageData);
//                this.ageOption.series[0].data=_.flatten(ageData);
//                this.agePieOption.series[0].data=contents1[idx].age;
//                this.follow0=_.values(contents1[idx].follow)[0];
//                this.follow1=_.values(contents1[idx].follow)[1];
////---------------------------------------------------------------------------
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//            },


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
            this.getSourchData('陈赫');
           //this.getSourchData('罗一笑');

        },
        components:{ CardPanel,qservice}

    }
</script>
