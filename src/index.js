import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import BarChart from "./components/BarCharts";
import LineChart from "./components/LineChart";

const width = 600;
const height = 450;

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Data Visualization with D3.js and React</h1>
        {/* <BarChart width={width} height={height}></BarChart> */}
        <LineChart width={width} height={height}></LineChart>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
