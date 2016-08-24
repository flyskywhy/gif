import React, { Component } from 'react';
import SearchResult from './SearchResult';
import PlaceholderSearchResult from './PlaceholderSearchResult';
import $ from 'jquery';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderedUrls: [],
      unrenderedUrls: [],
      imagePreloadRequests: []
    };
  };

  componentWillReceiveProps(nextProps) {
    this.abortExistingImagePreloadRequests();
    var imagePreloadRequests = this.preloadImages(nextProps.imageUrls);
    this.setState({
      unrenderedUrls: nextProps.imageUrls,
      renderedUrls: [],
      imagePreloadRequests: imagePreloadRequests
    });
  };

  abortExistingImagePreloadRequests() {
    this.state.imagePreloadRequests.forEach((xhr) => {
      xhr.abort();
    });
  };

  isUrlPartOfCurrentResultsAndUnrendered(imageUrl) {
    return this.state.unrenderedUrls.indexOf(imageUrl) !== -1;
  };

  moveUrlFromUnrenderedToRendered(imageUrl) {
    var unrenderedUrls = this.state.unrenderedUrls;
    var renderedUrls = this.state.renderedUrls;
    unrenderedUrls.splice(this.state.unrenderedUrls.indexOf(imageUrl), 1);
    renderedUrls.push(imageUrl);

    this.setState({
      unrenderedUrls: unrenderedUrls,
      renderedUrls: renderedUrls
    });
  };

  preloadImages(imageUrls) {
    return imageUrls.map(this.preloadImage.bind(this));
  };

  preloadImage(imageUrl) {
    return $.get(imageUrl, () => {
      if (this.isUrlPartOfCurrentResultsAndUnrendered(imageUrl)) {
        this.moveUrlFromUnrenderedToRendered(imageUrl);
      }
    });
  };

  placeholderResultCount() {
    return 5 - this.state.renderedUrls.length;
  };

  searchResultList() {
    var completedResults = this
      .state.renderedUrls
      .map((url) => {
        return (<SearchResult key={url} url={url} />);
      });

    var placeholderResults = Array
      .apply(0, Array(this.placeholderResultCount()))
      .map((_, i) => {
        return (<PlaceholderSearchResult key={i} />);
      });

    return completedResults.concat(placeholderResults);
  };

  render() {
    return (
      <div className="SearchResults">
        {this.searchResultList()}
      </div>
    );
  }
}

export default SearchResults;
