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

function NoAnimationExample({isZoomed}) {
  const left = isZoomed ? 1: 1;
  const right = isZoomed ? 2: 3;
  return (
    <XYPlot
      animation={false}
      width={300}
      height={300}
      xDomain={[left, right]}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <MarkSeries
        data={[
          {x: 1, y: 10},
          {x: 2, y: 5},
          {x: 3, y: 15}
        ]}/>
    </XYPlot>
  );
}

function ReactVisAnimationExample({isZoomed}) {
  const left = isZoomed ? 1: 1;
  const right = isZoomed ? 2: 3;
  return (
    <XYPlot
      animation={{duration: 400}}
      width={300}
      height={300}
      xDomain={[left, right]}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <MarkSeries
        data={[
          {x: 1, y: 10},
          {x: 2, y: 5},
          {x: 3, y: 15}
        ]}/>
    </XYPlot>
  );
}

function ReactMotionAnimationExample({isZoomed}) {
  return (
    <Motion style={{
      left: spring(isZoomed ? 1 : 1),
      right: spring(isZoomed ? 2 : 3)
    }}>
    {
      ({left, right}) =>
      <XYPlot
        animation={false}
        width={300}
        height={300}
        xDomain={[left, right]}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <MarkSeries
          data={[
            {x: 1, y: 10},
            {x: 2, y: 5},
            {x: 3, y: 15}
          ]}/>
      </XYPlot>
    }
    </Motion>
  );
}

const optionToComponent = {
  'No Animation': NoAnimationExample,
  'react-vis Animation': ReactVisAnimationExample,
  'react-motion Animation': ReactMotionAnimationExample
};

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'react-motion Animation'
    };
    this._onChange = this._onChange.bind(this);
    this._zoom = this._zoom.bind(this);
  }

  _onChange({target: {value: selectedOption}}) {
    this.setState({selectedOption});
  }

  _zoom() {
    this.setState({zoomed: !this.state.zoomed});
  }

  render() {
    const {selectedOption, zoomed} = this.state;
    const Component = optionToComponent[selectedOption];
    return (
      <div>
        <select onChange={this._onChange} value={selectedOption}>
          {Object.keys(optionToComponent)
            .map(k => <option key={k} value={k}>{k}</option>)}
        </select>

        <button onClick={this._zoom}>Zoom</button>
        <Component isZoomed={zoomed} />
      </div>
    );
  }
}