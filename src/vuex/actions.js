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