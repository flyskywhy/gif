import React, { Component } from 'react';
import MainLayout from './MainLayout';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      imageUrls: [],
      previousSearchRequest: undefined
    };
  };

  receiveNewQuery(event) {
    var query = event.target.value;
    this.setState({ query: query });
    this.imageUrlsForQuery(query)
      .then(this.setImageUrls.bind(this))
  };

  imageUrlsForQuery(query) {
    this.abortPreviousSearchRequest();
    var url = ["http://api.giphy.com/v1/gifs/search?q=",
               query,
               "&api_key=dc6zaTOxFJmzC", // public beta key
               "&limit=5"].join("");

    var searchRequest = this.previousSearchRequest = $.get(url);
    return searchRequest
      .then(this.parseImageUrlsFromResponse.bind(this));
  };

  abortPreviousSearchRequest() {
    if (this.previousSearchRequest) {
      this.previousSearchRequest.abort();
    }
  };

  setImageUrls(imageUrls) {
    this.setState({ imageUrls: imageUrls });
  };

  parseImageUrlsFromResponse(result) {
    return result.data.map(function(gifData) {
      return gifData.images.fixed_width.url;
    });
  };

  render() {
    return (
      <div className="App">
        <MainLayout
            query={this.state.query}
            onQueryChange={this.receiveNewQuery.bind(this)}
            imageUrls={this.state.imageUrls} />
      </div>
    );
  }
}

export default App;
