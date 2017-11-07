import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Client = props => (
  <div>
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
        {props.clients.map(client => (
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

Client.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Client;
