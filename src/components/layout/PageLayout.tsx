import PageHeader from './PageHeader';
import PageAside from './PageAside';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <PageHeader />

      <main>
        <Outlet />
      </main>

      <PageAside />
    </>
  );
};

export default Layout;
