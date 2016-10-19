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