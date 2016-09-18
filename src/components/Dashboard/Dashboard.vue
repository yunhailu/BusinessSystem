<template>
    <header-component active="dashboard"></header-component>
    <div>Dashboard Panel</div>
</template>
<style lang="less" scoped>
    @import "Dashboard.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import HeaderComponent from '../Header/Header.vue';

    export default{
        data(){
            return{

            }
        },
        components:{
            HeaderComponent
        }
    }
</script>
