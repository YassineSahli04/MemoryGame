import { useEffect, useState } from "react";
import Card from "./Card";
import "./GameStyle.css"

export default function CardProposition({numberCards, items}){
    console.log('yes')
    const [flippedStates, setFlippedStates] = useState(
        new Array(numberCards).fill(false)
    );    

    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    const selectedItems = shuffledItems.slice(0, numberCards);

    useEffect(()=>{
        selectedItems.forEach((_,i)=>{
            setTimeout(()=>{
                setFlippedStates(prev => {
                    const updated = [...prev];
                    updated[i] = true;
                    return updated;
                });
            },500+200*i)
        })
    },[numberCards])

    return (
        <div className="cardContainer">
            {selectedItems.map((item, index) => (
                <div className="cardWrapper" key={index}>
                    <Card
                        showedItemSource={item.source}
                        flipped={flippedStates[index]}
                    />
                </div>
            ))}
        </div>
    );
}