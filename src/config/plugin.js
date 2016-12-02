
import Vue from 'vue'
import Resource from 'vue-resource'
import VueTouch from 'vue-touch'
import Router from 'vue-router'
import Vuex from 'vuex'
import App from '../App.vue'
import router from './router'
import Echarts from '../widgets/echarts';

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
		Vue.directive('echarts', Echarts);
	},
	resourceGlobalSetting() {
		//Vue.http.options.root = "";
	},
	runRouter() {
		var routeMap = this.createRouteMap();
		var router = this.router = new Router({
			hashbang : false,
			history : true,
			root : '/'
		});

		router.beforeEach(this.beforeEach.bind(router));
		router.afterEach(this.afterEach.bind(router));

		router.map(routeMap);
		router.start(App,"#app");
		console.log('App-launch');
	},
	createRouteMap() {
		var map = router;
		return map;
	},
	beforeEach( transition ) {
		var to = transition.to,
			app = to.router.app;
		if( to.auth && !app.isLogin() ){
			app.auth(to, () => {
				transition.next()
			})
		}else{
			transition.next()
		}
	},
	afterEach( transition ) {
		document.body.scrollTop = 0
	}
}

export default plugin