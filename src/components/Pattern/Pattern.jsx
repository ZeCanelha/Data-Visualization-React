import React from "react";
import DataCircles from "./DataCircles";
import XYAxis from "./XYAxis";
import * as d3 from "d3";

function xScale(props) {
  return d3
    .scaleLinear()
    .domain([0, d3.max(props.data, (d) => d.time)])
    .range([props.left, props.width - props.rigth]);
}

function yScale(props) {
  return d3
    .scaleLinear()
    .domain([100, 0])
    .range([props.top, props.height - props.bottom]);
}

export default (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return (
    <svg
      className="svg-container"
      width={props.width}
      height={props.height}
      onDoubleClick={props.addKeyFrame}
    >
      <DataCircles {...props} {...scales}></DataCircles>
      <XYAxis {...props} {...scales}></XYAxis>
    </svg>
  );
};
