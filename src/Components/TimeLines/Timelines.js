import React from "react";
import Timeline from "./TimeLine/Timeline";
import "./Timelines.css"

const Timelines = (props) => (
    <div style={{marginLeft : "2em"}}>
        <h2>Activity log for {props.personName}</h2>
        <ul className="timeline">
            {props.timelinesData.map((item, index) => (
                <Timeline key={index} taskName={item.taskName} performedBy={item.performedBy}
                          dateTime={item.dateTime}/>
            ))}
        </ul>
    </div>
);


export default Timelines;