import React from "react";
import PropTypes from "prop-types";
import SearchForm from "./search-form";
import TypingText from "./typing-text";
import { fetchAutocompletes, fetchAutocompletesWithTlds } from "../utils/autocomplete-api";
import { randNum } from "../utils/random";
import styles from "../css/search-visualization.scss";

const googleTlds = [".com", ".co.uk", ".ca", ".fr"];

export default class SearchVisualization extends React.Component {
  constructor(props) {
    super();
    this.state = {
      autocompletes: [],
      searchNum: 0
    };
  }

  performSearch(phrase) {
    fetchAutocompletesWithTlds(phrase, googleTlds)
      .then(result => {
        this.setState(({ searchNum }) => ({
          autocompletes: result.autocompletes,
          searchNum: (searchNum += 1)
        }));
      })
      .catch(err => console.log(err));
  }

  render() {
    const { searchPhrase } = this.props;
    const { autocompletes, searchNum } = this.state;
    return (
      <div className={styles.search}>
        <SearchForm
          defaultValue={searchPhrase}
          onSearchSubmit={value => {
            this.performSearch(value);
          }}
        />
        <ul className={styles.results}>
          {autocompletes.map((phrase, i) => (
            <li key={`${this.state.searchNum}-${i}`}>
              <TypingText delay={randNum(0, 3)} minSpeed={1} maxSpeed={20}>
                {phrase}
              </TypingText>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

SearchVisualization.propTypes = {
  searchPhrase: PropTypes.string
};

SearchVisualization.defaultProps = {
  defaultValue: ""
};
