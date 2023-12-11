import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/layouts/PageLayout';
import CartsPage from '@/pages/carts/page';
import ConcertPage from '@/pages/concert/page';
import DancingPage from '@/pages/dancing/page';
import DetailPage from '@/pages/detail/[id]/page';
import TicketingPage from '@/pages/detail/[id]/ticketing/page';
import TicketingResultPage from '@/pages/detail/[id]/ticketing/result/page';
import EntirePage from '@/pages/entire/page';
import FindIDPage from '@/pages/login/find/page';
import SignInPage from '@/pages/login/page';
import SignUpPage from '@/pages/login/signUp/page';
import MusicalPage from '@/pages/musical/page';
import MyPage from '@/pages/my/page';
import IndexPage from '@/pages/page';
import SearchPage from '@/pages/search/page';
import TheaterPage from '@/pages/theater/page';
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
        path: 'detail/:mt20id',
        children: [
          {
            index: true,
            element: <DetailPage />,
          },
          {
            path: 'ticketing',
            children: [
              {
                index: true,
                element: <TicketingPage />,
              },
              {
                path: 'result',
                element: <TicketingResultPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'login',
        children: [
          {
            index: true,
            element: <SignInPage />,
          },
          {
            path: 'find',
            element: <FindIDPage />,
          },
        ],
      },

      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'my',
        element: <MyPage />,
      },
      {
        path: 'cart',
        element: <CartsPage />,
      },
      {
        path: 'concert',
        element: <ConcertPage />,
      },
      {
        path: 'entire',
        element: <EntirePage />,
      },
      {
        path: 'signUp',
        element: <SignUpPage />,
      },
      {
        path: 'musical',
        element: <MusicalPage />,
      },
      {
        path: 'dancing',
        element: <DancingPage />,
      },
      {
        path: 'theater',
        element: <TheaterPage />,
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
