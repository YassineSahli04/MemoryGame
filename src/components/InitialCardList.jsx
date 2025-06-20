import { useEffect, useState } from "react";
import Card from "./Card";
export default function InitialCardList({items, flipTimer, onComplete}){
    const [itemIndex, setItemIndex] = useState(0)
    const [flipped, setFlipped] = useState(false);


    
    useEffect(()=>{
        if (itemIndex >= items.length) return;

        const showTimer = setTimeout(()=>{
            if (itemIndex >= items.length) {
                setFlipped(false);
                return;
            }
            setFlipped(true)

            const hideTimer = setTimeout(()=>{
                setFlipped(false);

                const switchTimer = setTimeout(() => {
                    setItemIndex(prev => prev + 1);
                }, 600);
                return () => clearTimeout(switchTimer);
            }, flipTimer);
             
            
            return ()=> {
                clearTimeout(hideTimer);
                
            }
        },750);
        
        return ()=> {
            clearTimeout(showTimer);
            
        }
        
    },[itemIndex])

    
    const [fade,setFade] = useState(true);
    useEffect(()=>{
        if (itemIndex === items.length-2) {

            const timer = setTimeout(() => {
                setFade(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    },[itemIndex])

    useEffect(() => {
        if (itemIndex >= items.length) {
            onComplete?.();
        }
    }, [itemIndex]);
    if (itemIndex >= items.length) {
        return null;
    }
    const showedItemSource = items[itemIndex].source;
    
    return (
        <Card showedItemSource={showedItemSource} flipped={flipped}/>
    )
}