import * as types from './mutations-types';

export default (store, addr) => {
	store.dispatch('CHANGE_CURRNET_ADDR', addr)
}

export const setTopicList = (store, list) => {
	store.dispatch(types.UPDATE_TOPIC_LIST, list);
}