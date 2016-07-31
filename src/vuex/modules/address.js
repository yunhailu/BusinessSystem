

import { CHANGE_CURRNET_ADDR } from '../mutations-types'

const state = {
	addrMap: {
		addr1: { city: '北京', area: '朝阳区'},
		addr2: { city: '贵阳', area: '白云区'},
		addr3: { city: '深圳', area: '南山区'},
		addr4: { city: '肇庆', area: '鼎湖区'}
	},
	defaultAddr: { city: '北京', area: '朝阳区'},
	currentAddr: null
}

const mutations = {
	CHANGE_CURRNET_ADDR (state, addr) {
		state.defaultAddr = addr
	}
}

export default {
	state,
	mutations
}