import React from 'react';
import PropTypes from 'prop-types';
import RC2 from 'react-chartjs2';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      ticks: {
        beginAtZero: true,
        max: 5,
      },
    }],
    yAxes: [{
      categoryPercentage: 0.8,
    }],
  },
};

class ClientContextBar extends React.Component {
  static propTypes = {
    barData: PropTypes.shape({}).isRequired,
    onRef: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.label}
        </td>
        <td>
          <RC2
            id="rc2"
            ref={(ref) => { this.bar = ref; }}
            data={this.props.barData}
            type="horizontalBar"
            options={options}
          />
        </td>
      </tr>
    );
  }
}

export default ClientContextBar;
