import React from 'react';
import PropTypes from 'prop-types';

import ProcessDataShow from './ProcessDataShow';
import ProcessDataEdit from './ProcessDataEdit';

const ProcessData = props => (
  (props.location.query && JSON.parse(props.location.query).mode === 'edit')
    ? <ProcessDataEdit {...props} />
    : <ProcessDataShow {...props} />
);

ProcessData.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.string,
  }).isRequired,
};

export default ProcessData;
