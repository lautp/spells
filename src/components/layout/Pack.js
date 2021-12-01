import React, {useContext} from 'react';
import CardContext from '../../context/cards/cardContext';




const Pack = () => {
    

    const cardContext = useContext(CardContext);
  
    const {cards} = cardContext;
    
    return  <>
                {cards}
            </>
}    

export default Pack;