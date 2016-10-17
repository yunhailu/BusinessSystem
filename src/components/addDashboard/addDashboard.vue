<template>
    <tips :visible.sync="visiable" :tipsparam.sync="addParams">
        <div class="add-panel">
            <ul id="myTab" class="nav nav-tabs">
                <li :class="[isNew ? 'active' : '']" @click="setNewPanel(1);"><a href="javascript:void(0);" >添加新的报表</a></li>
                <li :class="[isNew ? '' : 'active']" @click="setNewPanel(0);"><a href="javascript:void(0);">导入到已有的报表</a></li>
            </ul>
            <div class="add-panel-new" v-if="isNew">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="dashName" class="col-sm-3 control-label">新增名称</label>
                        <div class="col-sm-8">
                            <input type="email" class="form-control" id="dashName" placeholder="报表名称">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="submit" class="btn btn-primary">提交</button>
                            <button type="submit" class="btn btn-default" @click="close">取消</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="add-panel-import" v-if="!isNew">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label for="selectName" class="col-sm-3 control-label">选择已存在名称</label>
                        <!--<div class="col-sm-8">-->
                            <!--<input type="email" class="form-control" id="selectName" placeholder="报表名称">-->
                        <!--</div>-->
                        <div class="col-sm-8 selectEl">
                            <select-el :options="selectOptions" :title="selectTitle" :value.sync="selectValue"></select-el>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="submit" class="btn btn-primary">提交</button>
                            <button type="submit" class="btn btn-default" @click="close">取消</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </tips>
</template>
<style lang="less" scoped>
    @import "addDashboard.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import Tips from '../Common/Tips/Tips.vue';
    import SelectEl from '../Common/Select/Select.vue';
    import * as Api from '../../widgets/Api';

    export default{
        props: ['visiable'],
        data(){
            return{
                isNew: true,
                selectOptions: [],  //{key: 'time', value: '按时间排序'}
                selectTitle: "",
                selectValue: 0,
                addParams: {
                    type: "dialog",
                    //content: common.deleteTip,
                    callback: () => {
                        console.log(this.deleteTopic);
                        this.visiable = false;
                    },
                    failback: () => { this.visiable = false; }
                }
            }
        },
        methods: {
            setNewPanel(flag){
                this.isNew = flag ? true : false;
            },
            close(){
                this.visiable = false;
            },
            getDashboardList(){
                Api.getDashboardList({}).then(resp => {
                    console.log('getDashboardList', resp.data);
                    if(resp.data.code == 0){
                        const list = resp.data.data;
                        this.selectOptions = _.map(list, item => ({key: item.id, value: item.name}));
                    }
                });
            }
        },
        created(){
            this.getDashboardList();
        },
        components:{
            Tips, SelectEl
        }
    }
</script>
