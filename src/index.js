import React from "react";
import ReactDOM from "react-dom";
import { Map, List, fromJS } from "immutable";
import contentArray from "./contentArray";
import bubbleSorter from "./bubbleSort";
import binarySearch from "./recursiveBinarySearch";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: Map({
        originalArray: List(contentArray),
        sortedArray: List(),
        results: "",
        value: ""
      })
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.binarySearchMethod = this.binarySearchMethod.bind(this);
  }

  componentDidMount() {
    const { state } = this.state;
    this.bubbleSort(state.get("originalArray"));
  }

  bubbleSort(arrayToSort) {
    const { state } = this.state;
    bubbleSorter(arrayToSort)
      .then(newArray =>
        this.setState({
          state: state.update("sortedArray", list => list.push(...newArray))
        })
      )
      .catch(error => {
        console.error(error);
      });
  }

  binarySearchMethod(array, word) {
    const { state } = this.state;
    binarySearch(array, word)
      .then(results =>
        this.setState({
          state: state.set("results", `${results}`).set("value", "")
        })
      )
      .catch(error => {
        console.error(error);
      });
  }

  handleChange(event) {
    const { state } = this.state;
    event.preventDefault();
    this.setState({
      state: state.set("value", event.target.value)
    });
  }

  handleSubmit(event) {
    const { state } = this.state;
    event.preventDefault();
    state.get("value").length >= 1 &&
      this.binarySearchMethod(state.get("sortedArray"), state.get("value"));
  }

  render() {
    const { value, results, sortedArray, state } = this.state;
    return (
      <main className="App">
        <section>
          <h1>Bubble Sort/Recursive Binary Search</h1>
          <h3>A Bubble Sort / Recursive Binary Search on Immutable.JS state</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search an Animal:
              <input
                type="text"
                value={state.get("value")}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <h3>{state.get("results")}</h3>
        </section>
        <section className="comparison-container">
          <article className="comparison-container__column">
            <h1>Original Array</h1>
            <span>Not Sorted:</span>
            {state
              .get("originalArray")
              .map((content, index) => <p key={(index += 1)}>{content}</p>)}
          </article>
          <article className="comparison-container__column">
            <h1>Sorted Array</h1>
            <span>Bubble Sort:</span>
            {state
              .get("sortedArray")
              .map((content, index) => <p key={(index += 1)}>{content}</p>)}
          </article>
        </section>
      </main>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
