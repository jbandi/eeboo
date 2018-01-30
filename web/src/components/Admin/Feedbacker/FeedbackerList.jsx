import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import FeedbackerRow from './../../../containers/Admin/Feedbacker/FeedbackerRow';

const FeedbackerList = props => (
  <div>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Mail</th>
          <th>Feedback-<br />nehmer</th>
          <th>Antworten</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {props.feedbackers.map(f => (
          <FeedbackerRow key={f.id} feedbacker={f} {...props} />
        ))}
      </tbody>
    </Table>
  </div>
);

FeedbackerList.propTypes = {
  feedbackers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FeedbackerList;
