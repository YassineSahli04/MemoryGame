import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import InitialCardList from "./InitialCardList";
import './GameStyle.css'
import CardProposition from "./CardProposition";
import Items from "./Items";

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
    const [imgNumber, setImgNumber] = useState(startingNumberImgs)

    const selectedItems = useMemo(()=>{
        console.log('yes')
        const shuffledItems = [...Items].sort(() => Math.random() - 0.5);  
        return shuffledItems.slice(0, imgNumber);
    },[ imgNumber]);

    const handleResult = (result) =>{
        if(result === true){
            setImgNumber(prev => prev + 1)
            setView('cards')
        }else{
            setView('end')
        }
    }



    return (<>
    <div className="container">
        {view === 'cards' && (
            <InitialCardList items={selectedItems} flipTimer={flipTimer} onComplete={() => setView('results')}/>
        )}

        {view === 'results' && (
            <CardProposition numberCards={numberCards} items={selectedItems} result={handleResult}/>
        )}

        {view === 'end' && (
            <h1>This is the end</h1>
        )}
    </div>
    </>)
}