import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Today from "./page/Today";
import Tomorrow from "./page/Tomorrow";
import RootLayout from "./page/root";
import ErrorPage from "./page/ErrorPage";
import Yesterday from "./page/Yesterday";
import NextDays from "./page/NextDays";
import LoadingPage from "./page/LoadingPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoadingPage /> },
      {
        element: <RootLayout />,

        children: [
          { path: "today", element: <Today /> },
          { path: "tomorrow", element: <Tomorrow /> },
          { path: "yesterday", element: <Yesterday /> },
          { path: "nextDays", element: <NextDays /> },
        ],
      },
    ],
  },
  { path: "error", element: <ErrorPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
