<template>
    <header-component active="analytics"></header-component>
        <div class="container">
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
                            <div class="detail-info-detail-item">{{author.gender}} | <a :href="article.link" target="_blank">去主页看看</a></div>
                            <div class="detail-info-detail-item">{{author.address}}</div>
                            <div class="detail-info-detail-intro">{{words.desc}} {{author.description}}</div>
                        </div>
                    </card-panel>
                </div>
            </div>

            <div class="row">
                <div class="col-md-9 detail-chart">
                    <card-panel :title="words.shareChart" >
                        <div class="chart" v-echarts="graphChartOption" :loading="graphChartLoading" theme="infographic"></div>
                    </card-panel>
                </div>
                <div class="col-md-3 detail-article">
                    <card-panel :title="words.article" >
                        <ul class="detail-article-list">
                            <li class="detail-article-list-item" v-for="acticle in acticles">
                                <a :href="acticle.link" target="_blank"><i class="fa fa-bookmark"></i> {{acticle.title}}</a>
                            </li>
                        </ul>
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
                    name: ""
                },
                article: {
                    source: '',
                    postDate: '',
                    link: '',
                    content: ''
                },

                acticles: [
                    {link: "", tilte: ""},
                    {link: "", tilte: ""},
                    {link: "", tilte: ""},
                    {link: "", tilte: ""},
                    {link: "", tilte: ""},
                    {link: "", tilte: ""},
                    {link: "", tilte: ""}
                ],

                graphChartLoading: false,
                graphChartOption: {
                    title: {
                        //text: '转发层级',
                        //subtext: 'Default layout',
                        //top: 'bottom',
                        //left: 'left'
                    },
                    tooltip: {},
                    legend: {
                        data: ["传播源点", "一层转发", "二层转发", "三层转发", "四层转发", "五层转发", "六层转发", "七层转发", "七层以上"],
                        left: 10,
                        width: 120
                    },
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            name: '传播路径',
                            type: 'graph',
                            layout: 'none',
                            data: [
                                {
                                    "id": "0",
                                    "name": "111111",
                                    "itemStyle": null,
                                    "symbolSize": 18.685715,
                                    "attributes": {"modularity_class": 0},
                                    "x": Math.random() * Math.random() * 1000 + Math.random(),
                                    "y": Math.random() * Math.random() * 1000 + Math.random(),
                                    "value": 8.685715,
                                    "label": {"normal": {"show": false}},
                                    "category": 0
                                },

                                {
                                    "id": "1",
                                    "name": "22222",
                                    "itemStyle": null,
                                    "symbolSize": 16.6666666666665,   //大小。
                                    "attributes": {"modularity_class": 0},
                                    "x": -417.26337, "y": 406.03506,
                                    "value": 4,
                                    "label": {
                                        "normal": {"show": false}
                                    },
                                    "category": 2
                                },

                                {
                                    "id": "2",
                                    "name": "MlleBaptistine",
                                    "itemStyle": null,
                                    "symbolSize": 16.323809333333333,
                                    "x": -212.76357,
                                    "y": 245.29176,
                                    "attributes": {"modularity_class": 1},
                                    "value": 9.485714,
                                    "label": {"normal": {"show": false}},
                                    "category": 3
                                },
                                {
                                    "id": "3",
                                    "name": "MmeMagloire",
                                    "itemStyle": null,
                                    "symbolSize": 16.323809333333333,
                                    "x": -242.82404,
                                    "y": 235.26283,
                                    "attributes": {"modularity_class": 1},
                                    "value": 9.485714,
                                    "label": {"normal": {"show": false}},
                                    "category": 4
                                },
                                {
                                    "id": "4",
                                    "name": "CountessDeLo",
                                    "itemStyle": null,
                                    "symbolSize": 12.6666666666666665,
                                    "x": -379.30386,
                                    "y": 429.06424,
                                    "attributes": {"modularity_class": 0},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 5
                                },
                                {
                                    "id": "5",
                                    "name": "Geborand",
                                    "itemStyle": null,
                                    "symbolSize": 21.6666666666666665,
                                    "x": -417.26337,
                                    "y": 406.03506,
                                    "attributes": {"modularity_class": 0},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 4
                                },
                                {
                                    "id": "6",
                                    "name": "Champtercier",
                                    "itemStyle": null,
                                    "symbolSize": 12.6666666666666665,
                                    "x": -332.6012,
                                    "y": 485.16974,
                                    "attributes": {"modularity_class": 0},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 4
                                },
                                {
                                    "id": "7",
                                    "name": "Cravatte",
                                    "itemStyle": null,
                                    "symbolSize": 12.6666666666666665,
                                    "x": -382.69568,
                                    "y": 475.09113,
                                    "attributes": {"modularity_class": 0},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 6
                                },
                                {
                                    "id": "8",
                                    "name": "Count",
                                    "itemStyle": null,
                                    "symbolSize": 21.6666666666666665,
                                    "x": -320.384,
                                    "y": 387.17325,
                                    "attributes": {"modularity_class": 0},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 7
                                },
                                {
                                    "id": "9",
                                    "name": "OldMan",
                                    "itemStyle": null,
                                    "symbolSize": 12.6666666666666665,
                                    "x": -344.39832,
                                    "y": 451.16772,
                                    "attributes": {"modularity_class": 0},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 8
                                },
                                {
                                    "id": "10",
                                    "name": "Labarre",
                                    "itemStyle": null,
                                    "symbolSize": 12.6666666666666665,
                                    "x": -89.34107,
                                    "y": 234.56128,
                                    "attributes": {"modularity_class": 1},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 1
                                },
                                {
                                    "id": "11",
                                    "name": "Valjean",
                                    "itemStyle": null,
                                    "symbolSize": 16.66666666666667,
                                    "x": -87.93029,
                                    "y": -6.8120565,
                                    "attributes": {"modularity_class": 1},
                                    "value": 100,
                                    "label": {"normal": {"show": true}},
                                    "category": 1
                                },
                                {
                                    "id": "12",
                                    "name": "Marguerite",
                                    "itemStyle": null,
                                    "symbolSize": 14.495239333333333,
                                    "x": -339.77908,
                                    "y": -184.69139,
                                    "attributes": {"modularity_class": 1},
                                    "value": 6.742859,
                                    "label": {"normal": {"show": false}},
                                    "category": 1
                                },
                                {
                                    "id": "13",
                                    "name": "MmeDeR",
                                    "itemStyle": null,
                                    "symbolSize": 12.6666666666666665,
                                    "x": -194.31313,
                                    "y": 178.55301,
                                    "attributes": {"modularity_class": 1},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 1
                                },
                                {
                                    "id": "14",
                                    "name": "Isabeau",
                                    "itemStyle": null,
                                    "symbolSize": 12.6666666666666665,
                                    "x": -158.05168,
                                    "y": 201.99768,
                                    "attributes": {"modularity_class": 1},
                                    "value": 4,
                                    "label": {"normal": {"show": false}},
                                    "category": 1
                                },],
                            links: [
                                {"id": "0", "name": null, "source": "1", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "1", "name": null, "source": "2", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "2", "name": null, "source": "3", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "3", "name": null, "source": "3", "target": "2", "lineStyle": {"normal": {}}},
                                {"id": "4", "name": null, "source": "4", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "5", "name": null, "source": "5", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "6", "name": null, "source": "6", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "7", "name": null, "source": "7", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "8", "name": null, "source": "8", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "9", "name": null, "source": "9", "target": "0", "lineStyle": {"normal": {}}},
                                {"id": "10", "name": null, "source": "11", "target": "0", "lineStyle": {"normal": {}}},
                                {
                                    "id": null,
                                    "name": null,
                                    "source": "11",
                                    "target": "2",
                                    "lineStyle": {"normal": {}}
                                },],
                            categories: [{"name": "传播源点"}, {"name": "一层转发"}, {"name": "二层转发"}, {"name": "三层转发"}, {"name": "四层转发"}, {"name": "五层转发"}, {"name": "六层转发"}, {"name": "七层转发"}, {"name": "七层以上"}],
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
                        boundaryGap: false,
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
                        this.acticles = resp.data.data;
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
                        const newDateS = _.map(firstdata, (item)=> {
                            item.category = item.level;
                            item.symbolSize = item.value * (0.5);
                            item.itemStyle = "null";
                            item.attributes = "{'modularity_class':0}";
                            item.label = "{'normal':{'show':false}}";
                            item.x = Math.random() * (-1) * Math.random() * 1000;
                            item.y = Math.random() * Math.random() * 1000;
                            return item;
                        });

                        const newDateL = _.map(firstlink, (item)=> {
                            item.source = item.src;
                            item.target = item.dst;
                            item.lineStyle = "{'normal':{}}";
                            return item;
                        });


                        console.log(newDateS);
                        console.log(newDateL);
                        console.log(resp.data.data.datas);

                        this.graphChartOption.series[0].data = newDateS;
                        this.graphChartOption.series[0].links = newDateL;


                        //this.acticles = resp.data.data;


                    }
                });


            },
            getArticleLine(){

                Api.getArticleLine().then(resp => {
                    console.log("getArticleLine", resp.data);
                    if (resp.data.code == 0) {

                        

                        const newDate1 = _.map(resp.data.data, (item)=> {
                            return item.date;

                        });
                        const newDate2 = _.map(resp.data.data, (item)=> {
                            return item.value;

                        });

                        this.timelineOption.series[0].data = newDate2;
                        this.timelineOption.xAxis.data = newDate1;

                        console.log(newDate2);


                    }
                });


            },
            



            init(){
                console.log(this.$route.params);
                this.getPageDetail();
                this.getArticleCorrelation();
                this.getArticleForward();
                this.getArticleLine();

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