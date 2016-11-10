<template>
	<header-component active="home"></header-component>
	<div class="home-panel">
		<div class="home-panel-wrap">
			<div class="container">
				<!--<ul class="home-panel-wrap-list row">-->
					<!--<li class="home-panel-wrap-list-item col-md-3"  v-for="item in items">-->
						<!--<div class="home-panel-wrap-list-item-container">-->
							<!--<a v-link="item.link" class="home-panel-wrap-list-item-container-link">-->
								<!--<i class="fa fa-2x icon" :class="item.icon"></i>-->
								<!--<span class="title">{{item.name}}</span>-->
								<!--<div class="dec">{{item.dec}}</div>-->
							<!--</a>-->
						<!--</div>-->
					<!--</li>-->
				<!--</ul>-->

				<!--<div class="home-panel-wrap-dashboard row">-->
					<!--<div class="home-panel-wrap-dashboard-container">-->
						<!--<i class="fa fa-2x icon" :class="dashboard.icon"></i>-->
						<!--<span class="title">{{dashboard.name}}</span>-->
						<!--<div class="dec">{{dashboard.dec}}</div>-->
						<!--<ul class="row dashboard-items">-->
							<!--<li class="col-md-3 item" v-for="item in dashboardList">-->
								<!--<div class="item-con" >-->
									<!--<a v-link="item.link" class="item-con-link">-->
										<!--<i class="fa fa-2x" :class="dashboard.icon"></i>-->
										<!--<span>{{item.name}}</span>-->
									<!--</a>-->
								<!--</div>-->
							<!--</li>-->
						<!--</ul>-->
					<!--</div>-->
				<!--</div>-->
				<hot-event></hot-event>
			</div>
			<footer-component></footer-component>
		</div>

	</div>



</template>
<style lang="less">
	@import "Home.less";
</style>
<script type="text/ecmascript-6">
	import _ from 'underscore';
	import {redirect} from "../../widgets/Auth";
	import HeaderComponent from '../Header/Header.vue';
	import HotEvent from '../HotEvent/HotEvent.vue';
	import FooterComponent from '../Footer/Footer.vue';
	import Local from "../../local/local";
	import * as Api from "../../widgets/Api";

	export default{
		data(){
			const words = Local().home;
			return{
				words,
				dashboard: {
					name: words.dashboard,
					dec: words.dashboardDec,
					icon: "fa-adjust",
				},
				dashboardList: [],
				items: [{
					id: "analytics",
					name: words.analytics,
					dec: words.analyticsDec,
					icon: "fa-line-chart",
					link: {name: 'analytics'}
				},{
					id: "compare",
					name: words.compare,
					dec: words.compareDec,
					icon: "fa-balance-scale",
					link: {name: 'compare'}
				},{
					id: "reports",
					name: words.reports,
					dec: words.reportsDec,
					icon: "fa-file-text-o",
					link: {name: 'reports'}
				},{
					id: "setting",
					name: words.setting,
					dec: words.settingDec,
					icon: "fa-cog",
					link: "setting"
				}]
			}
		},
		methods: {
			getDashboardList(){
				Api.getDashboardList({}).then(resp => {
					console.log('getDashboardList', resp.data);
					if(resp.data.code == 0){
						const list = resp.data.data;
						this.dashboardList = _.map(list, item => {
							item.link = {name: 'dashboardDetail', params: {id: item.id}};
							return item;
						});
					}
				});
			},
			init(){
				this.getDashboardList();
			}
		},
		components:{
			HeaderComponent, HotEvent,FooterComponent
		},
		route:{
			data(){
				this.init();
			}
		}
	}
</script>
