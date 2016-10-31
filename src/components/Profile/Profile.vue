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
                <form class="form-horizontal" role="form" v-on:submit.prevent.stop="createSubmit();">
                    <div class="form-group">
                        <label for="newUserName" class="col-sm-3 control-label">{{words.userName}}</label>
                        <div class="col-sm-5">
                            <input type="text" v-model="addUser.userName" class="form-control" id="newUserName" :placeholder="words.userName">
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
                            <input type="text" v-model="addUser.tel" class="form-control" id="addTel" :placeholder="words.tel">
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
    import HeaderComponent from '../Header/Header.vue';
    import { getCookie } from '../../widgets/Cookie';
    import * as Api from '../../widgets/Api';
    import Local from '../../local/local';

    export default{
        data(){
            const words = Local().profile;
            return{
                words,
                isMine: true,
                isAdmin: 0,
                mine:{
                    userName: "",
                    password: "",
                    rePassword: "",
                    tip: ""
                },
                addUser: {
                    userName: "",
                    gender: 1,
                    password: "",
                    rePassword: "",
                    tel: "",
                    email: "",
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
            },
            modifySubmit(){
                console.log('modifySubmit', this.mine);
            },
            createSubmit(){
                console.log('createSubmit', this.addUser);
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
            init(){
                //this.isAdmin = getCookie('business_admin');
            }
        },
        ready(){
            this.init();
        },
        components:{ HeaderComponent }
    }
</script>
