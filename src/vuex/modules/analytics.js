/**
 * Created by yunhailu on 2016/10/23.
 */
import {UPDATE_ADD_TOPIC, UPDATE_TYPE, UPDATE_TIME_RANGE, UPDATE_SOURCE, UPDATE_SUBTOPIC, UPDATE_DATE_CHANGE, UPDATE_START, UPDATE_END,UPDATE_REFRESH_TOPIC, UPDATE_RESET_SEARCH ,UPDATE_SUBTOPIC_ID,UPDATE_TIME_POP_UP} from '../mutations-types'

const state = {
    type: 'theme',
    start:'',
    end:'',
    dateChange: 0,
    timeRange: '7',
    source: 'all',
    subtopic: '',
    refreshTopic:0,
    resetSearch:false,
    subtopicId:0,
    timePopUp:0.33,
    addTopic:{}
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
    },
    [UPDATE_REFRESH_TOPIC](state, refreshTopic){
        state.refreshTopic = refreshTopic;
    },
    [UPDATE_RESET_SEARCH](state, resetSearch){
        state.resetSearch = resetSearch;
    },
    [UPDATE_SUBTOPIC_ID](state,subtopicId){
        state.subtopicId = subtopicId;
    },
    [UPDATE_TIME_POP_UP](state,time){
        state.timePopUp = time;
    },
    [UPDATE_ADD_TOPIC](state,topic){
        state.addTopic = topic;
    }
}

export default {
    state,
    mutations
}