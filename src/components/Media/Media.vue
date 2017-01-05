<template>
	<div class="home-panel">
		<div class="home-panel-wrap">
			<div class="container">

				<media-display></media-display>
			</div>
			<order-footer-component></order-footer-component>
		</div>

	</div>



</template>
<style lang="less" scoped>
	@import "Media.less";
</style>
<script type="text/ecmascript-6">
	import _ from 'underscore';
	import {redirect} from "../../widgets/Auth";
	import MediaDisplay from '../MediaDisplay/MediaDisplay.vue';
	import OrderFooterComponent from '../OrderFooter/OrderFooter.vue';
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
			 MediaDisplay,OrderFooterComponent
		},
		route:{
			data(){
				this.init();
			}
		}
	}
</script>
