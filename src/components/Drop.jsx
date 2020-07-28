import React from "react";

export default class Drop extends React.Component {
  constructor(props) {
    super();

    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  handleDrop(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    let container = document.createElement("div");
    console.log(dropContainer);
    console.log(container);

    container.className = "droped-pattern";

    dropContainer.appendChild(container);
  }

  handleDragOver(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;

    dropContainer.style.border = "2px dashed green";
  }

  handleDragLeave(event) {
    event.preventDefault();
    let dropContainer = this.refs.drop;
    dropContainer.style.border = "1px solid black";
  }

  render() {
    return (
      <React.Fragment>
        {/* <div
          draggable="true"
          style={{
            width: "50px",
            height: "50px",
            border: "1px solid black",
            marginTop: "10px",
          }}
        >
          <h1>Sou arrastavel</h1>
        </div> */}
        <div
          className="drop-area"
          onDrop={this.handleDrop}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          ref={"drop"}
        ></div>
      </React.Fragment>
    );
  }
}
