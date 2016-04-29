import React from 'react';
import {Motion, spring} from 'react-motion'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  Hint} from 'react-vis';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this._rememberValue = this._rememberValue.bind(this);
    this._forgetValue = this._forgetValue.bind(this);
    this._zoom = this._zoom.bind(this);
  }

  _zoom() {
    this.setState({zoomed: !this.state.zoomed});
  }

  _rememberValue(value) {
    this.setState({value});
  }

  _forgetValue() {
    this.setState({
      value: null
    });
  }

  render() {
    const {value, zoomed} = this.state;
    return (
      <div>
        <button onClick={this._zoom}>Zoom</button>
        <Motion style={{
          left: spring(zoomed ? 1 : 1),
          right: spring(zoomed ? 2 : 3)
        }}>
        {
          ({left, right}) =>
          <XYPlot
            width={300}
            height={300}
            xDomain={[left, right]}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <MarkSeries
              onValueMouseOver={this._rememberValue}
              onValueMouseOut={this._forgetValue}
              data={[
                {x: 1, y: 10},
                {x: 2, y: 5},
                {x: 3, y: 15}
              ]}/>
            {value ?
              <Hint value={value}/> :
              null
            }
          </XYPlot>
        }
        </Motion>
      </div>
    );
  }
}