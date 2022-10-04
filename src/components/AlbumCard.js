import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const { artistName, artworkUrl100, collectionName, collectionId } = this.props;
    return (
      <div className="albumCard">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h3>{collectionName}</h3>
        <p>{artistName}</p>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `album/${collectionId}` }
        >
          Details

        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {}.isRequired;
