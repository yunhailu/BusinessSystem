/**
 * Created by yunhailu on 2016/10/19.
 */
import { UPDATE_TOPIC_LIST, UPDATE_TOPIC_ACTIVE_GROUP_ID, UPDATE_ACTIVE_TOPIC } from '../mutations-types'

const state = {
    list: [],
    active_group_id: "",
    active_topic: []    //数组支持多选，单选数组只有一项
}

const mutations = {
    [UPDATE_TOPIC_LIST](state, list) {
        state.list = list;
    },
    [UPDATE_TOPIC_ACTIVE_GROUP_ID](state, group_id) {
        state.active_group_id = group_id;
    },
    [UPDATE_ACTIVE_TOPIC](state, topic){
        state.active_topic = topic;
    }
}

export default {
    state,
    mutations
}