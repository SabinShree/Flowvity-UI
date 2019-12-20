import React from "react";
import "./App.css";
import TableUI from "./Components/TableUI";
import Moment from "moment";


function App() {
    return (
        <div className="mainApp">
            <TableUI
                title="Task Breakdown"
                link="http://localhost:8082/customerOnboarding/viewClientInfoWithCitizenship/"
                removeHeader="address"
                remove={["id", "phoneNo", "boid", "citizenshipNumber" ]}
                colorOneCell={{
                    cellName: "clientName",
                    CompareFromTable: rowValue => {
                        return rowValue["clientName"] === "Sabin Kharel";
                    },
                    CompareFromOther: () => {
                    }
                }}
            />
        </div>
    );
}

export default App;
