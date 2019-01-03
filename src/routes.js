import SignInOrUp from './screens/SignInOrUp';
import NewProfile from './screens/NewProfile';
import Timeline from './screens/Timeline';
import Welcome from './screens/Welcome';
import NoRouteFound from './screens/NoRouteFound';


const routes = [
  // Auth
  {
    path: '/signin',
    component: SignInOrUp,
  },
  {
    path: '/signup',
    component: SignInOrUp,
  },

  // Profile
  {
    path: '/profile/new',
    component: NewProfile,
  },

  {
    path: '/',
    authenticatedComponent: Timeline,
    anonymousComponent: Welcome,
    exact: true,
  },

  {
    component: NoRouteFound,
  }
];

export default routes;