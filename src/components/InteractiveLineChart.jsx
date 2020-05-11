import React from "react";
import * as d3 from "d3";
import PatternData from "../datasets/pattern2.json";

const margin = { top: 20, rigth: 30, bottom: 30, left: 40 };

export default class InteractiveLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datapoints: null,
      pattern: null,
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

  // Line generator to create the pattern

  lineGenerator = d3.line();

  drawKeyframe(coords) {
    let svg = d3.select(this.refs.pattern);

    let lastpoint = this.state.datapoints.slice(-1);
    let newPoints = {
      time: Math.round(this.xScale.invert(coords[0])),
      intensity: Math.round(this.yScale.invert(coords[1])),
    };

    if (lastpoint[0].time < newPoints.time) {
      this.setState({
        datapoints: [...this.state.datapoints, newPoints],
      });

      svg
        .selectAll("circle")
        .data(this.state.datapoints)
        .enter()
        .append("circle")
        .attr("cx", (d) => this.xScale(d.time))
        .attr("cy", (d) => this.yScale(d.intensity))
        .attr("r", 6)
        .on("mouseover", this.handleMouseOver)
        .on("mouseout", this.handleMouseOut);
    } else {
      console.log("Invalid point");
    }
  }

  handleMouseOver(d, i) {
    d3.select(this)
      .attr("fill", "orange")
      .attr("r", "8")
      .append("title")
      .text(d.time + ", " + d.intensity);
  }

  handleMouseOut(d, i) {
    d3.select(this).attr("fill", "black").attr("r", "6");
  }

  componentDidMount() {
    const theobject = this;
    const keyframes = PatternData.keyframes;

    this.setState({ datapoints: keyframes });

    // Set xScale domain according to the time defined in the config file
    this.xScale.domain([0, 350]);

    // Y Scale is a fixed scale from 0 to 100%
    this.yScale.domain([100, 0]);

    // Set the axis

    d3.select(this.refs.xAxis).call(this.xAxis);
    d3.select(this.refs.yAxis).call(this.yAxis);

    // Set the line generator
    this.lineGenerator.x((d) => this.xScale(d.time));
    this.lineGenerator.y((d) => this.yScale(d.intensity));

    // Set the listeners

    d3.select(this.refs.pattern).on("click", function () {
      let coords = d3.mouse(this);
      theobject.drawKeyframe(coords);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.datapoints !== this.state.datapoints) {
      console.log("A state change has occurred");
      // Update State and drawline
      const pattern = this.lineGenerator(this.state.datapoints);
      this.setState({ pattern: pattern });
    }
  }

  render() {
    return (
      <svg
        className="svg-container"
        width={this.props.width}
        height={this.props.height}
        ref={"pattern"}
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
