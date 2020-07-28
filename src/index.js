import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

// import BarChart from "./components/BarCharts";
// import InteractiveKeyframes from "./components/InteractiveKeyframes";
// import KeyframeLineChart from "./components/KeyframeLineChart";
// import InteractiveLineChart from "./components/InteractiveLineChart";
// import DraggingKeyframes from "./components/DraggingKeyframes";
// import AreaChart from "./components/AreaChart";

import AreaChartKeyframes from "./components/AreaChartWithKeyframes";
import DropArea from "./components/Drop";

const width = 500;
const height = 350;

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Data Visualization with D3.js and React</h1>
        {/* <BarChart width={width} height={height}></BarChart> */}
        {/* <InteractiveKeyframes width={width} height={height}></InteractiveKeyframes> */}
        {/* <KeyframeLineChart width={width} height={height}></KeyframeLineChart> */}
        {/* <InteractiveLineChart
          width={width}
          height={height}
        ></InteractiveLineChart> */}
        {/* <DraggingKeyframes width={width} height={height}></DraggingKeyframes> */}
        {/* <AreaChart width={width} height={height}></AreaChart> */}
        <AreaChartKeyframes width={width} height={height}></AreaChartKeyframes>
        <DropArea></DropArea>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
