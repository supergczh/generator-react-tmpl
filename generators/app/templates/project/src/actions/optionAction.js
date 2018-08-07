
import {
    PIC_LIST_DATA,
} from '../constants/ActionTypes.js';

export function setPicListData(newData) {
    return { type: PIC_LIST_DATA, newData }
}