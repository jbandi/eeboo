import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class FeedbackerList extends Component {
  static propTypes = {
    feedbackers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    deleteFeedbacker: PropTypes.func.isRequired,
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
        <p align="right">
          <Link to="#">import</Link> |&nbsp;
          <Link to="#">export</Link> |&nbsp;
          <Link to="#">add</Link>
        </p>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Mail</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.feedbackers.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.mail}</td>
                <td className="detail-link">
                  <Link to="#">Edit</Link> |&nbsp;
                  <Link to="#" onClick={() => this.props.deleteFeedbacker(f.id)}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default FeedbackerList;
