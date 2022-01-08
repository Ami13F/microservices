import React from 'react';

const BooksPage = React.lazy(() => import('./App'));

const routes = [
  {
    path: '/books',
    component: BooksPage,
    exact: true,
  },
];

export default routes;