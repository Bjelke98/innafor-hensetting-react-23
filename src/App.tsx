import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./pages/Root";
import ErrorView from "./pages/ErrorView";
import Home from "./pages/Home";
import LocationsOverview from "./pages/Locations/LocationsOverview";
import LocationView from "./pages/Locations/LocationView";
import ReservationsOverview from "./pages/Reservations/ReservationsOverview";
import SpacesOverview from "./pages/Spaces/SpacesOverview";
import SpaceView from "./pages/Spaces/SpaceView";
import ReservationView from "./pages/Reservations/ReservationView";
import ReservationCreation from "./pages/Reservations/ReservationCreation";

// Auth Kit
import { AuthProvider } from 'react-auth-kit'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Avoid automatic retries on failed requests as they may cause
      // confusion for people without react-query experience
      retry: false,
      // Set default stale time to 20 seconds to avoid some common issues
      // when new to react query (too many fetches due to component remounts)
      staleTime: 1000 * 20,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "locations",
        element: <LocationsOverview />,
      },
      {
        path: "locations/:id",
        element: <LocationView />,
      },
      {
        path: "spaces",
        element: <SpacesOverview />,
      },
      {
        path: "spaces/:spaceId",
        element: <SpaceView />,
        children: [
          {
            path: "reservations",
            element: <ReservationsOverview />,
          },
        ],
      },
      {
        path: "reservations",
        element: <ReservationsOverview />,
      },
      {
        path: "reservations/create",
        element: <ReservationCreation />,
      },
      {
        path: "reservations/:id",
        element: <ReservationView />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}> */}
      <AuthProvider authType = {'cookie'}
                authName={'_auth'}
                cookieDomain={window.location.hostname}
                cookieSecure={false}>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}
