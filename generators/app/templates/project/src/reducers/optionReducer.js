import objectAssign from 'object-assign';
import {
    PIC_LIST_DATA
} from '../constants/ActionTypes';

const initialState = {
    picListData: {},
};


function optionReducer(state = initialState, action) {

    switch (action.type) {
        case PIC_LIST_DATA:
            return objectAssign({}, state,
                { picListData: action.newData }
            );
        default:
            return state;
    }
}
export default optionReducer;
