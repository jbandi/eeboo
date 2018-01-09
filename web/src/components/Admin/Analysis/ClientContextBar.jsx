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
  // pass this as reference to the parent
  // so that the parent gets a reference to the chart ref for this component
  componentDidMount() {
    this.props.onRef(this);
  }

  shouldComponentUpdate = nextProps => (
    (this.props.tab === 1 && this.props.tab !== nextProps.tab)
  )

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.context.contents[0].content}
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

ClientContextBar.propTypes = {
  context: PropTypes.shape({
    contents: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string.isRequired,
    })),
  }).isRequired,
  barData: PropTypes.shape({}).isRequired,
  onRef: PropTypes.func.isRequired,
  tab: PropTypes.number.isRequired,
};

export default ClientContextBar;
