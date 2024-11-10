import './App.scss';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'

const AppLayout = lazy(() => import("./components/AppLayout"));
import ErrorPage from './components/PageNotFound';
const Home = lazy(() => import("./pages/home/Home"));
const MenuLayout = lazy(() => import("./components/MenuLayout"));
const PizzaMenu = lazy(() => import("./pages/menu/PizzaMenu"));
const SearchResults = lazy(() => import("./pages/search/SearchResults"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Order = lazy(() => import("./pages/order/Order"));
const NewOrder = lazy(() => import("./pages/newOrder/NewOrder"));
const OrderHistory = lazy(() => import("./pages/orderHistory/OrderHistory"));
import IntroSpinner from './components/IntroSpinner';

import { loadPizzaMenu as loader } from "./pages/menu/PizzaMenu";
import { store } from "./redux/store";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: "home",
          element: <Home />
        },
        {
          path: "/menu",
          element: <MenuLayout />,
          children: [
            {
              index: true,
              // path: "menu",
              element: <PizzaMenu />,
              loader: loader
            },
            {
              path: "search",
              element: <SearchResults />
            }
          ]
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "order",
          element: <Order />
        },
        {
          path: "newOrder/:orderId",
          element: <NewOrder />
        },
        {
          path: "history",
          element: <OrderHistory />,
        }
      ],
    }
  ])

  return (
    <Suspense fallback={<IntroSpinner />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  )
}