/**
 * Created by yunhailu on 2016/10/19.
 */
import { UPDATE_TOPIC_LIST, UPDATE_TOPIC_ACTIVE_GROUP_ID } from '../mutations-types'

const state = {
    list: [],
    active_group_id: ""
}

const mutations = {
    [UPDATE_TOPIC_LIST](state, list) {
        state.list = list;
    },
    [UPDATE_TOPIC_ACTIVE_GROUP_ID](state, group_id) {
        state.active_group_id = group_id;
    }
}

export default {
    state,
    mutations
}