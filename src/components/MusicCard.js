import React, { Component } from 'react';
// import { addSong } from './services/musicsAPI.js';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
    };
  }

  handleChange = () => {
    const { isChecked } = this.state;
    if (isChecked) {
      this.setState({ isChecked: false });
    } else {
      console.log('MARCOU');
      this.setState({ isChecked: true });
    }
  };

  render() {
    const { isChecked } = this.state;
    const { trackName, previewUrl, trackId, handleFavorite } = this.props;
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
            onChange={ this.handleChange }
            onClick={ handleFavorite }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {}.isRequired;
