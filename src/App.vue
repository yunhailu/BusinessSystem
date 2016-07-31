<template>
    <div class="app">
        <router-view keep-alive></router-view>
    </div>
</template>
<style lang="less">
    @import "App.less";
</style>
<script>

	import store from './vuex/store'

	export default {

		store: store
		
	}

</script>