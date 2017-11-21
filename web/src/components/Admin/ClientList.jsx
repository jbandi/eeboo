import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

class ClientList extends React.Component {
  focusTextInput = (e) => {
    e.preventDefault();
    // Explicitly focus the text input using the raw DOM API
    this.input.click();
  }


  render() {
    return (
      <div>
        <div align="right">
          <input
            style={{ display: 'none' }}
            id="import"
            type="file"
            accept=".csv"
            ref={(ref) => { this.input = ref; }}
            onChange={d => this.props.handleFileUpload(d, this.props.procId)}
          />
          <a href="#" id="upload_link" onClick={this.focusTextInput}>import</a>
        </div>
        <Table responsive striped hover bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Mail</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.mail}</td>
                <td className="detail-link">
                  <Link to="#">Edit</Link> |&nbsp;
                  <Link to="#">Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

ClientList.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleFileUpload: PropTypes.func.isRequired,
  procId: PropTypes.string.isRequired,
};

export default ClientList;
