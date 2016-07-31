<template>
	<div class="detail">
		<ul>
			<li v-for="addr in addrMap" @click="changeAddr(addr)">
				{{addr.city}}--{{addr.area}}
			</li>
		</ul>

		<div v-if="defaultAddr">
			{{defaultAddr.city}} -- {{defaultAddr.area}}
		</div>
	</div>
</template>
<style lang="less">
	@import "detail.less";
</style>
<script>

	import { addrMaps, defaultAddr} from '../../vuex/getters'
	import changeAddr from '../../vuex/actions'

	export default {
		name: 'detail',
		created: function() {
			console.log('detail created')
		},
		vuex: {
			getters: {
				addrMap: addrMaps,
				defaultAddr: defaultAddr
			},

			actions: {
				changeAddr: changeAddr
			}
		},
		methods: {
		}
	}
</script>