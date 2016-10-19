/**
 * Created by yunhailu on 2016/10/19.
 */
import { UPDATE_TOPIC_LIST } from '../mutations-types'

const state = {
    list: []
}

const mutations = {
    [UPDATE_TOPIC_LIST](state, list) {
        state.list = list;
    }
}

export default {
    state,
    mutations
}