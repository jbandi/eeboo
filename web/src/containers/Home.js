import { connect } from 'react-redux';
import Home from '../components/Home';
import { fetchCompany } from '../state/actions/company';
import { getUniqueContextIds } from '../state/selectors/questionaire';

const mapStateToProps = state => ({
  company: state.company,
  contextIds: getUniqueContextIds(state),
});

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(fetchCompany());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
