import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import '../styles/Album.css';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      artworkUrl100: '',
      musics: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const requestReturn = await getMusics(id);
    const arrMusics = requestReturn.filter((_element, index) => index > 0);
    this.setState({ artistName: requestReturn[0].artistName,
      albumName: requestReturn[0].collectionName,
      artworkUrl100: requestReturn[0].artworkUrl100,
      musics: arrMusics });
  }

  render() {
    const { artistName, albumName, artworkUrl100, musics } = this.state;
    return (
      <div className="content" data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{albumName}</h2>
        <img src={ artworkUrl100 } alt={ albumName } />
        <h3 data-testid="artist-name">{artistName}</h3>
        {musics.map((actualMusic) => (
          <MusicCard
            key={ actualMusic.trackId }
            trackName={ actualMusic.trackName }
            previewUrl={ actualMusic.previewUrl }
          />
        ))}
      </div>
    );
  }
}
Album.propTypes = {}.isRequired;
