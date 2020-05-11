import React from "react";
import * as d3 from "d3";

const margin = { top: 20, right: 20, left: 35, bottom: 20 };
let theobject = null;
export default class Keyframes extends React.Component {
  constructor(props) {
    super(props);
    theobject = this;
    this.state = {
      dataset: [
        { x: 100, y: 110 },
        { x: 83, y: 43 },
        { x: 92, y: 28 },
        { x: 49, y: 74 },
        { x: 51, y: 10 },
        { x: 25, y: 98 },
        { x: 77, y: 30 },
        { x: 20, y: 83 },
        { x: 11, y: 63 },
        { x: 4, y: 55 },
        { x: 0, y: 0 },
        { x: 85, y: 100 },
        { x: 60, y: 40 },
        { x: 70, y: 80 },
        { x: 10, y: 20 },
        { x: 40, y: 50 },
        { x: 25, y: 31 },
      ],
    };
  }

  // Create the scales: y-scale intensity in %; x scale time in ms

  xScale = d3
    .scaleLinear()
    .range([margin.left, this.props.width - margin.right]);
  yScale = d3
    .scaleLinear()
    .range([margin.top, this.props.height - margin.bottom]);

  lineGenerator = d3.line();

  addKeyframe() {
    // Get X and Y coordinates

    let svg = d3.select(theobject.refs.pattern);

    let coords = d3.mouse(this);

    // Transform pixel coordinates into data values
    let newData = {
      x: Math.round(theobject.xScale.invert(coords[0])),
      y: Math.round(theobject.yScale.invert(coords[1])),
    };

    theobject.setState({
      dataset: [...theobject.state.dataset, newData],
    });

    svg
      .selectAll("circle")
      .data(theobject.state.dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => theobject.xScale(d.x))
      .attr("cy", (d) => theobject.yScale(d.y))
      .attr("r", 6);

    console.log(theobject.state.dataset);
  }

  componentDidMount() {
    const data = this.state.dataset;
    const svg = d3.select(this.refs.pattern);

    this.xScale.domain([0, d3.max(data, (d) => d.x + 10)]);
    this.yScale.domain([d3.max(data, (d) => d.y + 10), 0]);

    const xAxis = d3.axisBottom().scale(this.xScale);
    const yAxis = d3.axisLeft().scale(this.yScale);

    d3.select(this.refs.xAxis).call(xAxis);
    d3.select(this.refs.yAxis).call(yAxis);

    // Map key frames according to the scale

    // Handle the onclick event
    svg.on("click", this.addKeyframe);
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => this.xScale(d.x))
      .attr("cy", (d) => this.yScale(d.y))
      .attr("r", 6);
  }

  render() {
    return (
      <svg
        className="svg-container"
        width={this.props.width}
        height={this.props.height}
        ref={"pattern"}
      >
        <g>
          <g
            className="axis"
            ref={"xAxis"}
            transform={
              "translate(" + [0, this.props.height - margin.bottom] + ")"
            }
          ></g>
          <g
            className="axis"
            ref={"yAxis"}
            transform={"translate(" + [margin.left, 0] + ")"}
          ></g>
        </g>
      </svg>
    );
  }
}
