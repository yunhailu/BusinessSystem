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
    import * as Api from "../../widgets/Api";

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
                    name: "阿里影业",
                    link: {
                        name: "dashboardDetail",
                        params:{ id: "123" }
                    }
                },{
                    name: "中国希拉里",
                    link: {
                        name: "dashboardDetail",
                        params:{ id: "456" }
                    }
                },{
                    name: "品牌听力",
                    link: {
                        name: "dashboardDetail",
                        params:{ id: "789" }
                    }
                }],
            }
        },
        methods: {
            getDashboardList(){
                Api.getDashboardList({}).then(resp => {
                    console.log('getDashboardList', resp.data);
                    if(resp.data.code == 0){
                        const list = resp.data.data;
                        this.dashboardList = _.map(list, item => {
                            item.link = {name: 'dashboardDetail', params: {id: item.id}};
                            return item;
                        });
                    }
                });
            },
            init(){
                this.getDashboardList();
            }
        },
        components:{
            HeaderComponent
        },
        route:{
            data(){
                this.init();
            }
        }
    }
</script>
