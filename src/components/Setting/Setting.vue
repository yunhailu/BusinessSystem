<template>
    <header-component active="setting"></header-component>
    <div>{{name}}</div>
</template>
<style>
    @import "Setting.less";
</style>
<script>
    import HeaderComponent from '../Header/Header.vue';

    export default{
        data(){
            return{
                name:'Setting'
            }
        },
        components:{
            HeaderComponent
        }
    }
</script>
