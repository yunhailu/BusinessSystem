<template>
    <div class="app">
        <router-view keep-alive></router-view>
    </div>
</template>
<style lang="less">
    @import "App.less";
</style>
<script>

	import store from './vuex/store';
    import login from './mixin/login';

	export default {
		store,
        mixins: [login]
	}

</script>