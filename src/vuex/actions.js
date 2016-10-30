import * as types from './mutations-types';


/**
 * Topic List
 * */
export const setTopicList = (store, list) => {
	store.dispatch(types.UPDATE_TOPIC_LIST, list);
};

export const setTopicGroupActiveId = (store, group_id) => {
	store.dispatch(types.UPDATE_TOPIC_ACTIVE_GROUP_ID, group_id);
};

export const setActiveAnalyticsTopic = (store, topic) => {
	store.dispatch(types.UPDATE_ACTIVE_ANALYTICS_TOPIC, topic);
};

export const setActiveCompareTopic = (store, topic) => {
	store.dispatch(types.UPDATE_ACTIVE_COMPARE_TOPIC, topic);
};

export const setActiveSettingTopic = (store, topic) => {
	store.dispatch(types.UPDATE_ACTIVE_SETTING_TOPIC, topic);
};


/**
 * Analytics
 * */
export const setAnalyticsType = (store, type) => {
	store.dispatch(types.UPDATE_TYPE, type);
};

export const setAnalyticsTimeRange = (store, timeRange) => {
	store.dispatch(types.UPDATE_TIME_RANGE, timeRange);
};

export const setAnalyticsSource = (store, source) => {
	store.dispatch(types.UPDATE_SOURCE, source);
};

export const setAnalyticsSubTopic = (store, subtopic) => {
	store.dispatch(types.UPDATE_SUBTOPIC, subtopic);
};

export const setAnalyticsStart = (store, start) => {
	store.dispatch(types.UPDATE_START, start);
};

export const setAnalyticsEnd = (store, end) => {
	store.dispatch(types.UPDATE_END, end);
};
