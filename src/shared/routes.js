import Home from './home';
import Category from './Category';
import NotFound from './404/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/category/:id',
    component: Category,
  },
  {
    component: NotFound,
  },
];

export default routes;
