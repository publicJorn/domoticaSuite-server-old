import React, { Component } from 'react';
import './arduino.css';

export default class Arduino extends Component {
  static propTypes = {
    sensor: React.PropTypes.object,
    saveSensor: React.PropTypes.func.isRequired
  };

  render() {
    const {arduinoId, name, status} = this.props.sensor;

    return (
      <table className="arduino">
        <tbody>
          <tr>
            <td>Sensor id</td>
            <td>{arduinoId}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td><input name="name" value={name} onChange={this.props.saveSensor} /></td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{status}</td>
          </tr>
          {/*
          <tr>
            <td>Notes</td>
            <td>...</td>
          </tr>
          <tr>
            <td colSpan="2">
              <button>Trigger alert (TODO)</button>
            </td>
          </tr>
          */}
        </tbody>
      </table>
    );
  }
}
