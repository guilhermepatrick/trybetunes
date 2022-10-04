import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
// import addMusic from '../services/getMusics';
import Loading from '../components/Loading';
import '../styles/Album.css';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      artworkUrl100: '',
      musics: [],
      loading: false,
      favoritesSongs: [],
    };
  }

  async componentDidMount() {
    const { favoritesSongs } = this.state;
    if (favoritesSongs.length === 0) {
      localStorage.setItem('favorite_songs', JSON.stringify(favoritesSongs));
    }

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

  handleFavorite = async ({ target }) => {
    if (target.checked) {
      console.log('Adiciona Musica');
      this.setState({ loading: true });
      const { musics } = this.state;
      const selectedID = target.id;
      const selectedMusic = musics
        .filter((music) => music.trackId === Number(selectedID));
      const objMusic = selectedMusic[0];
      await addSong(objMusic);
      this.setState((prevState) => ({
        favoritesSongs: [...prevState.favoritesSongs, objMusic],
        loading: false,
      }));
    } else {
      console.log('Remove Musica');
    }
  };

  render() {
    const { artistName, albumName, artworkUrl100, musics, loading } = this.state;
    return (
      <div className="content" data-testid="page-album">
        <Header />
        {loading && <Loading /> }
        <div style={ loading ? { display: 'none' } : { display: 'block' } }>
          <h2 data-testid="album-name">{albumName}</h2>
          <img src={ artworkUrl100 } alt={ albumName } />
          <h3 data-testid="artist-name">{artistName}</h3>
          {musics.map((actualMusic) => (
            <MusicCard
              trackId={ actualMusic.trackId }
              key={ actualMusic.trackId }
              trackName={ actualMusic.trackName }
              previewUrl={ actualMusic.previewUrl }
              handleFavorite={ this.handleFavorite }
            />
          ))}
        </div>
      </div>
    );
  }
}
Album.propTypes = {}.isRequired;
