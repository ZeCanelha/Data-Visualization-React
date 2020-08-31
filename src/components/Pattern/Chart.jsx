import React from "react";
import Datapoints from "../../datasets/pattern2.json";
import Pattern from "./Pattern";
import update from "immutability-helper";
import * as d3 from "d3";

/*
    Recebe os datapoins e cria um componente que irá renderizar o SVG. Pode-se 
    fazer em menos passos. Uso do spread operator.

*/

const margin = { top: 20, rigth: 30, bottom: 30, left: 40 };

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: Datapoints.keyframes };
  }

  render() {
    return (
      <div className="container">
        <Pattern
          {...this.state}
          {...this.props}
          {...margin}
          addKeyFrame={this.addKeyFrame}
        ></Pattern>
      </div>
    );
  }
}
export default Chart;
