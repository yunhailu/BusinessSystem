/**
 * Created by yunhailu on 2016/10/23.
 */
import { UPDATE_TYPE, UPDATE_TIME_RANGE, UPDATE_SOURCE, UPDATE_SUBTOPIC } from '../mutations-types'

const state = {
    type: 'result',
    timeRange: '7',
    source: 'all',
    subtopic: ''
}

const mutations = {
    [UPDATE_TYPE](state, type) {
        state.type = type;
    },
    [UPDATE_TIME_RANGE](state, timeRange) {
        state.timeRange = timeRange;
    },
    [UPDATE_SOURCE](state, source){
        state.source = source;
    },
    [UPDATE_SUBTOPIC](state, subtopic){
        state.subtopic = subtopic;
    }
}

export default {
    state,
    mutations
}