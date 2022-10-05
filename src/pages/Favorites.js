import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      loading: true,
      isChecked: true,
    };
  }

  componentDidMount() {
    this.pegaFavorita();
  }

  pegaFavorita = async () => {
    const arrFavoriteSongs = await getFavoriteSongs();
    this.setState({ favoritesSongs: arrFavoriteSongs,
      loading: false });
  };

  handleFavorite = async ({ target }) => {
    this.setState({ loading: true });
    const { favoritesSongs } = this.state;
    const selectedID = target.id;
    const selectedMusic = favoritesSongs
      .filter((music) => music.trackId === Number(selectedID));
    const objMusic = selectedMusic[0];
    await removeSong(objMusic);
    const arrFavoriteSongs = await getFavoriteSongs();
    this.setState({ favoritesSongs: arrFavoriteSongs,
      loading: false });
  };

  render() {
    const { loading, favoritesSongs, isChecked } = this.state;
    return (
      <div className="content" data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          <div>
            {favoritesSongs?.map((actualMusic) => (
              <MusicCard
                trackId={ actualMusic.trackId }
                key={ actualMusic.trackId }
                trackName={ actualMusic.trackName }
                previewUrl={ actualMusic.previewUrl }
                handleFavorite={ this.handleFavorite }
                isChecked={ isChecked }
              />
            ))}
          </div>) }
      </div>
    );
  }
}
