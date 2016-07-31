

import Vue from 'vue'
import Resource from 'vue-resource'
import VueTouch from 'vue-touch'
import Router from 'vue-router'
import Vuex from 'vuex'
import App from '../App.vue'

var plugin = {
	init(){
		this.initVuePlugins();
		//this.resourceGlobalSetting();
		this.runRouter();
	},

	initVuePlugins() {
		Vue.use(Router);
		Vue.use(Resource);
		Vue.use(VueTouch);
		Vue.use(Vuex);

	},
	resourceGlobalSetting() {
		Vue.http.options.root = "";
	},
	runRouter() {
		var routeMap = this.createRouteMap();
		var router = this.router = new Router({
			//hashbang : false,
			//history : true,
			root : '/'
		});
			
		router.map(routeMap);
		router.start(App,"#app");
		console.log('App-launch');
	},
	createRouteMap() {
		var map = {
			'/': {
				name: 'home',
				component (resolve) {
					require(['../components/Home/Home.vue'], resolve);
				}
			},
			'/detail': {
				name: 'detail',
				component (resolve) {
					require(['../components/Detail/Detail.vue'], resolve);
				}
			}
		}
		return map;
	}
}

export default plugin