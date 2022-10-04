import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
      artistName: '',
      prevArtist: '',
      loading: false,
      requestAlbuns: [],
      showAlbuns: false,
    };
  }

  validateButton = () => {
    const { artistName } = this.state;
    const minLength = 2;
    if (artistName.length >= minLength) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  };

  handleClick = async () => {
    const { artistName } = this.state;
    this.setState({ loading: true });
    const requestReturn = await searchAlbumsAPI(artistName);
    this.setState(
      {
        loading: false,
        showAlbuns: true,
        requestAlbuns: requestReturn,
        prevArtist: artistName,
        artistName: '',
      },
      this.validateButton,
    );
  };

  render() {
    const {
      isDisable,
      artistName,
      loading,
      showAlbuns,
      prevArtist,
      requestAlbuns,
    } = this.state;
    return (
      <div className="content" data-testid="page-search">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <section>
            <label htmlFor="artistName">
              <input
                data-testid="search-artist-input"
                type="text"
                name="artistName"
                id="artistName"
                placeholder="Nome do Artista"
                value={ artistName }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isDisable }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </section>
        )}
        {showAlbuns && requestAlbuns.length > 0 && (
          <h2>{`Resultado de álbuns de: ${prevArtist}`}</h2>
        )}
        <div className="albuns">
          {requestAlbuns.length > 0 ? (
            requestAlbuns.map((actualAlbum) => (
              <AlbumCard
                key={ actualAlbum.collectionId }
                artistName={ actualAlbum.artistName }
                src={ actualAlbum.artworkUrl100 }
                alt={ actualAlbum.collectionName }
                collectionName={ actualAlbum.collectionName }
                collectionId={ actualAlbum.collectionId }
              />
            ))
          ) : (
            <h2>Nenhum álbum foi encontrado</h2>
          )}
        </div>
      </div>
    );
  }
}
