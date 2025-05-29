import SaaaJsonData from "./SAAAFeedback.json";
import McanJsonData from "./MCANFeedback.json";
import React from 'react';
import Graphs from "./Graphs";

export default function Stats() {
    let SAAA = "Show Ask Attend and Answer";
    let MCAN = "Deep Modular Co-Attention Networks"
    return(
        <div style={{'margin': 'auto',width: '80%'}} >

        <div style={{display: 'flex',justifyContent:'center', alignItems:'center', 'flexDirection': 'row'}}>
            {Graphs(SAAA, SaaaJsonData)}
            
        </div>
        <div style={{display: 'flex',justifyContent:'center', alignItems:'center', 'flexDirection': 'row'}}>
        {Graphs(MCAN,McanJsonData)}
        </div>
        
        </div>
        
    );
}   