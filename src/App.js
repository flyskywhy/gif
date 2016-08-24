import React, { Component } from 'react';
import MainLayout from './MainLayout';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      imageUrls: [],
      nextSearchId: 0,
      mostRecentlyDisplayedSearchId: undefined
    };
  };

  onQueryChange(event) {
    var query = event.target.value;
    this.searchIfQueryValid(query);
    this.setState({ query: query });
  };

  searchIfQueryValid(query) {
    if (query.length > 0) {
      var url = ["http://api.giphy.com/v1/gifs/search?q=",
                 query,
                 "&api_key=dc6zaTOxFJmzC",
                 "&limit=5"].join("");
      this.search(url);
    } else {
      this.setImageUrls([]);
    }
  };

  search(url) {
    var searchId = this.getNextSearchId();
    $.get(url).then((result) => {
      if (this.isLatestSearchToComplete(searchId)) {
        this.setImageUrls(this.parseImageUrlsFromResponse(result));
        this.setState({ mostRecentlyDisplayedSearchId: searchId });
      }
    });
  };

  getNextSearchId() {
    var searchId = this.state.nextSearchId;
    this.setState({ nextSearchId: searchId + 1 });
    return searchId;
  };

  isLatestSearchToComplete(searchId) {
    return this.state.mostRecentlyDisplayedSearchId === undefined ||
           searchId > this.state.mostRecentlyDisplayedSearchId;
  };

  setImageUrls(imageUrls) {
    this.setState({ imageUrls: imageUrls });
  };

  parseImageUrlsFromResponse(result) {
    return result.data.map(function(gifData) {
      return gifData.images.fixed_width.url;
      /* return gifData.images.downsized_still.url;*/
    });
  };

  render() {
    return (
      <div className="App">
        <MainLayout
            query={this.state.query}
            onQueryChange={this.onQueryChange.bind(this)}
            imageUrls={this.state.imageUrls} />
      </div>
    );
  }
}

export default App;
