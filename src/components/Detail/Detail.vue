<template>
	<header-component active="analytics"></header-component>
	<div class="detail">
		<div class="container">
			<div class="row">
				<div class="col-md-9 detail-content">
					<card-panel :title="words.content" >
						<div class="detail-content-sub">
							<span>{{words.source}}: {{sorce}}</span>
							<span>{{words.publish}}: {{postDate}}</span>
							<span><a :href="sorcelink" target="_blank">{{words.view}}</a></span>
						</div>
						<div class="detail-content-con">{{content}}</div>
					</card-panel>
				</div>
				<div class="col-md-3 detail-info">
					<card-panel :title="words.userInfo" >
						<img src="../../../images/avatar.png" class="detail-info-avatar"  />
						<div class="detail-info-detail">
							<div class="detail-info-detail-item">{{authorName}}</div>
							<div class="detail-info-detail-item">{{authorSex}} | <a :href="sorcelink" target="_blank">去主页看看</a></div>
							<div class="detail-info-detail-item">{{authorAddress}}</div>
							<div class="detail-info-detail-intro">{{words.desc}} {{description}}</div>
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
							<li class="detail-article-list-item" v-for="article in acticles">
								<a :href="article.link" target="_blank"><i class="fa fa-bookmark"></i> {{article.text}}</a>
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
	import { Chart, Pie } from '../../config/config';
	import { cardTimeline } from '../../config/tmpData';
	import CardPanel from '../Common/CardPanel/CardPanel.vue';
	import HeaderComponent from '../Header/Header.vue';
	import * as Api from "../../widgets/Api";

	export default {
		data(){
			const words = Local().detail;
			return {
				words,
				sorce:'wechat',
				postDate:'2016-04-05 19:32',
				sorcelink:'http://weibo.com',
				content:'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent!',
				authorName:'第一财经55日报',
				authorSex:'女',
				authorAddress:'北京 朝阳',
				description:'不在沉默着中爆发，就在沉默中灭亡...不在沉默着中爆发，就在沉默中灭亡...',
				acticles: [
					{link: "http://weibo.com", text: "诺贝尔化学奖揭晓 深度解读：分子马达与纳米火箭"},
					{link: "http://weibo.com", text: "辽宁遭抹平“最美野长城”被铁丝网围起 游客锐减"},
					{link: "http://weibo.com", text: "4名大学生爬野长城 雨天路滑迷失方向被困7小时"},
					{link: "http://weibo.com", text: "山东：几千游客滞留长岛 一日游变两日游"},
					{link: "http://weibo.com", text: "男子3次被判死缓终获无罪 申请赔偿1937万余元"},
					{link: "http://weibo.com", text: "诺贝尔化学奖揭晓 深度解读：分子马达与纳米火箭"},
					{link: "http://weibo.com", text: "辽宁遭抹平“最美野长城”被铁丝网围起 游客锐减"}
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
							name: 'Les Miserables',
							type: 'graph',
							layout: 'none',
							data: [
							    {   "id":"0",
									"name":"111111",
									"itemStyle":null,
									"symbolSize":18.685715,
									"attributes":{"modularity_class":0},"x":Math.random()*Math.random()*1000+Math.random(),"y":Math.random()*Math.random()*1000+Math.random(),
									"value":8.685715,
									"label":{"normal":{"show":false}},
									"category":0},

								{"id":"1",
									"name":"22222",
									"itemStyle":null,
									"symbolSize":16.6666666666665,   //大小。
									"attributes":{"modularity_class":0},"x":-417.26337,"y":406.03506,
									"value":4,
									"label":{
									"normal":{"show":false}},
									"category":2},

								{"id":"2",
									"name":"MlleBaptistine",
									"itemStyle":null,"symbolSize":16.323809333333333,"x":-212.76357,"y":245.29176,"attributes":{"modularity_class":1},"value":9.485714,"label":{"normal":{"show":false}},"category":3},
								{"id":"3","name":"MmeMagloire","itemStyle":null,"symbolSize":16.323809333333333,"x":-242.82404,"y":235.26283,"attributes":{"modularity_class":1},"value":9.485714,"label":{"normal":{"show":false}},"category":4},
								{"id":"4","name":"CountessDeLo","itemStyle":null,"symbolSize":12.6666666666666665,"x":-379.30386,"y":429.06424,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":5},
								{"id":"5","name":"Geborand","itemStyle":null,"symbolSize":21.6666666666666665,"x":-417.26337,"y":406.03506,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":4},
								{"id":"6","name":"Champtercier","itemStyle":null,"symbolSize":12.6666666666666665,"x":-332.6012,"y":485.16974,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":4},
								{"id":"7","name":"Cravatte","itemStyle":null,"symbolSize":12.6666666666666665,"x":-382.69568,"y":475.09113,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":6},
								{"id":"8","name":"Count","itemStyle":null,"symbolSize":21.6666666666666665,"x":-320.384,"y":387.17325,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":7},
								{"id":"9","name":"OldMan","itemStyle":null,"symbolSize":12.6666666666666665,"x":-344.39832,"y":451.16772,"attributes":{"modularity_class":0},"value":4,"label":{"normal":{"show":false}},"category":8},
								{"id":"10","name":"Labarre","itemStyle":null,"symbolSize":12.6666666666666665,"x":-89.34107,"y":234.56128,"attributes":{"modularity_class":1},"value":4,"label":{"normal":{"show":false}},"category":1},
								{"id":"11","name":"Valjean","itemStyle":null,"symbolSize":16.66666666666667,"x":-87.93029,"y":-6.8120565,"attributes":{"modularity_class":1},"value":100,"label":{"normal":{"show":true}},"category":1},
								{"id":"12","name":"Marguerite","itemStyle":null,"symbolSize":14.495239333333333,"x":-339.77908,"y":-184.69139,"attributes":{"modularity_class":1},"value":6.742859,"label":{"normal":{"show":false}},"category":1},
								{"id":"13","name":"MmeDeR","itemStyle":null,"symbolSize":12.6666666666666665,"x":-194.31313,"y":178.55301,"attributes":{"modularity_class":1},"value":4,"label":{"normal":{"show":false}},"category":1},
								{"id":"14","name":"Isabeau","itemStyle":null,"symbolSize":12.6666666666666665,"x":-158.05168,"y":201.99768,"attributes":{"modularity_class":1},"value":4,"label":{"normal":{"show":false}},"category":1},],
							links: [
							    {"id":"0","name":null,"source":"1","target":"0","lineStyle":{"normal":{}}},
								{"id":"1","name":null,"source":"2","target":"0","lineStyle":{"normal":{}}},
								{"id":"2","name":null,"source":"3","target":"0","lineStyle":{"normal":{}}},
								{"id":"3","name":null,"source":"3","target":"2","lineStyle":{"normal":{}}},
								{"id":"4","name":null,"source":"4","target":"0","lineStyle":{"normal":{}}},
								{"id":"5","name":null,"source":"5","target":"0","lineStyle":{"normal":{}}},
								{"id":"6","name":null,"source":"6","target":"0","lineStyle":{"normal":{}}},
								{"id":"7","name":null,"source":"7","target":"0","lineStyle":{"normal":{}}},
								{"id":"8","name":null,"source":"8","target":"0","lineStyle":{"normal":{}}},
								{"id":"9","name":null,"source":"9","target":"0","lineStyle":{"normal":{}}},
								{"id":"10","name":null,"source":"11","target":"0","lineStyle":{"normal":{}}},
								{"id":null,"name":null,"source":"11","target":"2","lineStyle":{"normal":{}}},],


							categories: [{"name":"传播源点"},{"name":"一层转发"},{"name":"二层转发"},{"name":"三层转发"},{"name":"四层转发"},{"name":"五层转发"},{"name":"六层转发"},{"name":"七层转发"},{"name":"七层以上"}],
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
					title: _.extend({}, Chart.title, { show: false}),
					tooltip: _.extend({}, Chart.tooltip, {
						axisPointer : { type : 'line' }
					}),
					grid: _.extend({}, Chart.grid, {
						left: '3%', right: '6%', top: '5%', bottom: '0%'
					}),
					//toolbox: Chart.toolbox,
					xAxis: _.extend({}, Chart.xAxis, {
						type : 'category',  //category
						data: cardTimeline.xAxis,
						boundaryGap : false,
						splitLine: {
							lineStyle: {
								type: 'dotted' //solid  dashed  dotted
							}
						}
					}),
					yAxis: _.extend({}, Chart.yAxis, {
						type : 'value',
						boundaryGap : false
					}),
					progressive: 4,
					textStyle: Chart.textStyle,
					series : [{
						name:"数量",
						type:'line',
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
				Api.getPageDetail({ id }).then(resp => {
					console.log("getPageDetail", resp.data);
					if(resp.data.code == 0){


						// this.name = detail.name;
						// this.details = detail.data;
					}
				});
			},


			// randFunction(i) {
			// 	return Math.round(Math.random()* 100 * i);
			// },

			getPageDetail0(){

				        this.sorce='1wechat1',
						this.postDate='2016-14-05 39:32',
						this.sorcelink='http://weibo.com',
						this.content='不在沉默着中爆发，就在沉默中灭亡!',
						this.authorName='第一财经532425日报',
						this.authorSex='男',
						this.authorAddress='北京 海淀',
						this.description='不在沉默着中爆发，就在沉默中灭亡...不在沉默着中爆发，就在沉默中灭亡...',
						this.acticles= [
					{link: "http://weibo.com", text: "不在沉默着中爆发，就在沉默中灭亡"},
					{link: "http://baidu.com", text: "不在沉默着中爆发，就在沉默中灭亡"},
					{link: "http://weibo.com", text: "不在沉默着中爆发，就在沉默中灭亡"},
					{link: "http://weibo.com", text: "不在沉默着中爆发，就在沉默中灭亡"},
					{link: "http://weibo.com", text: "不在沉默着中爆发，就在沉默中灭亡"},
					{link: "http://weibo.com", text: "不在沉默着中爆发，就在沉默中灭亡"},
					{link: "http://weibo.com", text: "不在沉默着中爆发，就在沉默中灭亡"}
				]

			},


			init(){
				console.log(this.$route.params);
				this.getPageDetail0();
				this.getPageDetail();


			}
		},
		components:{
			HeaderComponent, CardPanel
		},
		route: {
			data(){
				this.init();
			}
		}
	}
</script>