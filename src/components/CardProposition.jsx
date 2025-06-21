import { useEffect, useState, useMemo } from "react";
import Card from "./Card";
import "./GameStyle.css"

export default function CardProposition({numberCards, items, result}){
    
    const [question, selectedItem] = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * items.length);
        const question = `What was the image at position ${randomIndex + 1}?`;
        const selectedItem = items[randomIndex];
        return [question, selectedItem];
    }, [items]);
    
    const [flippedStates, setFlippedStates] = useState(
        new Array(numberCards).fill(false)
    );    

    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    var selectedItems = shuffledItems.slice(0, numberCards-1);
    const randomInsertingIndex = Math.floor(Math.random() * (items.length + 1));
    selectedItems.splice(randomIndex, 0, newItem);

    useEffect(()=>{
        selectedItems.forEach((_,i)=>{
            setTimeout(()=>{
                setFlippedStates(prev => {
                    const updated = [...prev];
                    updated[i] = true;
                    return updated;
                });
            },500+300*i)
        })
    },[numberCards])

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
                {selectedItems.map((item, index) => (
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