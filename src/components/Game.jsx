import { useEffect, useState, useMemo } from "react";
import InitialCardList from "./InitialCardList";
import './GameStyle.css'
import CardProposition from "./CardProposition";
import Items from "./Items";

export default function Game(){
    const [view, setView] = useState('cards');
    const [imgNumber, setImgNumber] = useState(2)

    const selectedItems = useMemo(()=>{
        console.log('yes')
        const shuffledItems = [...Items].sort(() => Math.random() - 0.5);  
        return shuffledItems.slice(0, imgNumber);
    },[Items, imgNumber]);

    const handleResult = (result) =>{
        if(result === true){
            setView('next')
        }else{
            setView('end')
        }
    }

    useEffect(()=>{
        if(view === 'next'){
            if(imgNumber === Items.length){
                setView('win')
            }else{
                setImgNumber(prev => prev + 1)
                setView('cards')
            }

        }
    },[view])

    return (<>
    <div className="container">
        {view === 'cards' && (
            <InitialCardList items={selectedItems} flipTimer={1500} onComplete={() => setView('results')}/>
        )}

        {view === 'results' && (
            <CardProposition numberCards={2} items={selectedItems} result={handleResult}/>
        )}

        {view === 'win' && (
            <h1>You Won</h1>
        )}

        {view === 'end' && (
            <h1>This is the end</h1>
        )}
    </div>
    </>)
}