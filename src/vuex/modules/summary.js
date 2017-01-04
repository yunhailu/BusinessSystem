import {UPDATE_SUM_ADD_TOPIC, UPDATE_SUM_TYPE, UPDATE_SUM_TIME_RANGE, UPDATE_SUM_SOURCE, UPDATE_SUM_SUBTOPIC, UPDATE_SUM_DATE_CHANGE, UPDATE_SUM_START, UPDATE_SUM_END,UPDATE_SUM_REFRESH_TOPIC, UPDATE_SUM_RESET_SEARCH ,UPDATE_SUM_SUBTOPIC_ID,UPDATE_SUM_TIME_POP_UP} from '../mutations-types'

const state = {
    sum_type: 'theme',
    sum_start:'',
    sum_end:'',
    sum_dateChange: 0,
    sum_timeRange: '7',
    sum_source: 'all',
    sum_subtopic: '',
    sum_refreshTopic:0,
    sum_resetSearch:false,
    sum_subtopicId:0,
    sum_timePopUp:0.33,
    sum_addTopic:{}
}

const mutations = {
    [UPDATE_SUM_TYPE](state, type) {
        state.sum_type = type;
    },
    [UPDATE_SUM_START](state, start) {
        state.sum_start = start;
    },
    [UPDATE_SUM_END](state, end) {
        state.sum_end = end;
    },
    [UPDATE_SUM_TIME_RANGE](state, timeRange) {
        state.sum_timeRange = timeRange;
    },
    [UPDATE_SUM_DATE_CHANGE](state, value) {
        state.sum_dateChange = value;
    },
    [UPDATE_SUM_SOURCE](state, source){
        state.sum_source = source;
    },
    [UPDATE_SUM_SUBTOPIC](state, subtopic){
        state.sum_subtopic = subtopic;
    },
    [UPDATE_SUM_REFRESH_TOPIC](state, refreshTopic){
        state.sum_refreshTopic = refreshTopic;
    },
    [UPDATE_SUM_RESET_SEARCH](state, resetSearch){
        state.sum_resetSearch = resetSearch;
    },
    [UPDATE_SUM_SUBTOPIC_ID](state,subtopicId){
        state.sum_subtopicId = subtopicId;
    },
    [UPDATE_SUM_TIME_POP_UP](state,time){
        state.sum_timePopUp = time;
    },
    [UPDATE_SUM_ADD_TOPIC](state,topic){
        state.sum_addTopic = topic;
    }
}

export default {
    state,
    mutations
}