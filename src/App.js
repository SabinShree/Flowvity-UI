import React from "react";
import "./App.css";
import TimelinesPractice from "./Components/TimeLinePractice/TimlinePractice";

class App extends React.Component {
    state = {
        timelineData: [{
            taskName: "Receive Documents from client",
            performedBy: "Mahaesh  Adhikari",
            dateTime: 1577092789693
        }, {taskName: "Check Client Details", performedBy: "Kapil Sharma", dateTime: 1577092714673},
            {
                taskName: "Check Client Details",
                performedBy: "Rujika Adhikari",
                dateTime: 1577165111383
            }, {
                taskName: "Enter Client details in TMS",
                performedBy: "Sabin Kharel",
                dateTime: 1577012541383
            }, {
                taskName: "Scan Client Documents",
                performedBy: "Shree prasad Kharel",
                dateTime: 1577096541383
            }]
    }

    render() {
        return (
            <div className="mainApp">
                {/*<TableUI*/}
                {/*    title="Task Breakdown"*/}
                {/*    link="http://localhost:8082/customerOnboarding/viewClientInfoWithCitizenship/"*/}
                {/*    removeHeader="emailId"*/}
                {/*    remove={["id", "phoneNo", "boid", "citizenshipNumber"]}*/}
                {/*    colorOneCell={{*/}
                {/*        cellName: "citizenshipIssuedPlace",*/}
                {/*        // return should be in either true or false.*/}
                {/*        CompareFromTable: rowValue => {*/}
                {/*            return rowValue["citizenshipIssuedPlace"] === "Baglung";*/}
                {/*        },*/}
                {/*    }}*/}
                {/*/>*/}
                <TimelinesPractice/>
            </div>
        );
    }
}

export default App;
