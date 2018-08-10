import { createAction } from 'redux-actions';

import {
    PIC_LIST_DATA,
} from '../constants/ActionTypes.js';

export const setPicListData = createAction(
    PIC_LIST_DATA, payload => payload
)