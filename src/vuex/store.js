import Vue  from "vue";
import Vuex from "vuex";
import topic from "./modules/topic.js";
import analytics from "./modules/analytics.js";
import compare from "./modules/compare.js";
import exportImages from "./modules/exportImages.js";
import loginMsg from "./modules/loginMsg";
import summary from "./modules/summary";

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		topic, analytics, compare, exportImages,loginMsg,summary
	},
	strict: debug
})