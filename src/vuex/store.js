import Vue  from "vue";
import Vuex from "vuex";
import topic from "./modules/topic.js";
import analytics from "./modules/analytics.js";

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		topic, analytics
	},
	strict: debug
})