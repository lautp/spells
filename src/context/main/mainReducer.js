import {GET_SETS, PICK_SET, SELECTED} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_SETS:
            return {
                ...state,
                sets: action.payload
            }
        case PICK_SET:
            return {
                ...state,
                set:action.payload
            }
        case SELECTED:
            return {
                ...state,
                selected:true,
                click:true
            }
        
        default:
            return state;
    }
}