<template>
    <div class="setting-add">
        <!--<div class="setting-add-title">{{words.addTitle}}</div>-->
        <div class="setting-add-container">
            <div class="setting-add-container-dec">
                <h4>{{title}}</h4>
                <span>{{words.addDec | composite total remainder}}</span>
            </div>

            <div class="setting-add-container-mode">
                <div class="btn-group">
                    <a class="btn btn-default" :class="[!isAdvanced ? 'btn-primary ' : '']" href="javascript:void(0);" @click="setAdvanced(false);">
                        <i class="fa fa-plane" title="Align Left"></i> {{words.quickBtn}}
                    </a>
                    <a class="btn btn-default" :class="[isAdvanced ? 'btn-primary ' : '']" href="javascript:void(0);" @click="setAdvanced(true);">
                        <i class="fa fa-key" title="Align Center"></i> {{words.advancedBtn}}
                    </a>
                </div>
            </div>

            <div class="setting-add-container-con">
                <form class="form-horizontal">
                    <fieldset>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">{{words.groupTitle}}</label>
                            <div class="radio-inline" v-for="group in groups">
                                <label>
                                    <input type="radio" name="optionsRadios" id="group.id" :value="group.value" v-model="radioVal">{{group.text}}
                                </label>
                            </div>
                        </div>
                        <div class="form-group" v-show="!isAdvanced">
                            <label for="topicText" class="col-sm-2 control-label">{{words.topic}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="topicText" class="form-control" id="topicText" :placeholder="words.topic">
                            </div>
                            <div class="col-sm-4 tip">{{words.required}}</div>
                        </div>
                        <div class="form-group" v-show="isAdvanced">
                            <label for="topicArr" class="col-sm-2 control-label">{{words.topicArr}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="topicArr" class="form-control" id="topicArr" :placeholder="words.topicArr">
                            </div>
                            <div class="col-sm-4 tip">{{words.topicArrTip}} ( {{words.required}} )</div>
                        </div>
                        <div class="form-group" v-show="isAdvanced">
                            <label for="related" class="col-sm-2 control-label">{{words.related}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="related" class="form-control" id="related" :placeholder="words.related">
                            </div>
                            <div class="col-sm-4 tip">{{words.optional}}</div>
                        </div>
                        <div class="form-group">
                            <label for="excludeText" class="col-sm-2 control-label">{{words.exclude}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="excludeText" class="form-control" id="excludeText" :placeholder="words.exclude">
                            </div>
                            <div class="col-sm-4 tip">{{words.optional}}</div>
                        </div>
                        <div class="form-group" v-show="errorTip">
                            <div class="col-sm-offset-2 col-sm-10">
                                <div class="error">* {{errorTip}}</div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-primary" @click.stop.prevent="createSubmit" >{{words.create}}</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Form.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import Local from "../../../local/local";

    export default{
        data(){
            const words = Local().setting;
            return{
                words,
                title: "",
                isAdvanced: false,
                total: 0,
                remainder: 0,
                radioVal: "",
                topicArr: "",
                related: "",
                topicText: "",
                excludeText: "",
                errorTip: "",
                groups: [{
                    id: "", value: 0, text: words.groups[0]
                }, {
                    id: "", value: 1, text: words.groups[1]
                }, {
                    id: "", value: 2, text: words.groups[2]
                }, {
                    id: "", value: 3, text: words.groups[3]
                }, {
                    id: "", value: 4, text: words.groups[4]
                }, {
                    id: "", value: 5, text: words.groups[5]
                }, {
                    id: "", value: 6, text: words.groups[6]
                }]
            }
        },
        methods: {
            setAdvanced(isAdvanced){
                this.isAdvanced = isAdvanced;
            },
            createSubmit(){
                console.log(this.isAdvanced, this.radioVal, this.topicArr, this.related, this.topicText, this.excludeText);
                //history.go(-1);
            }
        },
        filters: {
            composite(str, ...rest){
                return _.reduce(rest, (memo, value) => {
                    return memo.replace(/\{\d\}/i, value);
                }, str);
            }
        },
        route: {
            data(){
                switch(this.$route.name){
                    case "settingAdd":
                        this.title = this.words.addDecH;
                        break;
                    case "settingEdit":
                        this.title = this.words.editDecH;
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>
