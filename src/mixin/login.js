import _ from 'underscore';

import Vue from 'vue';

import VueResource from 'vue-resource';

import Cookie from "js-cookie";

import { WhiteList } from "../config/config";

Vue.use(VueResource);

let isLogin = false;


const login = {

	isLogin(){
		return isLogin || !!Cookie.get('business_uid');
	},
	login () {
	},
	auth(to, callback) {
		const user = Cookie.get('business_uid');
		if(user){
			location.href = '/' + hash;
			return true;
		}

		// 白名单处理
		const whiteName = _.filter(WhiteList, item => (item.domain == location.origin));
		if(!whiteName.length){
			location.href = '/login';
			return false;
		}
		location.href = '/' + whiteName[0].link;
		return false;
	}
}

export default {
	methods: login,
	created(){
		console.log("login mixin created")
	}
}