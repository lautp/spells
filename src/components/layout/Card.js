import React from 'react';
import M from 'materialize-css';



M.AutoInit();

const Card = ({url}) => {

    
    return (
        
            <div className='col' style={{maxWidth:'15rem', padding:'0'}}  >
                <img src={url} style={{maxWidth:'100%',
                maxHeight:'100%', border:'5px solid #424242', borderRadius:'15px'}} alt="" />
            </div>
        
    )
}

export default Card;
