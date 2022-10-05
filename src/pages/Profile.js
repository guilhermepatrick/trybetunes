import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userObj = await getUser();
    this.setState({ name: userObj.name,
      email: userObj.email,
      image: userObj.image,
      description: userObj.description,
      loading: false });
  }

  render() {
    const { loading, name, email, image, description } = this.state;
    return (
      <div className="content" data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <h2>{name}</h2>
            <h3>{email}</h3>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <p>{description}</p>
            <Link
              to="profile/edit"
            >
              Editar perfil
            </Link>
          </div>
        )}
      </div>
    );
  }
}
