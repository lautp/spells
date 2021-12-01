import React, {useEffect, useContext} from 'react';
import Pack from "./Pack";
import M from 'materialize-css/dist/js/materialize.min.js';
import MainContext from '../../context/main/mainContext';
import CardContext from '../../context/cards/cardContext'

M.AutoInit();

const Navbar = () => {

    const mainContext = useContext(MainContext);

    const {startDraft, getSets, pickSet, sets, set, click} = mainContext;

    const cardContext = useContext(CardContext);
    
    const {cards, ready} = cardContext;

   
    useEffect(() =>{
        getSets();
        //eslint-disable-next-line
    }, []);

    const onSelect = e => {
        pickSet(e)
    };

    const onStart = () => {
        startDraft(set, cards);

        
    }

    

    return (
        <>
            <nav >
                <div className="nav-wrapper grey darken-4 z-depth-4" style={{paddingLeft:'0.5rem'}}>
                    <ul className='left'>
                        <li><h4 style={{margin:'auto', padding:'0.7rem'}}>SpellSlinger</h4>
                        </li>
                        <li style={{paddingLeft:'30rem'}}>
                            <button className='btn grey darken-3' disabled={click===true?false:true} >Confirm Pick</button>
                        </li >
                        <li style={{margin:'auto', padding:'0.5rem', paddingLeft:'2.5em'}}>
                            <select value={set} onChange={onSelect}className='browser-default' disabled={click&&true}>
                                <option value="">Pick a set...</option>
                                {sets.map(set => {
                                   return <option key={set.id} value={set.code}>{set.name}</option>;
                                })}
                            </select>
                        </li>
                        <li style={{paddingLeft:'2rem'}}>
                            <button className='btn grey darken-3' onClick={onStart} disabled={click&&true}>Start Draft</button>
                        </li>
                    </ul>    
                </div>
            </nav>
            <div className='row' style={{ margin: '3rem', maxHeight:'800px',maxWidth:'95%'}}>
                {ready&&<Pack />}
            </div>
        </>
    )
}

export default Navbar;
