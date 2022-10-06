import React from "react"
import Collections from '../components/Collections';
import Words from '../components/Words';
import TypeBar from '../components/TypeBar';


const LearnWords = () => {

    return (
        <div>      
            <TypeBar />
        <div className="start">
            <Collections />
            <Words />
        </div>
        </div>
        
    )
}


export default LearnWords

