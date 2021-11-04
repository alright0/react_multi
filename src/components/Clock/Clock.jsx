import React from "react";
import c from "./Clock.module.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div className={c.clock}>
        {}
        <h2>{this.state.date.toString()}</h2>
      </div>
    );
  }
}

export default Clock;
