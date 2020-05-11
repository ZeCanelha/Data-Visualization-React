import React from "react";
import * as d3 from "d3";

import PatternData from "../datasets/pattern1.json";

const margin = { top: 20, rigth: 30, bottom: 30, left: 40 };
let theobject = null;

export default class InteractiveChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: null,
    };
    theobject = this;
  }

  // Scales and axis
  xScale = d3
    .scaleLinear()
    .range([margin.left, this.props.width - margin.rigth]);
  yScale = d3
    .scaleLinear()
    .range([margin.top, this.props.height - margin.bottom]);

  xAxis = d3.axisBottom().scale(this.xScale);
  yAxis = d3.axisLeft().scale(this.yScale);

  // Line generator to create the pattern

  lineGenerator = d3.line();

  componentDidMount() {
    const keyframes = PatternData.keyframes;

    // Set xScale domain according to the time defined in the config file
    this.xScale.domain([0, d3.max(keyframes, (d) => d.time)]);

    // Y Scale is a fixed scale from 0 to 100%
    this.yScale.domain([100, 0]);

    // Set the axis

    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);

    // Set the line generator
    this.lineGenerator.x((d) => this.xScale(d.time));
    this.lineGenerator.y((d) => this.yScale(d.intensity));
    this.lineGenerator.curve(d3.curveMonotoneX);

    // Add the keyframes to each data point

    d3.select(this.refs.pattern)
      .selectAll(".keyframe")
      .data(keyframes)
      .enter()
      .append("circle")
      .attr("class", "keyframe")
      .attr("cx", (d) => this.xScale(d.time))
      .attr("cy", (d) => this.yScale(d.intensity))
      .attr("r", 6);

    // Create the line
    const pattern = this.lineGenerator(keyframes);

    // Set the state to draw the pattern
    this.setState({ pattern });
  }

  render() {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        ref={"pattern"}
        className="svg-container"
      >
        <path d={this.state.pattern} fill="none" stroke={"black"}></path>
        <g>
          <g
            ref={"xAxis"}
            transform={
              "translate(" + [0, this.props.height - margin.bottom] + ")"
            }
          ></g>
          <g
            ref={"yAxis"}
            transform={"translate(" + [margin.left, 0] + ")"}
          ></g>
        </g>
      </svg>
    );
  }
}
