import { useRef, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import InitialCardList from "./InitialCardList";
import './GameStyle.css'
import CardProposition from "./CardProposition";
import Items from "./Items";
import Summary from "./Summary";

export default function Game(){
    const [searchParams] = useSearchParams();
    const level = searchParams.get("level") || "easy";

    const [flipTimer,numberCards,startingNumberImgs] = useMemo(() => {
        switch (level) {
            case "medium":
                return [1500,2,3];
            case "hard":
                return [1000,3,4];
            default:
                return [2000,2,2]; 
        }
    }, [level]);


    const [view, setView] = useState('cards');
    const [imgNumber, setImgNumber] = useState(startingNumberImgs);
    const score = useRef(0);
    const totalQuestions = useRef(1);

    const selectedItems = useMemo(()=>{
        const shuffledItems = [...Items].sort(() => Math.random() - 0.5);  
        return shuffledItems.slice(0, imgNumber);
    },[ imgNumber]);

    const handleResult = (result) =>{
        totalQuestions.current += 1;
        if(result === true){
            score.current += 1;
        }
        if(imgNumber === Items.length){
            setView('summary')
        }else{
            setImgNumber(prev => prev + 1)
            setView('cards')
        }
    }



    return (<>
    {view !== 'summary' && (
        <div className="container">
            {view === 'cards' && (
                <InitialCardList items={selectedItems} flipTimer={flipTimer} onComplete={() => setView('results')} />
            )}
            {view === 'results' && (
                <CardProposition numberCards={numberCards} items={selectedItems} result={handleResult} />
            )}
            {view === 'end' && <h1>This is the end</h1>}
        </div>
    )}

        {view === 'summary' && (
            <Summary  score={score.current} totalQuestions={totalQuestions.current} />
        )}
        </>)
}