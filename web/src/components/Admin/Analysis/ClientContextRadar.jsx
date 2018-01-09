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
          <RC2
            id="rc2"
            ref={(ref) => { this.radar = ref; }}
            data={this.props.radarData}
            type="radar"
            options={options}
          />
        </td>
      </tr>
    );
  }
}

ClientContextRadar.propTypes = {
  radarData: PropTypes.shape({}).isRequired,
  onRef: PropTypes.func.isRequired,
};

export default ClientContextRadar;
