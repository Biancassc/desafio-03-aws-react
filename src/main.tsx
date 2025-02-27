import React from "react";
import ReactDOM from "react-dom/client"; 
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Routes/Home/Home.tsx"
import Profile from "./Routes/Profile/Profile.tsx"
import ProfileEdit from "./Routes/ProfileEdit/Profileedit.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/profileedit",
        element: <ProfileEdit/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);