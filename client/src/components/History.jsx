export default function History(props) {
    const { history } = props
    const historyKeys = Object.keys(history)
    
    return (
        <div>
            <div className="card history-card">
                <h3>History</h3>
                {historyKeys.length == 0 ?  (<p> You have no attempts! Press <b>Start</b> to begin ⭐️</p>) 
                : (
                    <div className="history-container">
                        {historyKeys.map((item, itemIdx) => {
                            const dateKey = (new Date(item)).toString().split(" ").slice(1, 4).join(' ')
                            return (
                                <div key={itemIdx}
                                className="card-button-secondary">
                                    <div>
                                        <p>Started</p>
                                        <h6>{dateKey}</h6>
                                    </div>
                                    <div className="history-streak">
                                        <p>Streak</p>
                                        <h6>{history[item]}</h6>
                                    </div>
                                </div>
                            )
                        })}
                        
                        
                        

                    </div>
                )}

                
            </div>
        </div>
    )
    
}