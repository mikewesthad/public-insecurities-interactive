import React from "react";
import PropTypes from "prop-types";
import styles from "../css/search.scss";

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.props.onSearchSubmit(this.state.value);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.props.onSearchChange(this.state.value);
    }
  }

  render() {
    return (
      <input
        className={styles.search}
        type="text"
        name="search-phrase"
        value={this.state.value}
        onChange={e => this.handleChange(e)}
        onKeyDown={e => this.handleKeyDown(e)}
      />
    );
  }
}

SearchForm.propTypes = {
  defaultValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func
};

SearchForm.defaultProps = {
  defaultValue: "",
  onSearchChange: () => {},
  onSearchSubmit: () => {}
};
