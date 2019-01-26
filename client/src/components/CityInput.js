import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import cities from '../Data'
 
// // Imagine you have a list of cities that you'd like to autosuggest.
// const cities = [
//   {
//     name: 'C',
//     year: 1972
//   },
//   {
//     name: 'Elm',
//     year: 2012
//   },
// ];
 
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : cities.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};
 
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;
 
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);
 
class CityInput extends Component {

  // constructor() {
  //   super();
 
  //   // Autosuggest is a controlled component.
  //   // This means that you need to provide an input value
  //   // and an onChange handler that updates this value (see below).
  //   // Suggestions also need to be provided to the Autosuggest,
  //   // and they are initially empty because the Autosuggest is closed.
  //   this.state = {
  //     value: '',
  //     suggestions: []
  //   };
  // }
 
  handleChange = (event, { newValue }) => {
    // this.setState({
    //   value: newValue
    // });
    this.props.onChange(newValue);
  };
 
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  handleSuggestionsFetchRequested = ({ value }) => {
    // this.setState({
    //   suggestions: getSuggestions(value)
    // });
    this.props.onSuggestionsFetchRequested(getSuggestions(value));
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  handleSuggestionsClearRequested = () => {
    // this.setState({
    //   suggestions: []
    // });
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
      placeholder: 'e.g. New York',
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
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
        onSuggestionSelected={this.handleSuggestionSelected}
        ref={this.storeInputReference}
      />
    );


  }
}

export default CityInput;
