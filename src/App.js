import React from "react";
import "./App.css";
import TableUI from "./Components/TableUI";

function App() {
  return (
    <div className="mainApp">
      <TableUI
        link="https://jsonplaceholder.typicode.com/comments"
        removeHeader="body"
        remove={["postId", "id"]}
        colorOneCell={{
          cellName: "email",
          CompareFromTable: rowValue => {
            if (rowValue["email"].includes("sydney")) {
              return true;
            } else {
              return false;
            }
          },
          CompareFromOther: () => {}
        }}
      />
    </div>
  );
}

export default App;
