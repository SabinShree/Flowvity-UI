import React from "react";
import "./Timeline.css";
import Moment from "moment";

const Timeline = (props) => {
    let date = Moment.unix(props.dateTime / 1000).format("DD/MM/YYYY");
    let Time = Moment.unix(props.dateTime / 1000).format("hh:mm a");

    return (<li>
        <div className="direction-r">
            <div className="flag-wrapper">
                <span className="performedBy">Performed By {props.performedBy}</span>
                <span className="date">{date}</span>
            </div>
            <div className="time">{Time}</div>
        </div>
    </li>);
};

export default Timeline;