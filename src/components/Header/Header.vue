<template>
    <header class="header">
        <div class="logo">{{words.title}}</div>
        <nav class="navbar navbar-static-top" role="navigation">
            <div class="navbar-center">
                <ul class="nav navbar-nav">
                    <li class="tab-item" v-for="tab in tabs">
                        <a href="javascript:void(0);" v-link="{name: tab.link}">
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
                            <span>Jane Doe <i class="caret"></i></span>
                        </a>
                    </li>
                    <li class="dropdown quit right" @click="quit">
                        <a href="javascript:void(0);">{{words.quit}}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
<style lang="less">
    @import "Header.less";
</style>
<script>
    import Cookie from "js-cookie";
    import Local from "../../local/local";

    export default{
        data(){
            const words = Local().header;
            return{
                words,
                tabs: [{
                    name: words.home,
                    icon: "fa-home",
                    link: "home"
                },{
                    name: words.analytics,
                    icon: "fa-line-chart",
                    link: ""
                },{
                    name: words.dashboard,
                    icon: "fa-adjust",
                    link: ""
                },{
                    name: words.reports,
                    icon: "fa-file-text-o",
                    link: ""
                },{
                    name: words.setting,
                    icon: "fa-cog",
                    link: ""
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
