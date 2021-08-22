import { connect } from 'react-redux';
import Avatar from './Avatar';

const mapStateToProps = (state) => ({
  userName: state.loginReducer.userName,
  gravatarImage: state.loginReducer.gravatarImage,
});

const UserAvatar = connect(mapStateToProps)(Avatar);

export default UserAvatar;
