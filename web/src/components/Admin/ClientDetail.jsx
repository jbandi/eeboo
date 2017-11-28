import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import FeedbackerRow from '../../containers/Admin/FeedbackerRow';

const ClientDetail = props => (
  <div>
    <h2>Feedbacknehmer: {props.client.firstname} {props.client.name}</h2>
    <Table striped bordered condensed hover>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{props.client.name}</td>
        </tr>
        <tr>
          <td>Vorname</td>
          <td>{props.client.firstname}</td>
        </tr>
        <tr>
          <td>Geschlecht</td>
          <td>{props.client.gender}</td>
        </tr>
        <tr>
          <td>Mail</td>
          <td>{props.client.mail}</td>
        </tr>
      </tbody>
    </Table>
    <h3>Feedbackgeberliste</h3>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Mail</th>
          <th>Rolle</th>
        </tr>
      </thead>
      <tbody>
        {props.feedbackerList.map(f => (
          <FeedbackerRow key={f.id} feedbacker={f} clientId={props.client.id} />
        ))}
      </tbody>
    </Table>
  </div>
);

ClientDetail.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string,
    firstname: PropTypes.string,
    name: PropTypes.string,
    mail: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
  feedbackerList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ClientDetail;
