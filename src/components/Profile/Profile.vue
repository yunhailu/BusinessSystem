<template>
    <header-component></header-component>
    <div class="container">
        <div class="profile">
            <ul id="myTab" class="nav nav-tabs">
                <li :class="[isMine == 'isMain' ? 'active' : '']" @click="setMine('isMain');"><a href="javascript:void(0);" >{{words.mineTitle}}</a></li>
                <li v-if="isAdmin" :class="[isMine == 'isUserMsg' ? 'active' : '']" @click="setMine('isUserMsg');"><a href="javascript:void(0);">{{words.userMsg}}</a></li>
                <li v-if="isAdmin" :class="[isMine == 'isAgreeMsg' ? 'active' : '']" @click="setMine('isAgreeMsg');"><a href="javascript:void(0);">{{words.agreeApply}}</a></li>
            </ul>
            <div class="profile-add" v-if="isMine == 'isMain'">
                <ul class="mineMsgNodify">
                        <li @click = "showMain('showMsg')" :class="[profile =='showMsg' ? 'active': '']"><a
                                href="#">个人信息</a></li>
                        <li @click = "showMain('notifyPsd')" :class="[profile =='notifyPsd' ? 'active': '']"><a
                                href="#">修改密码</a></li>
                        <li @click = "showMain('notifyOth')" :class="[profile =='notifyOth' ? 'active': '']"><a
                                href="#">修改其他信息</a></li>
                    </ul>
                <div class="containerBox">
                    <div v-if="profile == 'notifyOth'" id="uploadBtnWrap" class="profile-add-avatar">
                        <div class="profile-add-avatar-wrap">
                            <img :src="user_avatar" class="profile-add-avatar-wrap-image" />
                        </div>
                        <div class="profile-add-avatar-btn">
                            <div type="button" id="uploadBtn" class="btn btn-default" >{{file.btn}}</div>
                            <div class="profile-add-avatar-btn-success tip" v-show="file.isSuccess">
                                <i class="fa fa-check"></i><span> {{file.success}}</span>
                            </div>
                            <div class="profile-add-avatar-btn-error tip" v-show="file.isFailed">
                                <i class="fa fa-warning"></i><span> {{file.failed}}</span>
                            </div>
                            <!--<input type="file" id="uploadBtn1"  />-->
                        </div>
                        <div class="profile-add-avatar-right">
                            <div class="profile-add-avatar-right-item">{{file.name}}</div>
                            <div class="profile-add-avatar-right-item">{{file.size | formatSize}}</div>
                        </div>
                    </div>
                    <div v-if="profile == 'showMsg'" class="profile-add-avatar">
                        <div class="profile-add-avatar-wrap noBorder">
                            <img :src="userInfo.avatar" class="profile-add-avatar-wrap-image" />
                        </div>
                    </div>
                    <form v-if="profile =='showMsg'"  class="form-horizontal mineMsg" role="form">
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">用户名:</label>
                            <div class="col-sm-5">
                               {{userInfo.username}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">公司:</label>
                            <div class="col-sm-5">
                                {{userInfo.company}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">邮箱:</label>
                            <div class="col-sm-5">
                                {{userInfo.email}}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">手机号:</label>
                            <div class="col-sm-5">
                                {{userInfo.phone}}
                            </div>
                        </div>
                    </form>
                    <form v-if="profile =='notifyPsd'" class="form-horizontal" role="form" v-on:submit.prevent.stop="modifyPsdSubmit();">
                        <div class="form-group">
                            <label for="currentPassword" class="col-sm-3 control-label">当前密码</label>
                            <div class="col-sm-5">
                                <input type="password" v-model="mine.current_password" class="form-control" id="currentPassword" placeholder="当前密码">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="addPassword2" class="col-sm-3 control-label">{{words.password}}</label>
                            <div class="col-sm-5">
                                <input type="password" v-model="mine.password" class="form-control" id="addPassword2" :placeholder="words.password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="AddRePassword2" class="col-sm-3 control-label">{{words.rePassword}}</label>
                            <div class="col-sm-5">
                                <input type="password" v-model="mine.rePassword" class="form-control" id="AddRePassword2" :placeholder="words.rePassword">
                            </div>
                        </div>
                        <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                            <label class="tips">{{mine.tip}}</label>
                        </div>
                        <div class="col-sm-offset-3 col-sm-8" v-if="addSuccessTip">
                            <label class="successTips">{{mine.successTip}}</label>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-8">
                                <button type="submit" class="btn btn-primary">{{words.modifyBtn}}</button>
                                <button type="button" class="btn btn-default" @click="resetMine();">{{words.resetBtn}}</button>
                            </div>
                        </div>
                    </form>
                    <form v-if="profile == 'notifyOth'" class="form-horizontal" role="form" v-on:submit.prevent.stop="modifySubmit();">
                        <div class="form-group">
                            <label for="newUserName" class="col-sm-3 control-label">{{words.userName}}</label>
                            <div class="col-sm-5">
                                <input type="text" v-model="mine.username" class="form-control" id="newUserName" :placeholder="words.userName">
                            </div>
                        </div>
                        <!--<div class="form-group">-->
                        <!--<label for="addPassword" class="col-sm-3 control-label">{{words.gender}}</label>-->
                        <!--<div class="col-sm-5">-->
                        <!--<div class="radio-inline">-->
                        <!--<label>-->
                        <!--<input type="radio" v-model="mine.gender" name="blankRadio" id="maleRadio" value="1"> {{words.male}}-->
                        <!--</label>-->
                        <!--</div>-->
                        <!--<div class="radio-inline">-->
                        <!--<label>-->
                        <!--<input type="radio" v-model="mine.gender" name="blankRadio" id="femaleRadio" value="0"> {{words.female}}-->
                        <!--</label>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->

                       <!-- <div class="form-group">
                            <label for="AddRePassword" class="col-sm-3 control-label">{{words.rePassword}}</label>
                            <div class="col-sm-5">
                                <input type="password" v-model="mine.rePassword" class="form-control" id="AddRePassword" :placeholder="words.rePassword">
                            </div>
                        </div>-->
                        <div class="form-group">
                            <label for="addTel" class="col-sm-3 control-label">{{words.tel}}</label>
                            <div class="col-sm-5">
                                <input type="text" v-model="mine.phone" class="form-control" id="addTel" :placeholder="words.tel">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="addEmail" class="col-sm-3 control-label">{{words.email}}</label>
                            <div class="col-sm-5">
                                <input type="text" v-model="mine.email" class="form-control" id="addEmail" :placeholder="words.email">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="addPassword" class="col-sm-3 control-label">{{words.password}}</label>
                            <div class="col-sm-5">
                                <input type="password"   v-model="mine.password" class="form-control" id="addPassword" :placeholder="words.password">
                            </div>
                        </div>
                        <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                            <label class="tips">{{mine.tip}}</label>
                        </div>
                        <div class="col-sm-offset-3 col-sm-8" v-if="addSuccessTip">
                            <label class="successTips">{{mine.successTip}}</label>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-8">
                                <button type="submit" class="btn btn-primary">{{words.modifyBtn}}</button>
                                <button type="button" class="btn btn-default" @click="resetMine();">{{words.resetBtn}}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="profile-add" v-if="isMine == 'isUserMsg'">
                    <table class="table table-hover  table-striped">
                        <thead>
                        <tr>
                            <td><span>id</span></td>
                            <td><span>用户名</span></td>
                            <td><span>公司名称</span></td>
                            <td><span>邮箱地址</span></td>
                            <td><span>电话号码</span></td>
                            <td><span>开通状态</span></td>
                            <td><span>开通时间</span></td>
                            <td><span>到期时间</span></td>
                            <td><span>是否开通</span></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="tableList"  >
                            <td>1</td>
                            <td>admin</td>
                            <td>wordemotion</td>
                            <td>123@qq.com</td>
                            <td>12345667544</td>
                            <td><span v-if="true">已开通</span><span v-if="false">未开通</span></td>
                            <td>--</td>
                            <td>--</td>
                            <td><i v-if="true" class="fa fa-check-square-o fa-2x cgreen" aria-hidden="true"></i><i v-if="false" class="fa fa-square-o fa-2x cred" aria-hidden="true"></i></td>
                        </tr>
                        </tbody>
                    </table>
            </div>
            <div class="profile-add" v-if="isMine == 'isAgreeMsg'">
                <table class="table table-hover  table-striped">
                    <thead>
                    <tr>
                        <td><span>用户名</span></td>
                        <td><span>公司名称</span></td>
                        <td><span>邮箱地址</span></td>
                        <td><span>电话号码</span></td>
                        <td><span>开通状态</span></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="tableList"  >
                        <td>admin</td>
                        <td>wordemotion</td>
                        <td>123@qq.com</td>
                        <td>12345667544</td>
                        <td>未开通</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Profile.less";
</style>
<script type="text/ecmascript-6">
    import _ from 'underscore';
    import HeaderComponent from '../Header/Header.vue';
    import Local from '../../local/local';
    import { getCookie } from '../../widgets/Cookie';
    import { formatSize } from '../../widgets/Util';
    import * as Api from '../../widgets/Api';
    import * as Upload from '../../widgets/Upload';

    export default{
        data(){
            const words = Local().profile;
            const upload = Local().upload;
            return{
                words,
                isMine: "isMain",
                //isAdmin: 0,
                isGetToken: false,
                profile:"showMsg",
                user_avatar: 'http://of4d1rz63.bkt.clouddn.com/logo.png',
                userInfo:{
                    username:'',
                    company:'',
                    avatar:'',
                    email:'',
                    phone:''
                },
                file: {
                    btn: upload.upload,
                    success: upload.success,
                    failed: upload.fail,
                    isSuccess: false,
                    isFailed: false,
                    onlyOne: upload.onlyOne,
                    noPic: upload.noPic,
                    key: "",
                    size: "",
                    name: ""
                },
                mine: {
                    username: "",
                    //gender: 1,
                    password: "",
                    rePassword: "",
                    current_password:"",
                    phone: "",
                    email: "",
                    key: "",
                    avatar: "",
                    tip: "",
                    successTip:""
                },
                addTip:false,
                addSuccessTip:false
            }
        },
        computed: {
            isAdmin(){
                return getCookie('business_admin') == 1 ? true : false;
            }
        },
        methods: {
            showMain(str){
                this.profile = str;
                this.resetMine();
                this.addTip = false;
                this.addSuccessTip = false;
            },
            /*setMine(flag){
                this.isMine = flag;
                if(!flag && !this.isGetToken){
                    this.isGetToken = true;
                    this.upload();
                }
            },*/
            setMine(str){
                this.isMine = str;
            },
            modifyPsdSubmit(){
                this.addTip = false;
                this.addSuccessTip = false;
                if(this.mine.password != this.mine.rePassword){
                    this.mine.tip = this.words.passDiff;
                    this.addTip = true;
                    return ;
                }
                if(! /^[0-9A-Za-z]{6,}$/.test(this.mine.password)){
                    this.mine.tip = this.words.passwordCondition;
                    this.addTip = true;
                    return ;
                }
                const params = {
                    username:this.userInfo.username,
                    current_password:this.mine.current_password,
                    new_password:this.mine.password,
                    email:this.userInfo.email,
                    phone:this.userInfo.phone,
                    avatar:""
                }
                Api.nodifyUser( params ).then(resp => {
                    if(resp.data.code == 0 && resp.data.data.success == 1){
                       this.mine.successTip = '密码修改成功';
                        this.addSuccessTip = true;
                        setTimeout(function () {
                            this.addSuccessTip = false;
                        }.bind(this),1000)
                        this.getUserInfo();
                    }
                    if(resp.data.code == 101){
                        this.mine.tip = resp.data.data.message;
                    }
                    this.resetMine();
                });
            },
            modifySubmit(){
                this.addTip = false;
                this.addSuccessTip = false;
                console.log('modifySubmit', this.mine);
               /* if(this.mine.password != this.mine.rePassword){
                    this.mine.tip = this.words.passDiff;
                    this.addTip = true;
                    return ;
                }*/
                if((this.mine.username).length>10 ||(this.mine.username).length<2){
                    this.mine.tip="用户名需输入2-10位字符";
                    this.addTip = true;
                    return ;
                }
                var nameReg = /^[a-zA-Z0-9_]$/;
                var chineseReg = new RegExp("[\u4e00-\u9fa5]");
                for(var i=0;i<(this.mine.username).length;i++){
                    const c = (this.mine.username).charAt(i);
                    if(!(chineseReg.test(c) || nameReg.test(c))){
                        this.mine.tip = '用户名只能包含中文，字母，数字，下划线';
                        this.addTip = true;
                        return ;
                    }
                }
                if(! /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(this.mine.phone)){
                    this.mine.tip = this.words.phoneCondition;
                    this.addTip = true;
                    return ;
                }
                if(! /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.mine.email)){
                    this.mine.tip = this.words.emailCondition;
                    this.addTip = true;
                    return ;
                }
                const params = {
                    username:this.mine.username,
                    current_password:this.mine.password,
                    new_password:'',
                    email:this.mine.email,
                    phone:this.mine.phone,
                    avatar:""
                }
                if(! /^[0-9A-Za-z]{6,}$/.test(this.mine.password)){
                    this.mine.tip = this.words.passwordCondition;
                    this.addTip = true;
                    return ;
                }
               /* const params = _.pick(this.mine, 'username', 'password', 'phone', 'key', 'email');
                console.log('params' , params);*/
                Api.nodifyUser( params ).then(resp => {
                    if(resp.data.code == 0 && resp.data.data.success == 1){
                        this.mine.successTip = '用户信息修改成功';
                        this.addSuccessTip = true;
                        setTimeout(function () {
                            this.addSuccessTip = false;
                        }.bind(this),1000)
                        this.getUserInfo();
                    }
                    if(resp.data.code == 100){
                        if(resp.data.message[0].includes('Username')){
                            this.mine.tip="用户名已存在";
                            this.addTip = true;
                            return ;
                        }else if (resp.data.message[0].includes('Email')){
                            this.mine.tip="邮箱已存在";
                            this.addTip = true;
                            return ;
                        }else if(resp.data.message[0].includes('Phone')){
                            this.mine.tip="手机号已存在";
                            this.addTip = true;
                            return ;
                        }else {
                            this.mine.tip="修改出错";
                            this.addTip = true;
                            return ;
                        }
                    }
                    this.resetMine();
                });
            },
            resetMine(){
                this.mine = {
                    username: "",
                    gender: 1,
                    password: "",
                    rePassword: "",
                    current_password:"",
                    phone: "",
                    email: "",
                    tip: ""
                };
            },
            getUserInfo(){
                Api.getUserInfo({}).then(resp=>{
                    if(resp.data.code==0){
                        const detail = resp.data.data;
                        this.userInfo.username = detail.username;
                        this.userInfo.company = detail.company;
                        this.userInfo.avatar = detail.avatar;
                        this.userInfo.email = detail.email;
                        this.userInfo.phone = detail.phone;
                        console.log(this.userInfo);
                    }
                })
            },
            upload(){
                Api.uploadToken({}).then(resp => {
                    console.log(resp.data.data.token);
                    if(resp.data.code == 0){
                        const uptoken = resp.data.data.token || "";
                        const _this = this;
                        Upload.up(uptoken, {
                            init: {
                                FilesAdded(up, files){
                                    console.log('FilesAdded', up, files);
                                    if(files.length != 1){
                                        _this.file.isSuccess = false;
                                        _this.file.isFailed = true;
                                        _this.file.failed = _this.file.onlyOne;
                                        return false;
                                    }
                                    const file = files[0];
                                    if(file.type.indexOf('image') < 0){
                                        _this.file.isSuccess = false;
                                        _this.file.isFailed = true;
                                        _this.file.failed = _this.file.noPic;
                                        return false;
                                    }
                                    _this.file.name = file.name;
                                    _this.file.size = file.size;

                                },
                                FileUploaded(up, file, info){
                                    const domain = up.getOption('domain');
                                    const res = JSON.parse(info);
                                    const sourceLink = domain + res.key; //获取上传成功后的文件的Url
                                    console.log(sourceLink);
                                    _this.user_avatar = sourceLink;
                                    _this.file.key = res.key;
                                    _this.mine.key = res.key;
                                    _this.file.isSuccess = true;
                                    _this.file.isFailed = false;
                                },
                                UploadProgress(up, file){
                                    console.log('UploadProgress', up, file);
                                }
                            }
                        });
                    }
                });

            },
            init(){

                //this.isAdmin = getCookie('business_admin');
                //this.upload();
            }
        },
        ready(){
            this.getUserInfo();
        },
        filters: { formatSize },
        created(){
            //this.init();
        },
        components:{ HeaderComponent },
        route: {
            data(){
                //this.init();
            }
        }
    }
</script>
