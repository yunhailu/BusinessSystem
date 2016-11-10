<template>
    <header-component active="dashboard"></header-component>
    <div class="dashboard-panel">
        <div class="dashboard-panel-wrap">
            <div class="container">
                <div class="dashboard-panel-wrap-dashboard row">
                    <div class="dashboard-panel-wrap-dashboard-container">
                        <i class="fa icon" :class="dashboard.icon"></i>
                        <span class="title">{{dashboard.name}}</span>
                        <div class="dec">{{dashboard.dec}}</div>
                        <ul class="row dashboard-items">
                            <li class="col-md-3 item" v-for="item in dashboardList">
                                <div class="item-con" >
                                    <a class="item-con-link" v-link="item.link">
                                        <i class="fa" :class="dashboard.icon"></i>
                                        <span>{{item.name}}</span>
                                    </a>
                                </div>
                                <div class="item-close" @click="deleteDashboard(item)">
                                    <i class="fa" :class="[activeId != item.id ? 'fa-close' : 'fa-spinner fa-spin']"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div><footer-component></footer-component>
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
    import FooterComponent from '../Footer/Footer.vue';

    export default{
        data(){
            const words = Local().dashboard;
            return{
                words,
                activeId: '',
                dashboard: {
                    name: words.dashboard,
                    dec: words.dashboardDec,
                    icon: "fa-adjust",
                },
                dashboardList: [],
            }
        },
        methods: {
            getDashboardList(){
                Api.getDashboardList({}).then(resp => {
                    console.log('getDashboardList', resp.data);
                    if(resp.data.code == 0){
                        const list = resp.data.data;
                        /**
                         *   {
                         *       name: "阿里影业",
                         *       link: {
                         *           name: "dashboardDetail",
                         *           params:{ id: "123" }
                         *       }
                         *   }
                         * */
                        this.dashboardList = _.map(list, item => {
                            item.link = {name: 'dashboardDetail', params: {id: item.id}};
                            return item;
                        });
                    }
                });
            },
            deleteDashboard(item){
                console.log(item);
                if(this.activeId == item.id) return ;
                const id = item.id || "";
                this.activeId = id;
                Api.deleteDashboard({ id }).then(resp => {
                    console.log(resp.data);
                    if(resp.data.code == 0 && resp.data.data.data == 1){
                        this.dashboardList = _.filter(this.dashboardList, dashboard => {
                            return dashboard.id != id;
                        });
                    }
                    this.activeId = "";
                });
            },
            init(){
                this.getDashboardList();
            }
        },
        components:{
            HeaderComponent,FooterComponent,
        },
        route:{
            data(){
                this.init();
            }
        }
    }
</script>
