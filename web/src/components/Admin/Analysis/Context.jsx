import React from 'react';
import PropTypes from 'prop-types';
import RC2 from 'react-chartjs2';

import jsPDF from 'jspdf';

const options = {
  responsive: true,
  maintainAspectRatio: false,
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

class Context extends React.Component {
  generatePDF = () => {
    console.log('exporting pdf');
    this.myChart = this.bar.getChart();
    const doc = new jsPDF(); // eslint-disable-line
    doc.text('Bar chart example', 10, 10);
    doc.addImage(this.myChart.toBase64Image(), 'JPEG', 15, 40, 130, 100);
    doc.save('chart.pdf');
  }

  render() {
    return (
      <tr>
        <td>{this.props.context.contents[0].content}</td>
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

Context.propTypes = {
  context: PropTypes.shape({
    contents: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string.isRequired,
    })),
  }).isRequired,
  barData: PropTypes.shape({}).isRequired,
};

export default Context;
