<template>
    <header class="header">
        <div class="logo">
            <!--<img src="../../../images/logo.jpg" />-->
            <span>{{words.title}}</span>
        </div>
        <ul class="navbar-center">
            <li class="tab-item" v-for="tab in tabs">
                <a href="javascript:void(0);" v-link="{name: tab.link}" :class="active == tab.id ? 'active' : ''">
                    <i class="fa" :class="[tab.icon]" aria-hidden="true"></i>
                    <span class="header-font">{{tab.name}}</span>
                </a>
            </li>
        </ul>
        <ul class="navbar-right">
            <li class="tab-item">
                <a href="javascript:void(0);" v-link="{name: 'profile'}" class="dropdown-toggle" >
                <!--<a href="javascript:void(0);" >-->
                    <i class="glyphicon glyphicon-user"></i>
                    <span class="header-font">{{nickName}} <i class="caret"></i></span>
                </a>
            </li>
            <li  class="tab-item" @click="quit">
                <a href="javascript:void(0);"  class="header-font"><i class="fa fa-power-off"></i> {{words.quit}}</a>
            </li>
        </ul>
    </header>
</template>
<style lang="less">
    @import "Header.less";
</style>
<script type="text/ecmascript-6">
    import Cookie from "js-cookie";
    import Local from "../../local/local";
    import { getCookie } from '../../widgets/Cookie';
    import {loginTime} from '../../vuex/getters';
    import {setLoginTime} from '../../vuex/actions';

    export default{
        props: ["active"],
        data(){
            const words = Local().header;
            return{
                words,
                nickName: getCookie('business_name'),
                tabs: [{
                    id: "home",
                    name: words.home,
                    icon: "fa-home",
                    link: "home"
                },{
                    id: "analytics",
                    name: words.analytics,
                    icon: "fa-line-chart",
                    link: "analytics"
                },{
                    id: "compare",
                    name: words.compare,
                    icon: "fa-paper-plane",
                    link: "compare"
                },{
                    id: "dashboard",
                    name: words.dashboard,
                    icon: "fa-adjust",
                    link: "dashboard"
                },{
                    id: "reports",
                    name: words.reports,
                    icon: "fa-file-text-o",
                    link: "reports"
                },{
                    id: "setting",
                    name: words.setting,
                    icon: "fa-cog",
                    link: "setting"
                }]
            }
        },
        vuex:{
            getters:{loginTime},
            actions:{setLoginTime}
        },
        methods: {
            quit(){
                if(getCookie('business_name')=="demo03"){
                    Cookie.remove('business_uid');
                    Cookie.remove('bussiness_name');
                    this.$router.go({name: "ccsi"});
                }else{
                    Cookie.remove('business_uid');
                    Cookie.remove('bussiness_name');
                    this.$router.go({name: "login"});
                }
            },
            initData(){
                this.nickName = getCookie('business_name');
            },
            init(){
                this.initData();
            }
        },
        watch:{
            loginTime:{
                handler(val){
                    if(val !=0){
                        this.initData();
                    }
                }
            }
        }
    }
</script>
