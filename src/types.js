import PropTypes from 'prop-types';


export const userType = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  isAnonymous: PropTypes.bool.isRequired,
  displayName: PropTypes.string,
  email: PropTypes.string.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  metadata: PropTypes.shape({
    lastSignInTime: PropTypes.string,
    creationTime: PropTypes.string,
  }),
  photoURL: PropTypes.string,
});

export const authType = PropTypes.shape({
  user: userType,
  authStateKnown: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
});

export const profileType = PropTypes.shape({
  displayName: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  createdAt: PropTypes.object.isRequired,
});

export const tweetType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string),
  profile: profileType.isRequired,
  timestamp: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
});