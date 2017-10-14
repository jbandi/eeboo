import { connect } from 'react-redux';
import Home from '../components/Home';
import { fetchCompany } from '../state/actions/company';

const mapStateToProps = state => ({
  company: state.company,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(fetchCompany());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
