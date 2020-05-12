import React from "react";
import * as d3 from "d3";

import DataPoints from "../datasets/pattern1.json";

const margin = { top: 20, rigth: 30, bottom: 30, left: 40 };

export default class AreaChartWithKeyframes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datapoints: null,
      area: null,
    };
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

  areaGenerator = d3.area();

  componentDidMount() {
    const data = DataPoints.keyframes;
    // Set xScale domain according to the time defined in the config file
    this.xScale.domain([0, d3.max(data, (d) => d.time + 10)]);

    // Y Scale is a fixed scale from 0 to 100%
    this.yScale.domain([100, 0]);

    // Set the axis

    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);

    // Set the area points

    this.areaGenerator.x((d) => this.xScale(d.time));
    this.areaGenerator.y1((d) => this.yScale(d.intensity)); // Topline
    this.areaGenerator.y0(this.props.height - margin.bottom); // Baseline
    //this.areaGenerator.curve(d3.curveMonotoneX);

    // Set the keyframes

    d3.select(this.refs.area)
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "orange")
      .attr("cx", (d) => this.xScale(d.time))
      .attr("cy", (d) => this.yScale(d.intensity))
      .attr("r", 4);

    const area = this.areaGenerator(data);

    this.setState({ area });
  }

  render() {
    return (
      <svg
        className="svg-container"
        width={this.props.width}
        height={this.props.height}
        ref={"area"}
      >
        <path d={this.state.area} fill="#69b3a2" stroke={"orange"}></path>
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
