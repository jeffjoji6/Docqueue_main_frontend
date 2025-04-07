import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Navbar_white from "./components/Navbar_white.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Hospitaldetails from "./pages/Hospitaldetails.jsx";
import Emergency from "./pages/Emergency.jsx";
import Quiz from "./components/Quiz.jsx";
import QuizInfo from "./components/QuizInfo.jsx";
import Timeslot from "./components/Timeslot.jsx";
import Confirmationpop from "./components/Confirmationpop.jsx";
import AboutUs from "./pages/Aboutus.jsx";
import AiDoctor from "./pages/AiDoctor.jsx";
import HospitalList from "./pages/HospitalList.jsx";
import Confirmed from "./pages/Confirmed.jsx";
import EmergencyAmbulance from "./pages/EmergencyAmbulance.jsx";

const Layout = () => {
  return (
    <>
      <Navbar_white />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/emergency", element: <Emergency /> },
      { path: "/HospitalDetails/:id", element: <Hospitaldetails /> },
      { path: "/quiz-info", element: <QuizInfo /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/timeslot", element: <Timeslot /> },
      { path: "/confirmationpop", element: <Confirmationpop /> },
      { path: "/confirmed", element: <Confirmed /> },
      { path: "/aboutus", element: <AboutUs /> },
      { path: "/ai-doctor", element: <AiDoctor /> },
      { path: "/hospitallist", element: <HospitalList /> },
      { path: "/emergency-ambulance", element: <EmergencyAmbulance /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
