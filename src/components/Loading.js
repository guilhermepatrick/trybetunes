import React, { Component } from 'react';
import '../styles/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="loading-spinner" />
        <p>Carregando...</p>
      </div>
    );
  }
}
