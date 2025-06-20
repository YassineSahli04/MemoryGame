import { useState } from "react";
import InitialCardList from "./InitialCardList";
import './GameStyle.css'
import CardProposition from "./CardProposition";

export default function Game(){
    const items =[
        {source:"https://upload.wikimedia.org/wikipedia/commons/3/32/Jebel_Rassas%2C_Ben_Arous%2C_Tunisia.jpg"},
        {source:"https://www.les-voyageuses.net/wp-content/uploads/2018/09/les-voyageuses-tunisie-gammarth-950x640.jpg"},
        {source:"https://upload.wikimedia.org/wikipedia/commons/3/32/Jebel_Rassas%2C_Ben_Arous%2C_Tunisia.jpg"},
        // {source:"https://www.les-voyageuses.net/wp-content/uploads/2018/09/les-voyageuses-tunisie-gammarth-950x640.jpg"},
        // {source:"https://upload.wikimedia.org/wikipedia/commons/3/32/Jebel_Rassas%2C_Ben_Arous%2C_Tunisia.jpg"},
        // {source:"https://www.les-voyageuses.net/wp-content/uploads/2018/09/les-voyageuses-tunisie-gammarth-950x640.jpg"},
    ]
    const [view, setView] = useState('cards');


    return (<>
    <div className="container">
        {view === 'cards' && (
            <InitialCardList items={items} flipTimer={1500} onComplete={() => setView('results')}/>
        )}

        {view === 'results' && (
            <CardProposition numberCards={3} items={items}/>
        )}
    </div>
    </>)
}