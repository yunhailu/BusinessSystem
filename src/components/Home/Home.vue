<template>
	<header-component active="home"></header-component>
	<div class="home-panel">
		<div class="home-panel-wrap">
			<div class="container">
				<ul class="home-panel-wrap-list row">
					<li class="home-panel-wrap-list-item col-md-5" :class="$index % 2 ? 'col-md-offset-1' : ''" v-for="item in items">
						<div class="home-panel-wrap-list-item-container">
							<i class="fa fa-3x icon" :class="item.icon"></i>
							<span class="title">{{item.name}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "Home.less";
</style>
<script>
	import {redirect} from "../../widgets/Auth";
	import HeaderComponent from '../Header/Header.vue';
	import Local from "../../local/local";

	export default{
		data(){
			const words = Local().home;
			return{
				words,
				items: [{
					id: "analytics",
					name: words.analytics,
					icon: "fa-line-chart",
					link: ""
				},{
					id: "dashboard",
					name: words.dashboard,
					icon: "fa-adjust",
					link: ""
				},{
					id: "reports",
					name: words.reports,
					icon: "fa-file-text-o",
					link: ""
				},{
					id: "setting",
					name: words.setting,
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
