import React from 'react';
import PropTypes from 'prop-types';

const Badge = props => (
  (props.done === props.total)
    ? <div style={{ color: '#5cb85c' }} className="glyphicon glyphicon-ok" />
    : <div style={{ background: '#d9534f' }} className="badge">{props.done}/{props.total} </div>
);

Badge.propTypes = {
  done: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};


export default Badge;
