import React, { Component } from 'react';
// import { addSong } from './services/musicsAPI.js';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, handleFavorite, isChecked } = this.props;
    return (
      <div className="musicCard">
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor="favoriteSong"
        >
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favoriteSong"
            id={ trackId }
            onChange={ handleFavorite }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {}.isRequired;
