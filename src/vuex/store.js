

import Vue  from "vue";
import Vuex from "vuex";
import address from "./modules/address.js";
import topic from "./modules/topic.js";

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		address,
		topic
	},
	strict: debug
})