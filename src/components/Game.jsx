import { useEffect, useState, useMemo, useRef } from "react";
import InitialCardList from "./InitialCardList";
import './GameStyle.css'
import CardProposition from "./CardProposition";
import Items from "./Items";
import Summary from "./Summary";

export default function Game(){
    const [view, setView] = useState('cards');
    const [imgNumber, setImgNumber] = useState(2);
    const score = useRef(0);
    const totalQuestions = useRef(1);

    const selectedItems = useMemo(()=>{
        const shuffledItems = [...Items].sort(() => Math.random() - 0.5);  
        return shuffledItems.slice(0, imgNumber);
    },[Items, imgNumber]);

    const handleResult = (result) =>{
        if(result === true){
            score.current += 1;
        }
        if(imgNumber === Items.length){
            console.log('yes')
            setView('summary')
        }else{
            setView('next')
        }
    }

    useEffect(()=>{
        if(view === 'next'){
            totalQuestions.current += 1;
            setImgNumber(prev => prev + 1);
            setView('cards');
        };

    },[view])

    return (<>
    {view !== 'summary' && (
        <div className="container">
            {view === 'cards' && (
                <InitialCardList items={selectedItems} flipTimer={1500} onComplete={() => setView('results')} />
            )}
            {view === 'results' && (
                <CardProposition numberCards={2} items={selectedItems} result={handleResult} />
            )}
            {view === 'end' && <h1>This is the end</h1>}
        </div>
    )}

        {view === 'summary' && (
            <Summary  score={score.current} totalQuestions={totalQuestions.current} />
        )}
        </>)
}