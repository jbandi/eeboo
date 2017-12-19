import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeedbackerRow from '../../containers/Admin/FeedbackerRow';

class ClientDetail extends React.Component {
  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.string,
      firstname: PropTypes.string,
      name: PropTypes.string,
      mail: PropTypes.string,
      gender: PropTypes.string,
    }).isRequired,
    feedbackerList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    procId: PropTypes.string.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    saveFeedbackers: PropTypes.func.isRequired,
  };

  focusTextInput = (e) => {
    e.preventDefault();
    this.input.click();
  }

  render() {
    return (
      <div>
        <h2>Feedbacknehmer: {this.props.client.firstname} {this.props.client.name}</h2>
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{this.props.client.name}</td>
            </tr>
            <tr>
              <td>Vorname</td>
              <td>{this.props.client.firstname}</td>
            </tr>
            <tr>
              <td>Geschlecht</td>
              <td>{this.props.client.gender}</td>
            </tr>
            <tr>
              <td>Mail</td>
              <td>{this.props.client.mail}</td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <h3>Feedbackgeberliste</h3>
        <div align="right">
          <input
            style={{ display: 'none' }}
            id="import"
            type="file"
            accept=".csv"
            ref={(ref) => { this.input = ref; }}
            onChange={d => this.props.handleFileUpload(d, this.props.procId, this.props.client.id)}
          />
          <Link to="#" onClick={this.focusTextInput}>import</Link>
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mail</th>
              <th>Geschlecht</th>
              <th>Rolle</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.feedbackerList.map(f => (
              <FeedbackerRow key={f.id} feedbacker={f} clientId={this.props.client.id} />
            ))}
          </tbody>
        </Table>
        <div style={{ textAlign: 'right' }}>
          <Button bsStyle="default" onClick={() => this.props.saveFeedbackers(this.props.feedbackerList)}>Save</Button>
        </div>
      </div>
    );
  }
}

export default ClientDetail;
