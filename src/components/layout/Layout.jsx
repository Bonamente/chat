import React from 'react';

import MainNavigation from './MainNavigation.jsx';

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="d-flex flex-column h-100">
      <MainNavigation />
      {children}
    </div>
  );
};

export default Layout;
