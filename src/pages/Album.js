import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
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
    this.setState({ loading: true });
    const arrFavoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false,
      favoritesSongs: arrFavoriteSongs });
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
    const { musics, favoritesSongs } = this.state;
    const selectedID = target.id;
    const selectedMusic = musics
      .filter((music) => music.trackId === Number(selectedID));
    const objMusic = selectedMusic[0];
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(objMusic);
      this.setState((prevState) => ({
        favoritesSongs: [...prevState.favoritesSongs, objMusic],
        loading: false,
      }));
    } else {
      this.setState({ loading: true });
      await removeSong(objMusic);
      this.setState({ loading: false,
        favoritesSongs: favoritesSongs
          .filter((element) => element.trackId !== objMusic.trackId),
      });
    }
  };

  render() {
    const { artistName, albumName, artworkUrl100,
      musics, loading, favoritesSongs } = this.state;
    return (
      <div className="content" data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div>
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
                isChecked={ favoritesSongs
                  .some((music) => music.trackId === actualMusic.trackId) }
              />
            ))}
          </div>) }
      </div>
    );
  }
}
Album.propTypes = {}.isRequired;
