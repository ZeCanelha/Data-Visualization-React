import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

// import BarChart from "./components/BarCharts";
// import InteractiveKeyframes from "./components/InteractiveKeyframes";
import KeyframeLineChart from "./components/KeyframeLineChart";

const width = 600;
const height = 450;

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Data Visualization with D3.js and React</h1>
        {/* <BarChart width={width} height={height}></BarChart> */}
        {/* <InteractiveKeyframes width={width} height={height}></InteractiveKeyframes> */}
        <KeyframeLineChart width={width} height={height}></KeyframeLineChart>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
