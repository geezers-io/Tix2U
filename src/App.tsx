import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import EntirePage from './pages/entire/page';
import Layout from '@/components/layouts/PageLayout';
import DetailPage from '@/pages/detail/[id]/page';
import FindIDPage from '@/pages/login/find/page';
import LoginPage from '@/pages/login/page';
import IndexPage from '@/pages/page';
import theme from '@/styles/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'detail',
        element: <DetailPage />,
      },
      {
        path: 'login',
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
          {
            path: 'find',
            element: <FindIDPage />,
          },
        ],
      },
      {
        path: 'entire',
        element: <EntirePage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
