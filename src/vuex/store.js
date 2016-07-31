

import Vue  from "vue"
import Vuex from "vuex"
import address from "./modules/address.js"

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		address: address
	},
	strict: debug
})