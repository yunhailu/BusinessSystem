<template>
	<div class="container">
		<div class="home-page">
			<form class="form-horizontal">
				<fieldset>
					<legend>
						<img class="logo-icon" src="images/logo.jpg" />
						<span>沃德商业智能系统平台</span>
					</legend>
					<div class="form-group search">
						<div class="col-md-offset-1 col-md-8">
							<input type="text" v-model="hotEvent" class="form-control"  placeholder="Search Hot Event">
						</div>
						<div class="col-md-2">
							<a v-link="{name: 'main'}" type="button" class="btn btn-primary">搜索热点</a>
						</div>
					</div>
				</fieldset>
			</form>

			<div class="platform">
				<ul class="row">
					<li v-for="button in buttons" class="col-md-3">
						<div class="button-item" @click="changeBtn" :name="button.name">
							<div class="top-border" v-show="button.isActive"></div>
							<img :src="button.pic" class="check-icon" />
							<span class="check-name">{{button.name}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "home.less";
</style>
<script>

	import {redirect} from "../../widgets/Auth";
	import _ from "underscore";

	export default {
		data(){
			return {
				hotEvent: '',
				buttons: [{
					pic: "images/logo.jpg",
					name: "facebook",
					isActive: false
				},{
					pic: "images/logo.jpg",
					name: "twitter",
					isActive: false
				},{
					pic: "images/logo.jpg",
					name: "google",
					isActive: false
				},{
					pic: "images/logo.jpg",
					name: "youtube",
					isActive: false
				},{
					pic: "images/logo.jpg",
					name: "baidu",
					isActive: false
				},{
					pic: "images/logo.jpg",
					name: "weibo",
					isActive: false
				}]
			};
		},
		methods: {
			changeBtn(event){
				console.log(event.target);
				console.log( event.target.getAttribute('name'));
				_.each(this.buttons, (value, index) => {
					if(value.name == event.target.getAttribute('name') || value.name == event.target.parentNode.getAttribute('name')){
						value.isActive = !value.isActive;
					}
				});
			}
		},
		route:{
			activate(transition){
				redirect();
				transition.next()
			}
		}
	}

</script>