/**
 * Created by yunhailu on 2016/10/23.
 */
import { UPDATE_TYPE, UPDATE_TIME_RANGE, UPDATE_SOURCE, UPDATE_SUBTOPIC, UPDATE_DATE_CHANGE, UPDATE_START, UPDATE_END } from '../mutations-types'

const state = {
    type: 'summary',
    start:'',
    end:'',
    dateChange: 0,
    timeRange: '7',
    source: 'all',
    subtopic: ''
}

const mutations = {
    [UPDATE_TYPE](state, type) {
        state.type = type;
    },
    [UPDATE_START](state, start) {
        state.start = start;
    },
    [UPDATE_END](state, end) {
        state.end = end;
    },
    [UPDATE_TIME_RANGE](state, timeRange) {
        state.timeRange = timeRange;
    },
    [UPDATE_DATE_CHANGE](state, value) {
        state.dateChange = value;
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