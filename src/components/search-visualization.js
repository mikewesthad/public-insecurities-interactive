import React from "react";
import PropTypes from "prop-types";
import SearchForm from "./search-form";
import { TypingText } from "./typing-text/";
import ResultsLoading from "./results-loading";
import { fetchAutocompletesWithTlds } from "../utils/autocomplete-api";
import { randNum } from "../utils/random";
import styles from "../css/search-visualization.scss";

const googleTlds = [".com", ".co.uk", ".ca", ".fr"];

export default class SearchVisualization extends React.Component {
  constructor(props) {
    super();
    this.state = {
      autocompletes: [],
      searchNum: 0,
      isSearching: false,
      errorMessage: null
    };
  }

  onError(message) {
    this.setState({
      errorMessage: message,
      isSearching: false,
      autocompletes: []
    });
  }

  onResults(results) {
    if (results.autocompletes.length === 0) {
      return this.onError(`No search results for "${results.searchTerm}"`);
    } else {
      this.setState(({ searchNum }) => ({
        autocompletes: results.autocompletes,
        isSearching: false,
        errorMessage: null,
        searchNum: (searchNum += 1)
      }));
    }
  }

  performSearch(phrase) {
    if (phrase === "") return this.onError("Please enter a search term!");
    this.setState({ isSearching: true, errorMessage: null, autocompletes: [] });
    fetchAutocompletesWithTlds(phrase, googleTlds)
      .then(results => this.onResults(results))
      .catch(error => {
        if (error.message.includes("timed out")) {
          this.onError("Server didn't respond. Try searching again.");
        } else {
          this.onError("Error! Please try again later.");
        }
      });
  }

  listResults(autocompletes) {
    return (
      <ul className={styles.results}>
        {autocompletes.map((phrase, i) => (
          <li key={`${this.state.searchNum}-${i}`}>
            <TypingText delay={randNum(0.5, 2.5)} minSpeed={1} maxSpeed={20}>
              {phrase}
            </TypingText>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { searchPhrase } = this.props;
    const { autocompletes, searchNum, isSearching, errorMessage } = this.state;
    return (
      <div className={styles.search}>
        <SearchForm
          defaultValue={searchPhrase}
          onSearchSubmit={value => {
            this.performSearch(value);
          }}
        />

        <div className={styles.results}>
          <ResultsLoading className={styles.loading} isLoading={isSearching} />

          {errorMessage ? (
            <TypingText className={styles.error} minSpeed={20} maxSpeed={20}>
              {errorMessage}
            </TypingText>
          ) : (
            this.listResults(autocompletes)
          )}
        </div>
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
