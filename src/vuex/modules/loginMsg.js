
import {USER_LEVEL} from '../mutations-types';

const state = {
    userLevel:'0',
};

const mutations={
    [USER_LEVEL](state,level){
        state.userLevel=level;
    }
};

export default {
    state,mutations
}

