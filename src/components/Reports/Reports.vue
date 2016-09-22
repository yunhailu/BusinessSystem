<template>
    <header-component active="reports"></header-component>
    <div class="reports">
        <div class="reports-wrap">
            <div class="container">
                <div class="reports-wrap-title">
                    <div class="title"><i class="fa fa-lightbulb-o"></i> <span>{{name}}</span></div>
                </div>
                <div class="reports-wrap-table">
                    <table class="table table-hover  table-striped">
                        <thead>
                        <tr>
                            <td><i class="fa fa-fire"></i> <span>REPORT TITLE</span></td>
                            <td><i class="fa fa-exchange"></i> <span>LAST CHANGE</span></td>
                            <td><i class="fa fa-cube"></i> <span>TRIGGER</span></td>
                            <td><i class="fa fa-tags"></i> LAST SENT</td>
                            <td><i class="fa fa-edit"></i> ACTIONS</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index, report) in reports" :class="[index % 2 == 0 ? '' : '']">
                            <td>{{report.title}}</td>
                            <td>{{report.lastChange}}</td>
                            <td>{{report.trigger}}</td>
                            <td>{{report.lastSent}}</td>
                            <td>
                                <i class="fa fa-pencil actionBtn" @click="editAction(report);"></i>
                                <i class="fa fa-envelope-o actionBtn" @click="emailAction(report);"></i>
                                <i class="fa fa-copy actionBtn" @click="copyAction(report);"></i>
                                <i class="fa fa-download actionBtn" @click="downloadAction(report);"></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="reports-wrap-paging">
                    <page></page>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Reports.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import HeaderComponent from '../Header/Header.vue';
    import Page from '../Common/Page/Page.vue';

    export default{
        data(){
            return{
                name: "Reports & Alerts",
                reports: [{
                    id: 123,
                    title: "Ali Pictuers 7d",
                    lastChange: "03/08/16 14:39",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 456,
                    title: "Hillary about China",
                    lastChange: "03/08/16 17:57",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 789,
                    title: "Brand Listening",
                    lastChange: "05/08/16 10:13",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 135,
                    title: "Ali Pictuers 7d",
                    lastChange: "03/08/16 14:39",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 246,
                    title: "Hillary about China",
                    lastChange: "03/08/16 17:57",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 357,
                    title: "Brand Listening",
                    lastChange: "05/08/16 10:13",
                    trigger: "/",
                    lastSent: "Never sent"
                } ,{
                    id: 468,
                    title: "Ali Pictuers 7d",
                    lastChange: "03/08/16 14:39",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 579,
                    title: "Hillary about China",
                    lastChange: "03/08/16 17:57",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 680,
                    title: "Brand Listening",
                    lastChange: "05/08/16 10:13",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 147,
                    title: "Ali Pictuers 7d",
                    lastChange: "03/08/16 14:39",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 258,
                    title: "Hillary about China",
                    lastChange: "03/08/16 17:57",
                    trigger: "/",
                    lastSent: "Never sent"
                }, {
                    id: 369,
                    title: "Brand Listening",
                    lastChange: "05/08/16 10:13",
                    trigger: "/",
                    lastSent: "Never sent"
                }]
            }
        },
        methods: {
            editAction(report){
                console.log('edit', report);
            },
            emailAction(report){
                console.log('email', report);
            },
            copyAction(report){
                console.log('copy', report);
            },
            downloadAction(report){
                console.log('download', report);
            }
        },
        components:{
            HeaderComponent,
            Page
        }
    }
</script>
