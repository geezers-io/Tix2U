import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import IndexPage from './pages/page';
import DetailPage from './pages/Detail/page';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'detail',
        element: <DetailPage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
