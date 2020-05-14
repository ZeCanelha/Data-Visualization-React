import React from "react";
import * as d3 from "d3";
import update from "immutability-helper";
import DataPoints from "../datasets/pattern2.json";
import { curveMonotoneX } from "d3";

const margin = { top: 20, rigth: 30, bottom: 30, left: 40 };

let quickfix = null;

export default class AreaChartWithKeyframes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datapoints: null,
      area: null,
    };
    quickfix = this;
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

  areaGenerator = d3.area().curve(curveMonotoneX);

  drawKeyframe(coords) {
    let svg = d3.select(this.refs.area);
    let newPoints = {
      time: Math.round(this.xScale.invert(coords[0])),
      intensity: Math.round(this.yScale.invert(coords[1])),
    };

    // update datapoints in time

    let datapoints = this.state.datapoints;
    let needToUpdate = 0;
    let index = 0;

    for (index; index < datapoints.length; index++) {
      if (datapoints[index].time < newPoints.time) continue;
      else {
        needToUpdate = index;
        break;
      }
    }

    if (needToUpdate !== 0) {
      datapoints.splice(index, 0, newPoints);
      this.setState({
        datapoints: update(this.state.datapoints, {
          datapoints: { $set: datapoints },
        }),
      });
    } else {
      this.setState({ datapoints: [...this.state.datapoints, newPoints] });
    }

    console.log(this.state.datapoints);

    svg
      .selectAll("circle")
      .data(this.state.datapoints)
      .enter()
      .append("circle")
      .attr("cx", this.xScale(newPoints.time))
      .attr("cy", this.yScale(newPoints.intensity))
      .attr("r", 4)
      .attr("fill", "orange")
      .on("mouseover", this.handleMouseOver)
      .on("mouseout", this.handleMouseOut)
      .call(
        d3
          .drag()
          .on("start", this.draggStarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      );
  }

  handleMouseOver(d, i) {
    d3.select(this)
      .attr("fill", "orange")
      .attr("r", "8")
      .append("title")
      .text(d.time + ", " + d.intensity);
  }

  handleMouseOut(d, i) {
    d3.select(this).attr("fill", "orange").attr("r", "4");
  }

  draggStarted(d) {
    console.log("drag started");
  }
  dragged(d, i) {
    d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);

    let x = Math.round(quickfix.xScale.invert(d3.event.x));
    let y = Math.round(quickfix.yScale.invert(d3.event.y));

    quickfix.quickfix2(x, y, i);
  }
  dragended(d) {
    d3.select(this).text(d3.event.x + ", " + d3.event.y);
  }

  quickfix2(x, y, i) {
    let newState = update(this.state, {
      datapoints: {
        [i]: {
          time: { $set: x },
          intensity: { $set: y },
        },
      },
    });
    this.setState(newState);
  }

  componentDidMount() {
    let theobject = this;
    const data = DataPoints.keyframes;

    this.setState({ datapoints: data });

    // Set xScale domain according to the time defined in the config file
    this.xScale.domain([0, 350]);

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

    d3.select(this.refs.area).on("dblclick", function () {
      let coords = d3.mouse(this);
      theobject.drawKeyframe(coords);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.datapoints !== this.state.datapoints) {
      console.log("A change in state occured");
      const area = this.areaGenerator(this.state.datapoints);

      this.setState({ area: area });
    }
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
