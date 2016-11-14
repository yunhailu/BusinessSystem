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
                        <td><i class="fa fa-smile-o"></i> {{words.sentiment}}</td>
                        <td><i class="fa fa-bell-o"></i> <span>{{words.trigger}}</span></td>
                        <td><i class="fa fa-exchange"></i> <span>{{words.lastChange}}</span></td>
                        <!--<td><i class="fa fa-tags"></i> {{words.lastSent}}</td>-->
                        <td><i class="fa fa-edit"></i> {{words.actions}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(index, report) in reports" :class="[index % 2 == 0 ? '' : '']">
                        <td>{{report.name}}</td>
                        <td> 高兴</td>
                        <td>123</td>
                        <td>{{report.date}}</td>
                        <!--<td> / </td>-->
                        <!--<td>{{report.lastSent}}</td>-->
                        <td>

                            <i class="fa fa-edit  actionBtn" @click="viewAction(report);"></i>
                            <i class="fa fa-envelope-o actionBtn" @click="emailAction(report);"></i>
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


    <footer-component></footer-component>
</template>
<style lang="less" scoped>
    @import "Reports.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import Local from "../../local/local";
    import HeaderComponent from '../Header/Header.vue';
    import Page from '../Common/Page/Page.vue';
    import * as Api from '../../widgets/Api';
    import { getCookie } from '../../widgets/Cookie';
    import FooterComponent from '../OrderFooter/OrderFooter.vue';

    export default{
        data(){
            const words = Local().reportsWarning;
            return{
                words,
                name: "监测预警",
                reports: [],
            }
        },
        ready(){
            this.init();
        },
        methods: {
            viewAction(report){
                console.log('view', report);
                this.$router.go({ name: 'dashboardDetail', params: { id: report.id } });
            },
            emailAction(report){
                console.log('email', report);
                location.href = `mailto:${getCookie('business_email')}?CC=${getCookie('business_email')}&BCC=${getCookie('business_email')}&Subject=发送报告-${report.name}&Body=你好`;
            },
            getDashboardList(){
                const user_id = getCookie('business_id');
                Api.getDashboardList({ user_id }).then(resp => {
                    //console.log(resp.data);
                    if(resp.data.code == 0){
                        this.reports = resp.data.data;
                    }
                });
            },
            init(){
                this.getDashboardList();
            }
        },
        components:{ HeaderComponent, Page,FooterComponent }
    }
</script>
