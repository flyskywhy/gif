import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div className="SearchBox">
        <input type="text"
               onChange={this.props.onQueryChange}
               value={this.props.query}
               autoFocus={true} />
      </div>
    );
  }
}

export default SearchBox;
