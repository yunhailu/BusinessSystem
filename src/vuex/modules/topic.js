/**
 * Created by yunhailu on 2016/10/19.
 */
import { UPDATE_TOPIC_LIST, UPDATE_TOPIC_ACTIVE_GROUP_ID, UPDATE_ACTIVE_ANALYTICS_TOPIC, UPDATE_ACTIVE_COMPARE_TOPIC, UPDATE_ACTIVE_SETTING_TOPIC } from '../mutations-types'

const state = {
    list: [],
    active_group_id: "",
    active_analytics_topic: {},
    active_compare_topic: [],    //数组支持多选，单选数组只有一项
    active_setting_topic: {}
}

const mutations = {
    [UPDATE_TOPIC_LIST](state, list) {
        state.list = list;
    },
    [UPDATE_TOPIC_ACTIVE_GROUP_ID](state, group_id) {
        state.active_group_id = group_id;
    },
    [UPDATE_ACTIVE_ANALYTICS_TOPIC](state, topic){
        state.active_analytics_topic = topic;
    },
    [UPDATE_ACTIVE_COMPARE_TOPIC](state, topic){
        state.active_compare_topic = topic;
    },
    [UPDATE_ACTIVE_SETTING_TOPIC](state, topic){
        state.active_setting_topic = topic;
    }
}

export default {
    state,
    mutations
}