<template>
	<header-component></header-component>
	<div class="main-panel">
		<div class="main-panel-wrap">
			<router-view></router-view>
		</div>
	</div>
</template>
<style lang="less">
	@import "Home.less";
</style>
<script>
	import {redirect} from "../../widgets/Auth";
	import HeaderComponent from '../Header/Header.vue';

	export default{
		data(){
			return{
				msg:'hello vue'
			}
		},
		components:{
			'header-component': HeaderComponent
		},
		route:{
//			activate(transition){
//				redirect('/');
//				transition.next()
//			}
		}
	}
</script>
