<template>
	<header-component active="home"></header-component>
	<div class="home-panel">
		<div class="home-panel-wrap">
			<div class="container">
				<ul class="home-panel-wrap-list row">
					<li class="home-panel-wrap-list-item col-md-4"  v-for="item in items">
						<div class="home-panel-wrap-list-item-container">
							<a v-link="{name: 'home'}" class="home-panel-wrap-list-item-container-link">
								<i class="fa fa-2x icon" :class="item.icon"></i>
								<span class="title">{{item.name}}</span>
								<div class="dec">{{item.dec}}</div>
							</a>
						</div>
					</li>
				</ul>

				<div class="home-panel-wrap-dashboard row">
					<div class="home-panel-wrap-dashboard-container">
						<i class="fa fa-2x icon" :class="dashboard.icon"></i>
						<span class="title">{{dashboard.name}}</span>
						<div class="dec">{{dashboard.dec}}</div>
						<ul class="row dashboard-items">
							<li class="col-md-3 item" v-for="item in dashboardList">
								<div class="item-con" >
									<a class="item-con-link">
										<i class="fa fa-2x" :class="dashboard.icon"></i>
										<span>{{item.name}}</span>
									</a>
								</div>
							</li>
						</ul>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "Home.less";
</style>
<script type="text/ecmascript-6">
	import {redirect} from "../../widgets/Auth";
	import HeaderComponent from '../Header/Header.vue';
	import Local from "../../local/local";

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
				dashboardList: [{
					name: "Ali Pictures 7d",
					link: ""
				},{
					name: "Hillary About China",
					link: ""
				},{
					name: "Brand Listening",
					link: ""
				}],
				items: [{
					id: "analytics",
					name: words.analytics,
					dec: words.analyticsDec,
					icon: "fa-line-chart",
					link: ""
				},{
					id: "reports",
					name: words.reports,
					dec: words.reportsDec,
					icon: "fa-file-text-o",
					link: ""
				},{
					id: "setting",
					name: words.setting,
					dec: words.settingDec,
					icon: "fa-cog",
					link: ""
				}]
			}
		},
		components:{
			'header-component': HeaderComponent
		},
		route:{

		}
	}
</script>
