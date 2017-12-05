import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FeedbackerList = props => (
  <div>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Mail</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {props.feedbackers.map(f => (
          <tr key={f.id}>
            <td>{f.id}</td>
            <td>{f.mail}</td>
            <td className="detail-link">
              <Link to="#" onClick={() => props.deleteFeedbacker(f.id)}>Delete</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

FeedbackerList.propTypes = {
  feedbackers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FeedbackerList;
