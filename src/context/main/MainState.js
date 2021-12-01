import React, {useReducer, useContext} from 'react';
import {GET_SETS, PICK_SET, SELECTED} from '../types';

import axios from 'axios';

import mainReducer from './mainReducer';
import MainContext from './mainContext';
import CardContext from '../cards/cardContext';

const MainState = props => {

    

    const cardContext = useContext(CardContext);

    const {copySet, fill } = cardContext;
    
    const initialState = {
        sets:[],
        set:'',
        pack:[],
        cards:[],
        click: false
        
    }
   
    const [state, dispatch] = useReducer(mainReducer, initialState);
    
    //Get sets
    const getSets = async (sets) => {
        //setLoading();

        const res = await axios.get('https://api.scryfall.com/sets');
        sets = res.data.data;
        
        const setList = sets.filter(set => {
            if(set.card_count === 0){
               return null; 
            }
            if(set.set_type ==='expansion' || set.set_type ==='core' || set.set_type ==='masters' || set.set_type ==='draft_innovation'){
                return set;
            }
        })

        dispatch({type:GET_SETS, payload:setList});
    };

    //Pick set
    const pickSet = e => {
        dispatch({type:PICK_SET, payload:e.target.value})
        copySet(e.target.value); 
    }

    //Start draft
    const startDraft = (set) => {
       if(set!==''){

       dispatch({type:SELECTED})}

       
       fill();
       
    }

    

    const copyUrl = () => {
        console.log('hola')
    }
    

    return <MainContext.Provider
            value={{
                set: state.set,
                sets: state.sets,
                cards:state.cards,
                click: state.click,
                getSets,
                pickSet,
                startDraft,
                copyUrl
                }}>
            {props.children}
        </MainContext.Provider>;
};

export default MainState;
