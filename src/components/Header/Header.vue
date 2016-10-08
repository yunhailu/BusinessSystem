<template>
    <header class="header">
        <div class="logo">
            <!--<img src="../../../images/logo.jpg" />-->
            <span>{{words.title}}</span>
        </div>
        <nav class="navbar navbar-static-top" role="navigation">
            <div class="navbar-center">
                <ul class="nav navbar-nav">
                    <li class="tab-item" v-for="tab in tabs">
                        <a href="javascript:void(0);" v-link="{name: tab.link}" :class="active == tab.id ? 'active' : ''">
                            <i class="fa fa-2x" :class="[tab.icon]" aria-hidden="true"></i>
                            <span>{{tab.name}}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="navbar-right">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu right">
                        <a href="javascript:void(0);" class="dropdown-toggle" >
                            <i class="glyphicon glyphicon-user"></i>
                            <span>管理员 <i class="caret"></i></span>
                        </a>
                    </li>
                    <li class="dropdown quit right" @click="quit">
                        <a href="javascript:void(0);"><i class="fa fa-power-off"></i> {{words.quit}}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
<style lang="less">
    @import "Header.less";
</style>
<script type="text/ecmascript-6">
    import Cookie from "js-cookie";
    import Local from "../../local/local";

    export default{
        props: ["active"],
        data(){
            const words = Local().header;
            return{
                words,
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
        methods: {
            quit(){
                Cookie.remove('business_uid');
                this.$router.go({name: "login"});
            }
        }
    }
</script>
