import React, { Component } from 'react';

class SearchResult extends Component {
  render() {
    return (
      <div className="SearchResult">
        {<img alt="gif"
              src={this.props.url} />}
      </div>
    );
  }
}

export default SearchResult;
