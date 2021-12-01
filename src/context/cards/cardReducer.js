import {GET_COCARD, GET_UNCARD, GET_RACARD, CLEAR_URL, SET, READY, PUSH} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_RACARD:
            return {
                ...state,
                rUrl: action.payload
            }
        case GET_UNCARD:
            return {
                ...state,
                uUrl: action.payload
            }
        case GET_COCARD:
            return {
                ...state,
                cUrl: action.payload
            }
        
        case CLEAR_URL:
            return {
                ...state,
                url:'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/f/f8/Magic_card_back.jpg'
            }
        case SET:
            return{
                ...state,
                set:action.payload
            }
        
        case READY:
            return {
                ...state,
                ready:true
            }
        case PUSH:
            return {
                ...state,
                cards:[...state.cards, action.payload]
            }
        
        default:
            return state;
    }
}