import React from "react";
import Datapoints from "../../datasets/pattern2.json";
import Pattern from "./Pattern";

/*
    Recebe os datapoins e cria um componente que irá renderizar o SVG. Pode-se 
    fazer em menos passos. Uso do spread operator.

*/

const margin = { top: 20, rigth: 30, bottom: 30, left: 40 };

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: Datapoints.keyframes, width: null, height: null };
    this.fitToContainer = this.fitToContainer.bind(this);
  }

  componentDidMount() {
    this.fitToContainer();
    window.addEventListener("resize", this.fitToContainer);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.fitToContainer);
  }

  fitToContainer() {
    console.log("Resizing");

    const { width } = this.state;
    const { height } = this.state;

    const currentWidth = this.refs.patternContainer.getBoundingClientRect()
      .width;
    const currentHeight = this.refs.patternContainer.getBoundingClientRect()
      .height;

    const shouldResize = width !== currentWidth || height !== currentHeight;

    if (shouldResize) {
      this.setState({ width: currentWidth, height: currentHeight });
    }
  }

  render() {
    const shouldRender = this.state.width !== null;

    return (
      <div className="container" ref={"patternContainer"}>
        {shouldRender && (
          <Pattern
            {...this.state}
            {...this.props}
            {...margin}
            addKeyFrame={this.addKeyFrame}
          ></Pattern>
        )}
      </div>
    );
  }
}
export default Chart;
