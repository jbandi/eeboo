import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

class ClientList extends React.Component {
  static propTypes = {
    clients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    procId: PropTypes.string.isRequired,
    deleteClient: PropTypes.func.isRequired,
  };

  focusTextInput = (e) => {
    e.preventDefault();
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
          <Link to="#" onClick={this.focusTextInput}>import</Link>
        </div>
        <Table responsive striped hover bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Firstname</th>
              <th>Mail</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.firstname}</td>
                <td>{client.mail}</td>
                <td className="detail-link">
                  <Link to="#">Edit</Link> |&nbsp;
                  <Link to="#" onClick={() => this.props.deleteClient(this.props.procId, client.id)}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ClientList;
