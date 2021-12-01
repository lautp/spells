import React, {useReducer} from 'react';
import {GET_RACARD, GET_UNCARD, GET_COCARD, CLEAR_URL, SET, PUSH, READY} from '../types';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Card from '../../components/layout/Card';
import cardReducer from './cardReducer';
import CardContext from './cardContext';







const CardState = props => {

    const initialState = {
        url: 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/f/f8/Magic_card_back.jpg',
        rUrl: '',
        uUrl: '',
        cUrl: '',
        set:'',
        cards:[],
        ready:false
    }

    const [state, dispatch] = useReducer(cardReducer, initialState);

    

    let times = 0;
    let counter = 1;

    //Copy set
    const copySet = (set) => {
        dispatch({type:SET, payload:set})
    }

    //Get rare card
    const getRaCard = async () => {
            
            
            dispatch({type:CLEAR_URL})

            const res = await axios.get(`https://api.scryfall.com/cards/random?q=e%3A${state.set}+r%3Arare+OR+e%3A${state.set}+r%3Amythic`);

            const url = res.data.image_uris.large;

           
            
            dispatch({type:GET_RACARD, payload:url})

            
            
    }
    
    //Get uncommon card
    const getUnCard = async () => {
            
        dispatch({type:CLEAR_URL})

        const res = await axios.get(`https://api.scryfall.com/cards/random?q=e%3A${state.set}+r%3Auncommon`);

        const url = res.data.image_uris.large;
        
       
        dispatch({type:GET_UNCARD, payload:url})

       

    }

    //Get common card  
    const getCoCard = async () => {
            
            dispatch({type:CLEAR_URL})

            const res = await axios.get(`https://api.scryfall.com/cards/random?q=e%3A${state.set}+r%3Acommon`);

            const url = res.data.image_uris.large;
    
            dispatch({type:GET_COCARD, payload:url})

            
    }

    const fill = () => {
        
        

        switch (counter) {
            case 1:
                getRaCard();
                
                
                
                dispatch({type:PUSH, payload:<Card url={rUrl?rUrl:url} key={uuid()}/>});
                
                console.log('first')
                counter++
                fill();
                        
                break;
            case 2:
                const unc = setInterval( () =>{     
            
                    getUnCard();
                    console.log(state.rUrl)
                    
                    
                        if(times<3){
                            console.log('second', times)
                            times++;
                            
                            dispatch({type:PUSH, payload:<Card url={state.uUrl?state.uUrl:url} key={uuid()}/>});
                        
                        }else{
                            
                            clearInterval(unc);
                            times = 0;
                            counter++;
                            
                            fill();

                        }
                }, 540)
                
                break;
            case 3:
                const com = setInterval(   () =>{
                    getCoCard();
                    
                    
                    
                    if(times<10){
                        console.log('third', times)
                    dispatch({type:PUSH, payload:<Card url={state.cUrl?state.cUrl:url} key={uuid()}/>});
                        
                    times++;
                }else{
                        times = 0;
                        clearInterval(com);
                        counter++
                        showUp();
                    }
                }, 60)
                
                break;
        
            default:
                break;
        }
    }

    const showUp = () => {
        dispatch({type:READY})
    }

    
    
    return  <CardContext.Provider 
                value={{
                    url: state.url,
                    cUrl: state.cUrl,
                    uUrl: state.uUrl,
                    rUrl: state.rUrl,
                    set: state.set,
                    ready: state.ready,
                    cards: state.cards,
                    getRaCard,
                    getUnCard,
                    getCoCard,
                    fill,
                    copySet
                    
                 }}>
                {props.children}                
            </CardContext.Provider>
}

export default CardState;
