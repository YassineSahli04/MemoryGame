import "./CardStyle.css"
export default function Card({ showedItemSource, flipped, fade = false}){   
    return (
        <div className={`card ${fade ? 'fade-out' : 'fade-in'}`}>
            <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
                <div className="card-front">
                <img
                    src={showedItemSource}
                    alt="Image"
                />
                </div>
                <div className="card-back"></div>
            </div>
        </div>
    )
}