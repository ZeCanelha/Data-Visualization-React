import React from "react";
import * as d3 from "d3";

import csvdata from "../datasets/daily-minimum-temperatures-in-me.csv";

const margins = { top: 20, left: 20, right: 20, bottom: 20 };

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
    };
  }

  // Usually consideres the innerWidth and innerHeight ( width - margins on x, height - marings on y)

  innerHeight = this.props.height - margins.bottom - margins.top;
  innerWidth = this.props.width - margins.left - margins.right;

  xScale = d3.scaleTime().range([0, this.innerWidth]);
  yScale = d3.scaleLinear().range([0, this.innerHeight]);

  yAxis = d3.axisLeft(this.yScale);

  componentDidMount() {
    d3.csv(csvdata)
      .then((data) => {
        data.forEach((d) => {
          d.date = new Date(d.date);
        });

        this.drawBarChart(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  drawBarChart(data) {
    // Example without scales on both axis

    const xValue = (d) => d.date;
    const yValue = (d) => d.temperature;

    this.xScale.domain(d3.extent(data, xValue));
    this.yScale.domain(d3.extent(data, yValue));

    d3.select(this.refs.yAxis).call(this.yAxis);

    const svgCanvas = d3.select(this.refs.canvas);
    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", (d) => this.xScale(xValue(d)))
      .attr("height", (d) => this.yScale(yValue(d)))
      .attr("fill", "orange")
      .attr("stroke", "black");
  }
  render() {
    return (
      <svg
        className="svg-container"
        width={this.props.width}
        height={this.props.height}
        ref={"canvas"}
      >
        <g ref={"xAxis"} />
        <g ref={"yAxis"} />
      </svg>
    );
  }
}
