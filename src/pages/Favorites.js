import React, { Component } from 'react';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <h1>Favorites Page</h1>
        <Header />
      </div>
    );
  }
}
