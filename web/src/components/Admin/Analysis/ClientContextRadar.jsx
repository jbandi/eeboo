import React from 'react';
import PropTypes from 'prop-types';
import RC2 from 'react-chartjs2';

const options = {
  responsive: true,
  maintainAspectRatio: true,
  scale: {
    ticks: {
      beginAtZero: true,
      max: 5,
    },
  },
};

class ClientContextRadar extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <RC2
            id="rc2"
            ref={(ref) => { this.bar = ref; }}
            data={this.props.barData}
            type="radar"
            options={options}
          />
        </td>
      </tr>
    );
  }
}

ClientContextRadar.propTypes = {
  barData: PropTypes.shape({}).isRequired,
};

export default ClientContextRadar;
