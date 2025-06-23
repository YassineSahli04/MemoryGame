import { useRef, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import InitialCardList from "./InitialCardList";
import './GameStyle.css'
import '.././index.css';
import CardProposition from "./CardProposition";
import ItemsNature from "./ItemsNature";
import ItemsCity from "./ItemsCity";
import QuestionTimer from "./QuestionTimer";
import Summary from "./Summary";

export default function Game() {
    var Items = [];
    const [searchParams] = useSearchParams();
    const level = searchParams.get("level") || "easy";
    const theme = searchParams.get("theme") || "nature";
    if (theme== "nature") {
        Items=ItemsNature;
    } else if (theme === "city") {
        Items=ItemsCity;
    }
    const [flipTimer,numberCards,startingNumberImgs,limitNumberImgs,timeLimit] = useMemo(() => {
        switch (level) {
            case "medium":
                return [1500,2,3,10,10000];
            case "hard":
                return [1000,3,4,15,5000];
            default:
                return [2000,2,2,5,15000]; 
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
        if(imgNumber === limitNumberImgs){
            setView('summary')
        }
        else{
            setImgNumber(prev => prev + 1)
            setView('cards')
        }
    }

    // const handleSelectAnswer = (selectedId) => {
    //     if (selectedId === null) {
    //         setView('end');
    //     } else {
    //         setView('next')
    //     }
    // };

    return (<>
    {view !== 'summary' && (
        <div className="container">
            {view === 'cards' && (
                <InitialCardList items={selectedItems} flipTimer={flipTimer} onComplete={() => setView('results')} />
            )}
            {view === 'results' && (
                <>
                    <div className="question-timer-wrapper">
                        <QuestionTimer timeout={timeLimit} onTimeout={handleResult} />
                    </div>
                    <CardProposition numberCards={numberCards} items={selectedItems} result={handleResult} />
                </>
            )}
            {view === 'end'}
        </div>
    )}

        {view === 'summary' && (
            <Summary  score={score.current} totalQuestions={totalQuestions.current} />
        )}
        </>)
}