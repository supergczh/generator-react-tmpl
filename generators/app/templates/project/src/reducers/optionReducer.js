import { handleActions } from 'redux-actions';

import {
    PIC_LIST_DATA
} from '../constants/ActionTypes';

const initialState = {
    picListData: {},
};

export default handleActions({
    [PIC_LIST_DATA](state, action) {
        return { ...state, picListData: action.payload }
    }
}, initialState);
