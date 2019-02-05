import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import FlagIcon from './FlagIcon'
 
class CityInput extends Component {

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;
   
  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      <FlagIcon 
      className="country-flag"
      code={suggestion.country.toLowerCase()} 
      size="1x" 
      squared={false}
      />
      <span>{suggestion.name}</span>
    </div>
  );

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

  handleKeyPress = (event) => {
    this.props.onKeyPress(event);
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
      onKeyPress: this.handleKeyPress,
      //onKeyUp: () => {console.log("hello")}
    };
 
    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
        onSuggestionSelected={this.handleSuggestionSelected}
        ref={this.storeInputReference}
      />
    );


  }
}

export default CityInput;
