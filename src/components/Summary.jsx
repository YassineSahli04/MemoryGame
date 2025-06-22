import quizCompletedImg from "../assets/quiz-complete.png"

export default function Summary({ score, totalQuestions }) {
    var correctPerc = totalQuestions ? ((score * 100) / totalQuestions).toFixed(1) : "0.0";
    const isCompleted = correctPerc >= 50 ? true : false;
    return (
        <div id="summary">
            <img src={quizCompletedImg} alt="Trophy Icon" />
            <h2>{isCompleted ? "Test Completed!" : "Test Failed!"}</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{`${correctPerc}%`}</span>
                    <span className="text">Answered Correctly</span>
                </p>
                <p>
                    <span className="number">{`${100 - correctPerc}%`}</span>
                    <span className="text">Answered Incorrectly</span>
                </p>
            </div>
            <button className="try-again-button" onClick={()=>navigate("/")}>
                Try Again
            </button>
        </div>
    )
}