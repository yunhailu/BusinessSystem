import Vue  from "vue";
import Vuex from "vuex";
import topic from "./modules/topic.js";
import analytics from "./modules/analytics.js";
import compare from "./modules/compare.js"

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		topic, analytics,compare
	},
	strict: debug
})