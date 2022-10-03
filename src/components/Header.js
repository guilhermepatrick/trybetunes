import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
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
        <h1>Meu Header</h1>
        {loading ? <Loading /> : <h2 data-testid="header-user-name">{username}</h2> }
      </header>
    );
  }
}
