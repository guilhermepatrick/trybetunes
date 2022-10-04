import React, { Component } from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';
import logo from '../styles/logo.png';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
      username: '',
      loading: false,
    };
  }

  validateButton = () => {
    const { username } = this.state;
    const minLength = 3;
    if (username.length >= minLength) {
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
    const { history } = this.props;
    const { username } = this.state;
    this.setState({ loading: true });
    await createUser({ name: username });
    // localStorage.setItem('favorite_songs', JSON.stringify(favoritesSongs));
    this.setState({ loading: false }, () => history.push('/search'));
  };

  render() {
    const { isDisable, username, loading } = this.state;
    // const imgSrc = 'https://cdn.icon-icons.com/icons2/1101/PNG/512/1485968501-musicsocialnetworkbrandlogo_78889.png';
    // const imgSrc = 'https://i.imgur.com/tqcAtvl.png';
    return (
      <div className="content" data-testid="page-login">
        <section>
          <label htmlFor="username">
            <input
              data-testid="login-name-input"
              type="text"
              name="username"
              id="username"
              value={ username }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </section>
        {loading ? <Loading /> : <img
          className="imgLogin"
          src={ logo }
          alt="logoGuizaoTunes"
        />}
      </div>
    );
  }
}
Login.propTypes = {}.isRequired;
