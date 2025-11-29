import { useState } from "react"
import ProgressBar from "../ProgressBar"
import { isEncountered, shuffle } from "../../utils"
import DEFINITIONS from '../../utils/VOCAB.json'

export default function Challenge(props) {
    const { day, daysWords, handleChangePage, handleIncrementAttempts, handleCompleteDay, PLAN } = props

    const [wordIndex, setWordIndex] = useState(0)
    const [inputVal, setInputVal] = useState('')
    const [showDefintion, setShowDefinition] = useState(false)
    const [listToLearn, setListToLearn] = useState([
        ...daysWords,
        ...shuffle(daysWords),
        ...shuffle(daysWords),
        ...shuffle(daysWords),
    ])

    const word = listToLearn[wordIndex]
    const isNewWord = showDefintion || (!isEncountered(day, word) && wordIndex < daysWords.length)
    const defintion = DEFINITIONS[word]
    
    function giveUp(){
        setListToLearn([...listToLearn, word])
        setShowDefinition(true)
    }


    return (
        <section id="challenge">
            <h1>{word}</h1>
            {isNewWord && (<p>{defintion}</p>)}
            <div className="helper">
                <div>
                    {/* CONTAINS ALL THE ERROR CORRECTION VISUAL BARS */}
                    {[...Array(defintion.length).keys()]
                    .map((char, eleIdx) => {

                        const styleToApply = inputVal.length < 
                        char + 1 ? 
                        '' : 
                        inputVal.split('')[eleIdx].toLowerCase() == defintion.split('')[eleIdx].toLowerCase() 
                        ? 'correct' : 'incorrect'
                        return (
                            <div className={' ' + styleToApply} key={eleIdx}></div>
                        )
                    })}

                </div>
                <input value={inputVal} onChange={(e) => {

                    if (e.target.value.length == defintion.length && 
                        e.target.value.length > inputVal.length){
                            // compare words
                            handleIncrementAttempts()

                            if (e.target.value.toLowerCase() == defintion.toLowerCase()){
                                // then user has correct outcome
                                if (wordIndex >= listToLearn.length - 1){
                                    handleCompleteDay()
                                    return
                                }
                        
                                // check if finish words, end day or go to next words
                                setWordIndex(wordIndex + 1)
                                setShowDefinition(false)
                                setInputVal('')
                                return
                            }
                        }
                    setInputVal(e.target.value)  
                }}type="text" placeholder="Enter The word"/>
            </div>

                <div className="challenge-btns">
                    <button className="card-button-secondary" onClick={() => {handleChangePage(1)}}>
                        <h6>Quit</h6>
                    </button>
                    <button className="card-button-primary" onClick={giveUp}>
                        <h6>I forgot</h6>
                    </button>
                </div>
                <ProgressBar text={`${wordIndex} / ${listToLearn.length}`} 
                remainder={wordIndex * 100 / listToLearn.length}/>
        </section>
    )
}