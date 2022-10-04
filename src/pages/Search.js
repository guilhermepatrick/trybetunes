import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/Search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
      artistName: '',
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
    console.log('Batata');
  };

  render() {
    const { isDisable, artistname } = this.state;
    return (
      <div className="content" data-testid="page-search">
        <Header />
        <section>
          <label htmlFor="artistName">
            <input
              data-testid="search-artist-input"
              type="text"
              name="artistName"
              id="artistName"
              placeholder="Nome do Artista"
              value={ artistname }
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
      </div>
    );
  }
}
