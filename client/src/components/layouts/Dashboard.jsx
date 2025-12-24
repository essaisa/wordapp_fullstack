import Stats from '../Stats'
import Countdown from '../Countdown'
import History from '../History'

export default function Dashboard(props){
    const {handleLogOut, handleChangePage } = props


    return (
        <div>
            <section id="dashboard">
                <div className='dashboard-and-logout'>
                    <div> 
                        <h3 className="special-shadow-2" >Dashboard</h3>
                    </div>

                    <div>
                        <button onClick={() => {handleChangePage(5)}}>
                            <h6>View Leaderboard</h6>
                        </button>
                    </div>

                    <div>
                        <button onClick={() => {handleChangePage(6)}}>
                            <h6>Edit Account</h6>
                        </button>
                    </div>

                    <div>
                    <button onClick={handleLogOut}>
                        <h6>Log Out</h6>
                    </button>
                </div>
                
                </div>
                <Stats {...props}/>
                <Countdown {...props}/>
                <History {...props}/>
            </section>
        </div>
    )
}
