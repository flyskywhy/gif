import React, { Component } from 'react';
import './MainLayout.css';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

class MainLayout extends Component {
  render() {
    return (
      <div className="MainLayout">
        <h1>Instant GIF search</h1>

        <SearchBox
            query={this.props.query}
            onQueryChange={this.props.onQueryChange} />

        <SearchResults imageUrls={this.props.imageUrls} />


        <div className="giphy-attribution">
          <a href="http://giphy.com">
            <img alt="Powered by giphy"
                 className="giphy-logo"
                 src="images/Poweredby_640px-White_HorizText.png"
                 width="100px"/>
          </a>
        </div>
      </div>
    );
  }
}

export default MainLayout;
