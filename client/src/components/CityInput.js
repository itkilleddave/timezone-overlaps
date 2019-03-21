import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import FlagIcon from './FlagIcon'
 
class CityInput extends Component {

  constructor(props) {
    super(props)
    this.renderSuggestion = this.renderSuggestion.bind(this)
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;
   
  // Use your imagination to render suggestions.

  renderSuggestion(suggestion) {
    return (<div>
      <FlagIcon 
      className="country-flag"
      code={suggestion.country.toLowerCase()} 
      squared={false}
      />
      <span>{suggestion.name}</span>
    </div>)
  }


  renderSuggestionsContainer({ containerProps , children, query }) {
    
    return (
      <div {... containerProps} className="react-autosuggest__suggestions-container">
        {children}
      </div>
    );
  }

  renderInputComponent(inputProps) {

    return (
      <div>
        <input {...inputProps} />
        <div className="pre-loader">
          <div className="pre-loader-bar">
            <div className="pre-loader-handle">
            </div>
          </div>
        </div>
      </div>
    )
  }


  handleChange = (event, { newValue }) => {
    this.props.onChange(newValue);
  };
 
  handleSuggestionsFetchRequested = ({ value }) => {

    const minCharacters = 2

    if (value.length >= minCharacters) {
      this.props.onSuggestionsFetchRequested(value);
    } else {
      this.props.onSuggestionsClearRequested();
    }
  };
 
  handleSuggestionsClearRequested = () => {
    this.props.onSuggestionsClearRequested();
  };

  handleKeyDown = (event) => {
    this.props.onKeyDown(event);
  };

  handleKeyUp = (event) => {
    this.props.onKeyUp(event);
  };

  handleSuggestionSelected = (event, { 
    suggestion, 
    suggestionValue, 
    suggestionIndex, 
    sectionIndex, 
    method }) => {

    this.props.onSuggestionSelected(suggestion)
  }
  componentDidMount() {
    
    // use a timeout for delay, to allow time for the scrollTo animation.
    // because the focusing also triggers an auto scroll (with no animation)
    // which breaks/overrides the scrollTo animation

    setTimeout(
        function() {
            this.input.focus()
        }
        .bind(this),
        250
    );
  }

  storeInputReference = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };
 
  render() {

    const { value, suggestions } = this.props;

    //const randomIndex = Math.floor(Math.random() * cities.length)  

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'e.g. Tokyo',
      value,
      onChange: this.handleChange,
      //onKeyDown: this.handleKeyDown,
      //onKeyUp: this.handleKeyUp,
      //onKeyUp: () => {console.log("hello")}
    }

    // Finally, render it!
    return (
      <div className={"city-input "+(this.props.isLoading ? "is-loading" : "")}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          renderInputComponent={this.renderInputComponent}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
          onSuggestionSelected={this.handleSuggestionSelected}
          ref={this.storeInputReference}
          scrollBar={true}
        />
      </div>
    );


  }
}

export default CityInput;
