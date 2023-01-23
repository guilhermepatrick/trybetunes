import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AlbumCard.css';

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
          params={ collectionId }
        >
          Details
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {}.isRequired;
