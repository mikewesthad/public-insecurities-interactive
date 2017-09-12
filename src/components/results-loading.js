import React from "react";
import PropTypes from "prop-types";
import { TypingText } from "./typing-text/";

/**
 * A combination loading bar plus header to be displayed at the top of the search results. It
 * displays nothing until triggered via the isLoading prop. Once triggered, it will display
 * "Results..." with the ellipsis being typed out and deleted in a ping ponging loop until isLoading
 * is set to false again (upon which the ellipsis will end the animation in the "deleted" state).
 * 
 * @export
 * @class ResultsLoading
 * @extends {React.Component}
 */
export default class ResultsLoading extends React.Component {
  constructor({ isLoading }) {
    super();
    this.state = {
      firstSeachComplete: isLoading,
      animationComplete: false,
      ellipsisDirection: 1
    };
  }

  componentWillReceiveProps({ isLoading }) {
    // Not loading -> loading, new search so time to reset the animation
    if (this.props.isLoading !== isLoading && isLoading) {
      this.setState({
        firstSeachComplete: true,
        animationComplete: false,
        ellipsisDirection: 1
      });
    }
  }

  onEllipseCycle(cyclesComplete, directionComplete) {
    // End the animation if nothing is loading and the ellipsis have reached the end of the
    // "deleted" animation
    this.setState(({ ellipsisDirection }, { isLoading }) => {
      const completedPingPong = !isLoading && cyclesComplete > 1 && ellipsisDirection === -1;
      return {
        animationComplete: completedPingPong,
        ellipsisDirection: completedPingPong ? ellipsisDirection : -1 * ellipsisDirection
      };
    });
  }

  render() {
    const { isLoading, className } = this.props;
    const { firstSeachComplete, animationComplete, ellipsisDirection } = this.state;

    if (!firstSeachComplete) return null;

    const text = isLoading ? (
      <TypingText delay={0} minSpeed={35} maxSpeed={35} showCursor={false}>
        Results
      </TypingText>
    ) : (
      "Results"
    );

    const ellipses = (
      <TypingText
        delay={0.4}
        minSpeed={7}
        maxSpeed={7}
        typingDirection={ellipsisDirection}
        onDone={(cyclesComplete, directionComplete) =>
          this.onEllipseCycle(cyclesComplete, directionComplete)}
      >
        ...
      </TypingText>
    );

    return (
      <div className={className}>
        {text}
        {ellipses}
      </div>
    );
  }
}
