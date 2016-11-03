<template>
    <header-component active="analytics"></header-component>
        <div class="container">
            <br>
            <div class="row">
                <div class="col-md-9 detail-content">
                    <card-panel :title="words.content" >
                        <div class="detail-content-sub">
                            <span>{{words.source}}: {{article.source}}</span>
                            <span>{{words.publish}}: {{article.postDate}}</span>
                            <span><a :href="article.link" target="_blank">{{words.view}}</a></span>
                        </div>
                        <div class="detail-content-con">{{article.content}}</div>
                    </card-panel>
                </div>
                <div class="col-md-3 detail-info">
                    <card-panel :title="words.userInfo" >
                        <img src="../../../images/avatar.png" class="detail-info-avatar"  />
                        <div class="detail-info-detail">
                            <div class="detail-info-detail-item">{{author.name}}</div>
                            <div class="detail-info-detail-item">{{author.gender}} | <a :href="article.home" target="_blank">去主页看看</a></div>
                            <div class="detail-info-detail-item">{{author.address}}</div>
                            <div class="detail-info-detail-intro">{{words.desc}} {{author.description}}</div>
                        </div>
                    </card-panel>
                </div>
            </div>
<br>
            <div class="row">
                <div class="col-md-9 detail-chart">
                    <card-panel :title="words.shareChart" >
                        <div class="chart" v-echarts="graphChartOption" :loading="graphChartLoading" theme="infographic"></div>
                    </card-panel>
                </div>
                <div class="col-md-3 detail-article">
                    <card-panel :title="words.article" >
                        <!--<ul class="detail-article-list">-->
                            <!--<li class="detail-article-list-item" v-for="acticle in acticles">-->
                                <!--<a :href="acticle.link" target="_blank"><i class="fa fa-bookmark"></i> {{acticle.title}}</a>-->
                            <!--</li>-->
                        <!--</ul>-->
                        <div class="detail-timeline-chart" v-echarts="timeclevelOption" :loading="timelineLoading" theme="macarons"></div>


                    </card-panel>
                </div>
                <div class="col-md-3 detail-timeline">
                    <card-panel :title="words.timeline" >
                        <div class="detail-timeline-chart" v-echarts="timelineOption" :loading="timelineLoading" theme="macarons"></div>
                    </card-panel>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Detail.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Local from '../../local/local';
    import {Chart, Pie} from '../../config/config';
    import {cardTimeline} from '../../config/tmpData';
    import CardPanel from '../Common/CardPanel/CardPanel.vue';
    import HeaderComponent from '../Header/Header.vue';
    import * as Api from "../../widgets/Api";

    export default {
        data(){
            const words = Local().detail;
            return {
                words,
                author: {
                    address: "",
                    description: "",
                    gender: "",
                    name: "",

                },
                article: {
                    source: '',
                    postDate: '',
                    link: '',
                    content: '',
                    home:""
                },

                // acticles: [
                //     {link: "", tilte: ""},
                //     {link: "", tilte: ""},
                //     {link: "", tilte: ""},
                //     {link: "", tilte: ""},
                //     {link: "", tilte: ""},
                //     {link: "", tilte: ""},
                //     {link: "", tilte: ""}
                // ],

                graphChartLoading: false,
                graphChartOption: {
                    title: {
                       text: '      转发数：',
                        textStyle: {
                            fontStyle: 'normal',
                            fontWeight: 'border',
                            fontSize: 16,
                        },
                        top:0,
                        left: 'right'
                    },
                    tooltip: {

                        formatter: '{b}'
                    },
                    legend: {
                        data: ["传播源点", "一层转发", "二层转发", "三层转发", "四层转发", "五层转发", "六层转发","六层以上"],
                        left: 10,
                        top:23,
                        width: 120
                    },
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',

                    series: [
                        {
                            name: '传播路径',
                            type: 'graph',
                            layout: 'force',
                            force: {
                                initLayout:"circular",
                                repulsion: 50,
                                gravity: 0.1,
                                layoutAnimation: true,
                            },
                            draggable:true,
                            data: [],
                            links: [],
                            categories: [{"name": "传播源点"}, {"name": "一层转发"}, {"name": "二层转发"}, {"name": "三层转发"}, {"name": "四层转发"}, {"name": "五层转发"}, {"name": "六层转发"}, {"name": "六层以上"}],
                            roam: true,
                            label: {
                                normal: {
                                    position: 'right',
                                    formatter: '{b}'
                                }
                            }
                        }
                    ]
                },
                timelineLoading: false,
                timelineOption: {
                    title: _.extend({}, Chart.title, {show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {
                        axisPointer: {type: 'line'}
                    }),
                    grid: _.extend({}, Chart.grid, {
                        left: '3%', right: '6%', top: '5%', bottom: '0%'
                    }),
                    //toolbox: Chart.toolbox,
                    xAxis: _.extend({}, Chart.xAxis, {
                        type: 'category',  //category
                        data: cardTimeline.xAxis,
                        boundaryGap: true,
                        splitLine: {
                            lineStyle: {
                                type: 'dotted' //solid  dashed  dotted
                            }
                        }
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'value',
                        boundaryGap: false
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    series: [{
                        name: "数量",
                        type: 'line',
                        //areaStyle: {normal: {}},
                        //stack: 'Total',
                        data: cardTimeline.data
                    }]
                },

                timeclevelOption: {
                    title: _.extend({}, Chart.title, {show: false}),
                    tooltip: _.extend({}, Chart.tooltip, {
                        axisPointer: {type: 'line'}
                    }),
                    grid: _.extend({}, Chart.grid, {
                        left: '3%', right: '6%', top: '5%', bottom: '0%'
                    }),
                    //toolbox: Chart.toolbox,
                    xAxis: _.extend({}, Chart.xAxis, {
                        type: 'category',  //category
                        data: cardTimeline.xAxis,
                        boundaryGap: true,
                        splitLine: {
                            lineStyle: {
                                type: 'dotted' //solid  dashed  dotted
                            }
                        }
                    }),
                    yAxis: _.extend({}, Chart.yAxis, {
                        type: 'value',
                        boundaryGap: false
                    }),
                    progressive: 4,
                    textStyle: Chart.textStyle,
                    series: [{
                        name: "层级",
                        type: 'bar',
                        //areaStyle: {normal: {}},
                        //stack: 'Total',
                        data: cardTimeline.data
                    }]
                }

            }
        },
        methods: {
            getPageDetail(){
                const id = this.$route.params.id;
                Api.getPageDetail({id}).then(resp => {
                    console.log("getPageDetail", resp.data);
                    if (resp.data.code == 0) {

                        //接口的详情的数据的更新
                         this.author = resp.data.data.author;
                         this.article = resp.data.data.article;

                    }
                    else {

                    }
                });
            },
            getArticleCorrelation(){
                const id = this.$route.params.id;
                Api.getArticleCorrelation({id}).then(resp => {
                    console.log("getArticleCorrelation", resp.data);
                    if (resp.data.code == 0) {
                        //this.acticles = resp.data.data;
                    }
                });
            },
            getArticleForward(){
                const id = this.$route.params.id;
                Api.getArticleForward({id}).then(resp => {
                    console.log("getArticleForward", resp.data);
                    if (resp.data.code == 0) {


                        const firstdata = resp.data.data.datas;
                        const firstlink = resp.data.data.links;

                        const nodestyle0={normal:{show:false}};
                        const nodestyle1={modularity_class:0};
                        const newDateS = _.map(firstdata, (item)=> {
                           // item.name=item.id;
                            item.category = item.level;
                            item.symbolSize = 15;
                            item.itemStyle = "null";
                            item.attributes = nodestyle1;
                            item.label = nodestyle0;
                            //item.x = Math.random() * (-1) * Math.random() * 1000;
                            //item.y = Math.random() * Math.random() * 1000;
                            return item;
                        });

                        const newDateScout=_.size(newDateS)-1;

                        const linstyle0={normal:{color:'#000',width:1,type:'solid'}};
                        const newDateL = _.map(firstlink, (item)=> {
                            item.name="";
                            item.source = ''+item.src+'';
                            item.target = ''+item.dst+'';
                            item.lineStyle=linstyle0;
                            item.lineStyle=linstyle0;
                            // item.value =40;

                            return item;
                        });

                        console.log(newDateS);
                        console.log(newDateL);
                        this.graphChartOption.series[0].data = newDateS;
                        this.graphChartOption.series[0].links = newDateL;
                        this.graphChartOption.title.text="转发次数："+newDateScout+"次";


                        //转发的line 的数据请求的
                        const newDate1 = _.map(resp.data.data.forward, (item)=> {
                            return item.date;

                        });
                        const newDate2 = _.map(resp.data.data.forward, (item)=> {
                            return item.value;

                        });

                        this.timelineOption.series[0].data = newDate2;
                        this.timelineOption.xAxis.data = newDate1;

                        console.log(newDate2);

                        //this.acticles = resp.data.data;


                    }
                });


            },


            init(){
                console.log(this.$route.params);
                this.getPageDetail();
                this.getArticleCorrelation();
                this.getArticleForward();


                // this.DEEE();


            }
        },
        components: {
            HeaderComponent, CardPanel
        },
        route: {
            data(){
                this.init();
            }
        }
    }
</script>