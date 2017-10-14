import { connect } from 'react-redux';
import Home from '../components/Home';
import { fetchCompany } from '../state/actions/company';
import { getContextIds } from '../state/selectors/questionaire';

const mapStateToProps = state => ({
  company: state.company,
  contextIds: getContextIds(state.questionaire),
});

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(fetchCompany());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
