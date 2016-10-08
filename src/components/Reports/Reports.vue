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
                            <td><i class="fa fa-fire"></i> <span>{{words.reportTitle}}</span></td>
                            <td><i class="fa fa-exchange"></i> <span>{{words.lastChange}}</span></td>
                            <td><i class="fa fa-cube"></i> <span>{{words.trigger}}</span></td>
                            <td><i class="fa fa-tags"></i> {{words.lastSent}}</td>
                            <td><i class="fa fa-edit"></i> {{words.actions}}</td>
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
    import Local from "../../local/local";
    import HeaderComponent from '../Header/Header.vue';
    import Page from '../Common/Page/Page.vue';

    export default{
        data(){
            const words = Local().reports;
            return{
                words,
                name: "Reports & Alerts",
                reports: [{
                    id: 123,
                    title: "阿里影业",
                    lastChange: "03/08/16 14:39",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 456,
                    title: "中国希拉里",
                    lastChange: "03/08/16 17:57",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 789,
                    title: "品牌听力",
                    lastChange: "05/08/16 10:13",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 135,
                    title: "阿里影业",
                    lastChange: "03/08/16 14:39",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 246,
                    title: "中国希拉里",
                    lastChange: "03/08/16 17:57",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 357,
                    title: "品牌听力",
                    lastChange: "05/08/16 10:13",
                    trigger: "/",
                    lastSent: "从未发送"
                } ,{
                    id: 468,
                    title: "阿里影业",
                    lastChange: "03/08/16 14:39",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 579,
                    title: "中国希拉里",
                    lastChange: "03/08/16 17:57",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 680,
                    title: "品牌听力",
                    lastChange: "05/08/16 10:13",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 147,
                    title: "阿里影业",
                    lastChange: "03/08/16 14:39",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 258,
                    title: "中国希拉里",
                    lastChange: "03/08/16 17:57",
                    trigger: "/",
                    lastSent: "从未发送"
                }, {
                    id: 369,
                    title: "品牌听力",
                    lastChange: "05/08/16 10:13",
                    trigger: "/",
                    lastSent: "从未发送"
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
