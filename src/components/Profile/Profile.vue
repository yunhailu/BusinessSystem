<template>
    <header-component></header-component>
    <div class="container">
        <div class="profile">
            <ul id="myTab" class="nav nav-tabs">
                <li :class="[isMine ? 'active' : '']" @click="setMine(true);"><a href="javascript:void(0);" >{{words.mineTitle}}</a></li>
                <li v-if="isAdmin" :class="[isMine ? '' : 'active']" @click="setMine(false);"><a href="javascript:void(0);">{{words.addTitle}}</a></li>
            </ul>
            <div class="profile-mine" v-if="isMine">
                <form class="form-horizontal" role="form" v-on:submit.stop.prevent="modifySubmit();">
                    <div class="form-group">
                        <label for="userName" class="col-sm-3 control-label">{{words.userName}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="mine.userName" class="form-control" id="userName" :placeholder="words.userName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password" class="col-sm-3 control-label">{{words.password}}</label>
                        <div class="col-sm-5">
                            <input type="password" v-model="mine.password" class="form-control" id="password" :placeholder="words.password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="rePassword" class="col-sm-3 control-label">{{words.rePassword}}</label>
                        <div class="col-sm-5">
                            <input type="password" v-model="mine.rePassword" class="form-control" id="rePassword" :placeholder="words.rePassword">
                        </div>
                    </div>
                    <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                        <label class="tips">{{mine.tip}}</label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="submit" class="btn btn-primary">{{words.modifyBtn}}</button>
                            <button type="button" class="btn btn-default" @click="resetMine();">{{words.resetBtn}}</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="profile-add" v-if="!isMine">
                <div id="uploadBtnWrap" class="profile-add-avatar">
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
                <form class="form-horizontal" role="form" v-on:submit.prevent.stop="createSubmit();">
                    <div class="form-group">
                        <label for="newUserName" class="col-sm-3 control-label">{{words.userName}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="addUser.username" class="form-control" id="newUserName" :placeholder="words.userName">
                        </div>
                    </div>
                    <!--<div class="form-group">-->
                        <!--<label for="addPassword" class="col-sm-3 control-label">{{words.gender}}</label>-->
                        <!--<div class="col-sm-5">-->
                            <!--<div class="radio-inline">-->
                                <!--<label>-->
                                    <!--<input type="radio" v-model="addUser.gender" name="blankRadio" id="maleRadio" value="1"> {{words.male}}-->
                                <!--</label>-->
                            <!--</div>-->
                            <!--<div class="radio-inline">-->
                                <!--<label>-->
                                    <!--<input type="radio" v-model="addUser.gender" name="blankRadio" id="femaleRadio" value="0"> {{words.female}}-->
                                <!--</label>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="form-group">
                        <label for="addPassword" class="col-sm-3 control-label">{{words.password}}</label>
                        <div class="col-sm-5">
                            <input type="password" v-model="addUser.password" class="form-control" id="addPassword" :placeholder="words.password">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="AddRePassword" class="col-sm-3 control-label">{{words.rePassword}}</label>
                        <div class="col-sm-5">
                            <input type="password" v-model="addUser.rePassword" class="form-control" id="AddRePassword" :placeholder="words.rePassword">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="addTel" class="col-sm-3 control-label">{{words.tel}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="addUser.phone" class="form-control" id="addTel" :placeholder="words.tel">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="addEmail" class="col-sm-3 control-label">{{words.email}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="addUser.email" class="form-control" id="addEmail" :placeholder="words.email">
                        </div>
                    </div>
                    <div class="col-sm-offset-3 col-sm-8" v-if="addTip">
                        <label class="tips">{{addUser.tip}}</label>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-8">
                            <button type="submit" class="btn btn-primary" >{{words.createBtn}}</button>
                            <button type="button" class="btn btn-default" @click="resetAdd();">{{words.resetBtn}}</button>
                        </div>
                    </div>
                </form>
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
                isMine: true,
                isAdmin: 0,
                isGetToken: false,
                user_avatar: 'http://of4d1rz63.bkt.clouddn.com/logo.png',
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
                mine:{
                    userName: "",
                    password: "",
                    rePassword: "",
                    tip: ""
                },
                addUser: {
                    username: "",
                    //gender: 1,
                    password: "",
                    rePassword: "",
                    phone: "",
                    email: "",
                    key: "",
                    avatar: "",
                    tip: ""
                }
            }
        },
        computed: {
            isAdmin(){
                return getCookie('business_admin');
            }
        },
        methods: {
            setMine(flag){
                this.isMine = flag;
                if(!flag && !this.isGetToken){
                    this.isGetToken = true;
                    this.upload();
                }
            },
            modifySubmit(){
                console.log('modifySubmit', this.mine);
            },
            createSubmit(){
                console.log('createSubmit', this.addUser);
                const params = _.pick(this.addUser, 'username', 'password', 'phone', 'key', 'email');
                console.log('params' , params);
            },
            resetMine(){
                this.mine = {
                    userName: "",
                    password: "",
                    rePassword: "",
                    tip: ""
                };
            },
            resetAdd(){
                this.addUser = {
                    userName: "",
                    gender: 1,
                    password: "",
                    rePassword: "",
                    tel: "",
                    email: "",
                    tip: ""
                }
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
                                    _this.addUser.key = res.key;
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
