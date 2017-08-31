import React from "react";
import BlinkingCursor from "./blinking-cursor";
import PropTypes from "prop-types";
import { randNum, buildNoise1D } from "../utils/random";

export default class TypingText extends React.Component {
  constructor({ delay, minSpeed, maxSpeed, children }) {
    super();
    this.state = {
      isTyping: false,
      typedText: "",
      timer: null
    };
    this.noise = buildNoise1D();
    this.startTime = Date.now();
  }

  elapsedMs() {
    return Date.now() - this.startTime;
  }

  getSpeed() {
    const t = this.elapsedMs() / 1000; // Scale t down to make noise more coherent
    return this.noise(t, this.props.minSpeed, this.props.maxSpeed);
  }

  getNextInterval() {
    return 1 / this.getSpeed() * 1000;
  }

  componentDidMount() {
    let timer;
    if (this.props.delay) timer = this.scheduleNextCharacter(this.props.delay * 1000);
    else timer = this.scheduleNextCharacter(this.getNextInterval());
    this.setState({ timer });
  }

  componentWillUnmount() {
    if (this.state.timer) clearTimeout(this.state.timer);
  }

  scheduleNextCharacter(delay) {
    const timer = setTimeout(() => this.typeCharacter(), delay);
    return timer;
  }

  typeCharacter() {
    this.setState(({ typedText }, { children: fullText }) => {
      if (typedText === fullText) {
        return { isTyping: false };
      } else {
        const timer = this.scheduleNextCharacter(this.getNextInterval());
        return {
          typedText: fullText.slice(0, typedText.length + 1),
          isTyping: true,
          timer
        };
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.typedText}
        <BlinkingCursor isTyping={this.state.isTyping} />
      </div>
    );
  }
}

TypingText.propTypes = {
  children: PropTypes.string,
  minSpeed: PropTypes.number,
  maxSpeed: PropTypes.number,
  delay: PropTypes.number
};

TypingText.defaultProps = {
  children: "",
  minSpeed: 10,
  maxSpeed: 10,
  delay: 0
};
