import React from 'react';
import db from '../db';
import firebase from 'firebase';

export default class BusList extends React.Component {
  handleBusNumberChange = (e) => {
    this.props.handleBusNumberChange(e.target.value);
  }

  render() {
    return (
      <div>
        <p>Bus</p>
        <input
          type={'text'}
          id={'bus-number'}
          name={'bus-number'}
          value={this.props.busNumber}
          required={true}
          onChange={this.handleBusNumberChange}
        >
        </input>
      </div>
    )
  }
}