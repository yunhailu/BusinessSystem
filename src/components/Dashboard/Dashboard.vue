<template>
    <header-component active="dashboard"></header-component>
    <div class="dashboard-panel">
        <div class="dashboard-panel-wrap">
            <div class="container">
                <div class="dashboard-panel-wrap-dashboard row">
                    <div class="dashboard-panel-wrap-dashboard-container">
                        <i class="fa fa-2x icon" :class="dashboard.icon"></i>
                        <span class="title">{{dashboard.name}}</span>
                        <div class="dec">{{dashboard.dec}}</div>
                        <ul class="row dashboard-items">
                            <li class="col-md-3 item" v-for="item in dashboardList">
                                <div class="item-con" >
                                    <a class="item-con-link" v-link="item.link">
                                        <i class="fa fa-2x" :class="dashboard.icon"></i>
                                        <span>{{item.name}}</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Dashboard.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import HeaderComponent from '../Header/Header.vue';
    import Local from "../../local/local";

    export default{
        data(){
            const words = Local().dashboard;
            return{
                words,
                dashboard: {
                    name: words.dashboard,
                    dec: words.dashboardDec,
                    icon: "fa-adjust",
                },
                dashboardList: [{
                    name: "Ali Pictures 7d",
                    link: {
                        name: "dashboardDetail",
                        params:{ id: "123" }
                    }
                },{
                    name: "Hillary About China",
                    link: {
                        name: "dashboardDetail",
                        params:{ id: "456" }
                    }
                },{
                    name: "Brand Listening",
                    link: {
                        name: "dashboardDetail",
                        params:{ id: "789" }
                    }
                }],
            }
        },
        components:{
            HeaderComponent
        }
    }
</script>
