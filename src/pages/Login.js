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
      loading: false,
      name: '',
      email: 'email@test.com',
      image: 'https://cdn-icons-png.flaticon.com/512/5987/5987462.png',
      description: 'Teste Description',
    };
  }

  validateButton = () => {
    const { name } = this.state;
    const minLength = 3;
    if (name.length >= minLength) {
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
    this.setState({ loading: true });
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    const updateObj = {
      name,
      email,
      image,
      description,
    };
    await createUser(updateObj);
    this.setState({ loading: false }, () => history.push('/search'));
  };

  render() {
    const { isDisable, name, loading } = this.state;
    // const imgSrc = 'https://cdn.icon-icons.com/icons2/1101/PNG/512/1485968501-musicsocialnetworkbrandlogo_78889.png';
    // const imgSrc = 'https://i.imgur.com/tqcAtvl.png';
    return (
      <div className="content" data-testid="page-login">
        <section>
          <label htmlFor="name">
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              id="name"
              value={ name }
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
