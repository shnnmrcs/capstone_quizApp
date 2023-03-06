import { connect } from 'react-redux';
import Errors from './errors';

const mapStateToProps = ({ errors }) => ({
  errors,
});

const mapDispatchToProps = dispatch => ({
  updateError: (values) =>
    dispatch({
      type: 'UPDATE_ERROR',
      payload: values,
      meta: {
        loadingId: -1
      }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
