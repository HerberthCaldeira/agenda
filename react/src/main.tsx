import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ErrorPage from "./pages/Error";
import Login from "./pages/login/Login";
import Dashboard from "./pages/authenticated/dashboard/Dashboard";
import CreateUser from "./pages/user/Index";
import Agenda from "./pages/authenticated/agenda/Index"
import CreateAgenda from "./pages/authenticated/agenda/form/Index"
import ShareAgenda from "./pages/authenticated/agenda/share/Index"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";

const Fallback = () => {
  const error = useRouteError();
  console.log("Fallback", error);

  return (
    <div>
      <p>React router Error Boundary</p>
    </div>
  );
};

//TODO: move routes to a another file
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
    {
      path: "/create/user",
      element: <CreateUser />,
    },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <Fallback />,
    children: [
        {
            path:"agenda",
            element: <Agenda />
        },
        {
            path:"agenda/new",
            element: <CreateAgenda />
        },
        {
            path:"agenda/:agendaId/share",
            element: <ShareAgenda />
        }
    ],
  },
]);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
    mutations: {
      onError: (err) => {
        console.log("global react query", err);
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
