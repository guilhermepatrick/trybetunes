import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: '',
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false,
      username: user.name,
    });
  }

  render() {
    const { username } = this.state;
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        <section className="links">
          <span>
            <Link data-testid="link-to-search" to="/search">Search</Link>
          </span>
          <span>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          </span>
          <span>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          </span>
          <span data-testid="header-user-name">
            {!loading && username }
          </span>
        </section>
        {loading && <Loading /> }
      </header>
    );
  }
}
