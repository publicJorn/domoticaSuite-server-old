import React, { Component } from 'react';

export default class AddSensorForm extends Component {
  static propTypes = {
    saveSensor: React.PropTypes.func
  }

  handleAddSensor (evt) {
    evt.preventDefault();

    this.props.saveSensor({
      name: this.refs.name.value
    });

    this.refs.name.value = '';
  }

  render () {
    return (
      <form onSubmit={this.handleAddSensor.bind(this)}>
        Name: <input ref="name" type="number" />
        <button type="submit">Add sensor</button>
      </form>
    );
  }
}
