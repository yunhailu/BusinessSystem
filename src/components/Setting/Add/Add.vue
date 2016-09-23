<template>
    <div class="setting-add">
        <!--<div class="setting-add-title">{{words.addTitle}}</div>-->
        <div class="setting-add-container">
            <div class="setting-add-container-dec">
                <h4>{{words.addDecH}}</h4>
                <span>{{words.addDec | composite total remainder}}</span>
            </div>
            <div class="setting-add-container">
                <form class="form-horizontal">
                    <fieldset>
                        <div class="form-group">
                            <label for="" class="col-sm-2 control-label">{{words.groups}}</label>
                                <div class="radio-inline" v-for="group in groups">
                                    <label>
                                        <input type="radio" name="optionsRadios" id="group.id" value="option1" checked>
                                        {{group.text}}
                                    </label>
                                </div>
                        </div>
                        <div class="form-group">
                            <label for="topicText" class="col-sm-2 control-label">{{words.topic}}</label>
                            <div class="col-sm-4">
                                <input type="text" v-model="topicText" class="form-control" id="topicText" :placeholder="words.topic">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="excludeText" class="col-sm-2 control-label">{{words.exclude}}</label>
                            <div class="col-sm-4">
                                <input type="password" v-model="excludeText" class="form-control" id="excludeText" :placeholder="words.exclude">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-primary" >{{words.create}}</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import "Add.less";
</style>
<script type="text/ecmascript-6">
    import _ from "underscore";
    import Local from "../../../local/local";

    export default{
        data(){
            const words = Local().setting;
            return{
                words,
                total: 0,
                remainder: 0,
                topicText: "",
                excludeText: "",
                groups: [{
                    id: "", value: 0, text: "人物"
                }, {
                    id: "", value: 1, text: "机构"
                }, {
                    id: "", value: 3, text: "产品"
                }, {
                    id: "", value: 4, text: "项目"
                }, {
                    id: "", value: 5, text: "事件"
                }, {
                    id: "", value: 6, text: "其他"
                }]
            }
        },
        filters: {
            composite(str, ...rest){
                return _.reduce(rest, (memo, value) => {
                    return memo.replace(/\{\d\}/i, value);
                }, str);
            }
        },
        components:{

        }
    }
</script>
