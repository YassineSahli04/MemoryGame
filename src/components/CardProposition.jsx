import { useEffect, useState, useMemo } from "react";
import Card from "./Card";
import "./GameStyle.css"

export default function CardProposition({numberCards, items, result}){
    
    const [randomIndex, question, selectedItem, proposedItem] = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * items.length);
        const question = `What was the image at position ${randomIndex + 1}?`;
        const selectedItem = items[randomIndex];
        const shuffledItems = items.filter((_, index) => index !== randomIndex).sort(() => Math.random() - 0.5);
        const choices = shuffledItems.slice(0, numberCards - 1);
        const insertAt = Math.floor(Math.random() * (choices.length + 1));
        choices.splice(insertAt, 0, selectedItem);
        return [randomIndex, question, selectedItem, choices];
    }, [items]);
    
    const [flippedStates, setFlippedStates] = useState(
        new Array(numberCards).fill(false)
    );
    
    


    useEffect(()=>{
        proposedItem.forEach((_,i)=>{
            setTimeout(()=>{
                setFlippedStates(prev => {
                    const updated = [...prev];
                    updated[i] = true;
                    return updated;
                });
            },500+300*i)
        })
    },[proposedItem])

    function handleCardClick(id){
        if(id === selectedItem.id){
            result(true);
        }else{
            result(false);
        }
    }



    return (
        <>
            <h1>{question}</h1>
            <div className="cardContainer">
                {proposedItem.map((item, index) => (
                    <div className="cardWrapper" key={index} onClick={() => handleCardClick(item.id)}>
                        <Card
                            showedItemSource={item.source}
                            flipped={flippedStates[index]}
                        />
                    </div>
                ))}
            </div>
        </>
        
    );
}