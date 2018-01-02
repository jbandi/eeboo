import React from 'react';
import PropTypes from 'prop-types';

const Badge = (props) => {
  if (props.done === props.total) {
    return <div style={{ color: '#5cb85c' }} className="glyphicon glyphicon-ok" />;
  }
  if (props.done > props.total / 2) {
    return <div style={{ background: '#f0ad4e' }} className="badge">{props.done}/{props.total} </div>;
  }
  return <div style={{ background: '#d9534f' }} className="badge">{props.done}/{props.total} </div>;
};

Badge.propTypes = {
  done: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};


export default Badge;
