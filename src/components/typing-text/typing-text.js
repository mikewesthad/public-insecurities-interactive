import React from "react";
import PropTypes from "prop-types";
import BlinkingCursor from "./blinking-cursor";
import { randNum, buildNoise1D } from "../../utils/random";

export default class TypingText extends React.Component {
  constructor(props) {
    super(props);
    this.noise = buildNoise1D();
    this.startTime = Date.now();
    this.state = {
      cyclesComplete: 0
    };
  }

  componentDidMount() {
    this.setInitialState(this.props);
    this.scheduleFirstCharacter();
  }

  componentWillReceiveProps(newProps) {
    const { typingDirection, children } = this.props;
    // If the direction changes, typing should start over from a new initial state
    if (typingDirection !== newProps.typingDirection || children !== newProps.children) {
      if (this.state.timer) clearTimeout(this.state.timer);
      this.setInitialState(newProps);
      this.scheduleFirstCharacter();
    }
  }

  setInitialState({ typingDirection, children: fullText }) {
    this.setState({
      isTyping: false,
      typedText: typingDirection === 1 ? "" : fullText,
      timer: null
    });
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

  scheduleFirstCharacter() {
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
    this.setState(
      ({ typedText, cyclesComplete }, { children: fullText, typingDirection, onDone }) => {
        const finalText = typingDirection === 1 ? fullText : "";
        const step = typingDirection === 1 ? 1 : -1;
        if (typedText === finalText) {
          onDone(cyclesComplete + 1, typingDirection);
          return { isTyping: false, cyclesComplete: cyclesComplete + 1 };
        } else {
          const timer = this.scheduleNextCharacter(this.getNextInterval());
          return {
            typedText: fullText.slice(0, typedText.length + step),
            isTyping: true,
            timer
          };
        }
      }
    );
  }

  render() {
    const { isTyping, typedText } = this.state;
    const { showCursor, className } = this.props;
    return (
      <span className={className}>
        {typedText}
        {showCursor ? <BlinkingCursor isTyping={isTyping} /> : ""}
      </span>
    );
  }
}

TypingText.propTypes = {
  children: PropTypes.string,
  minSpeed: PropTypes.number,
  maxSpeed: PropTypes.number,
  delay: PropTypes.number,
  typingDirection: PropTypes.number,
  onDone: PropTypes.func,
  showCursor: PropTypes.bool
};

TypingText.defaultProps = {
  children: "",
  minSpeed: 10,
  maxSpeed: 10,
  delay: 0,
  typingDirection: 1,
  onDone: () => {},
  showCursor: true
};
