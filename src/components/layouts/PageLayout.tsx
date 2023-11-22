import { Outlet } from 'react-router-dom';
import PageAside from './PageAside';
import PageHeader from './PageHeader';

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
