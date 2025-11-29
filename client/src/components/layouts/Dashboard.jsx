import Stats from '../Stats'
import Countdown from '../Countdown'
import History from '../History'

export default function Dashboard(props){
    return (
        <div>
            <section id="dashboard">
                <h3 className="special-shadow-2">Dashboard</h3>
                <Stats {...props}/>
                <Countdown {...props}/>
                <History {...props}/>
            </section>
        </div>
    )
}
