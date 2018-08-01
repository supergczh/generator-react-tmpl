import objectAssign from 'object-assign';
import {
    SENDING_STATUS,
    IS_UPDATE
} from '../constants/ActionTypes';

const initialState = {
    sendingStatus: false,
    isUpdate: 0
};


function commonReducer(state = initialState, action) {

    switch (action.type) {
        case SENDING_STATUS:
            return objectAssign({}, state,
                { sendingStatus: action.newData }
            );
        case IS_UPDATE:
            return objectAssign({}, state,
                { isUpdate: action.newData }
            );
        default:
            return state;
    }
}
export default commonReducer;
