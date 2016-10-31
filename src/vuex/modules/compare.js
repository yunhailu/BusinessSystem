/**
 * Created by zfyan on 2016/10/30.
 */
import { UPDATE_COMPARE_TYPE, UPDATE_COMPARE_TIME_RANGE, UPDATE_COMPARE_SOURCE, UPDATE_COMPARE_SUBTOPIC,UPDATE_COMPARE_START,UPDATE_COMPARE_END } from '../mutations-types'

const state ={
    compare_type: 'summary',
    compare_start: '',
    compare_end: '',
    compare_time_Range: '7',
    compare_source: 'all',
    compare_subtopic: ''
}

const mutations = {
    [UPDATE_COMPARE_TYPE](state, type) {
        state.compare_type = type;
    },
    [UPDATE_COMPARE_TIME_RANGE](state, timeRange) {
        state.compare_time_Range = timeRange;
    },
    [UPDATE_COMPARE_SOURCE](state, source){
        state.compare_source = source;
    },
    [UPDATE_COMPARE_SUBTOPIC](state, subtopic){
        state.compare_subtopic = subtopic;
    },
    [UPDATE_COMPARE_START](state, start){
        state.compare_start = start;
    },
    [UPDATE_COMPARE_END](state, end){
        state.compare_end = end;
    }
}

export default {
    state,
    mutations
}