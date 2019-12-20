import React, {Component} from "react";
import ReactTable from "react-table-6";
import Moment from "moment";
import {capitalizeFirstLetterOnly} from "../Utils/Utils.js";
import {omit, map} from "lodash";
import "react-table-6/react-table.css";
import {Container} from "reactstrap"

class TableUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            header: [],
            containsData: false
        };
    }

    getTableHeaderFromData(data) {
        const headerText = Object.keys(data[0]).sort();
        const header = [];
        headerText.forEach(item => {
            const itemObj = {};
            itemObj["id"] = item;
            console.log(item);
            itemObj["Header"] =
                this.props.removeHeader !== item
                    ? capitalizeFirstLetterOnly(item.replace(/([a-z])([A-Z])/g, "$1 $2"))
                    : "";
            itemObj["style"] = {whiteSpace: "unset"};
            itemObj["accessor"] = item;
            itemObj["width"] = this.getColumnWidth(
                itemObj["accessor"],
                itemObj["Header"],
                data
            );
            itemObj["Cell"] = row => (
                <div style={{textAlign: "center"}}>{row.value}</div>
            );
            if (itemObj["accessor"] === this.props.colorOneCell.cellName) {
                itemObj["getProps"] = (state, rowInfo, column) => {
                    if (rowInfo && rowInfo.row) {
                        return {
                            style: {
                                background: this.props.colorOneCell.CompareFromTable(rowInfo.row)
                                    ? "#00B187"
                                    : "#FF5676",
                                borderStyle: "none",
                                color: "white",
                            }
                        };
                    } else {
                        return {};
                    }
                };
                itemObj["Cell"] = row => (
                    <div style={{textAlign: "left"}}>{row.value}</div>
                );
            }


            if (itemObj["id"] === "timeStamps") {
                itemObj["accessor"] = item =>
                    Moment(item.timeStamps)
                        .local()
                        .format("MM/DD/YYYY, h:mm:ss a")
                        .toString();
            }
            header.push(itemObj);
        });
        return header;
    }

    getColumnWidth(accessor, headerText, data) {
        let max = 0;

        const maxWidth = 400;
        const magicSpacing = 18;

        for (let i = 0; i < data.length; i++) {
            if (data[i] !== undefined && data[i][accessor] !== null) {
                if (JSON.stringify(data[i][accessor] || "null").length > max) {
                    max = JSON.stringify(data[i][accessor] || "null").length;
                }
            }
        }

        return Math.min(maxWidth, Math.max(max, headerText.length) * magicSpacing);
    }

    mapArray(array) {
        return map(
            array,
            object => omit(object, this.props.remove) // return from _.omit
        );
    }

    convertBooleanIntoString(array) {
        return array.map((item, index) => {
            for (var itemObj in item) {
                if (item[itemObj] === true) {
                    item[itemObj] = "true";
                } else if (item[itemObj] === false) {
                    item[itemObj] = "false";
                }
            }
            return item;
        });
    }

    componentDidMount() {
        fetch(this.props.link, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                data = this.convertBooleanIntoString(data);
                data = data.slice(0, 10);
                console.log(data);
                if (this.props.remove) {
                    data = this.mapArray(data);
                }
                this.setState({data: data});
                return data;
            })
            .then(data => {
                if (data.length !== 0) {
                    const header = this.getTableHeaderFromData(data);
                    this.setState({header: header});
                    this.setState({containsData: true});
                }
            });
    }

    getTrProps = (state, rowInfo, instance) => {
        if (rowInfo) {
            return {
                style: {
                    background: "#F3F7FA",
                    margin: "0.1em 0 0.8em 0"
                }
            };
        }
        return {};
    };

    render() {
        let component;
        let length = this.state.data.length;
        if (this.state.containsData) {
            component = (
                <Container style={{background: "#F3F7FA"}}>
                    <p style={{fontSize: " 1.2em", letterSpacing: "1.5px", margin: "0px 0px"}}>{this.props.title}</p>
                    <ReactTable
                        defaultPageSize={length}
                        resizable={true}
                        data={this.state.data}

                        getTheadThProps={(state, rowInfo, column) => {
                            return {
                                style: {
                                    background: "#F3F7FA",
                                    borderStyle: "none",
                                    fontWeight: "bolder"
                                }
                            };
                        }}
                        getTrProps={this.getTrProps}
                        showPaginationBottom={false}
                        columns={this.state.header}
                    />
                </Container>
            );
        } else {
            component = (
                <div style={{border: "1px solid black", margin: "5px"}}>
                    <h4 style={{textAlign: "center"}}>No data in the given table. </h4>
                </div>
            );
        }
        return <div>{component}</div>;
    }
}

export default TableUI;
