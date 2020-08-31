import React from "react";

const renderCircles = (props) => {
  return (coords, index) => {
    console.log(coords);
    const circleProps = {
      cx: props.xScale(coords.time),
      cy: props.yScale(coords.intensity),
      r: 4,
      key: index,
    };
    return <circle {...circleProps}></circle>;
  };
};

export default (props) => {
  return <g>{props.data.map(renderCircles(props))}</g>;
};
