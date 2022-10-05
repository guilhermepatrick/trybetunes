import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      isDisable: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userObj = await getUser();
    this.setState({
      name: userObj.name,
      email: userObj.email,
      image: userObj.image,
      description: userObj.description,
      loading: false,
    });
  }

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
    await updateUser(updateObj);
    this.setState({ loading: false }, () => history.push('/profile'));
  };

  validateButton = () => {
    const { name, email, image, description } = this.state;
    const arrInputsTexts = [name, email, image, description];
    if (
      arrInputsTexts.every(
        (element) => element.length > 0 && this.validateEmail(email),
      )
    ) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  };

  validateEmail(email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
  }

  render() {
    const { loading, name, email, image, description, isDisable } = this.state;
    return (
      <div className="content" data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <section>
            <h2>Editar Perfil</h2>
            <label htmlFor="name">
              Nome:
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                id="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              E-mail:
              <input
                data-testid="edit-input-email"
                type="email"
                name="email"
                id="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Sobre Mim:
              <textarea
                data-testid="edit-input-description"
                type="text"
                name="description"
                id="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="image">
              Img URL:
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                id="image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isDisable }
              onClick={ this.handleClick }
            >
              Salvar
            </button>
          </section>
        )}
      </div>
    );
  }
}
ProfileEdit.propTypes = {}.isRequired;
