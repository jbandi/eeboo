import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const ClientList = props => (
  <div>
    <p align="right">
      <Link to="#">import</Link> |&nbsp;
      <Link to="#">export</Link> |&nbsp;
      <Link to="#">add</Link>
    </p>
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

ClientList.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ClientList;
