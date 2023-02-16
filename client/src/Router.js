import React from 'react';
import {createBrowserRouter} from "react-router-dom"
import App from './App';
import Home from "./components/Home"
import Log from "./components/Log"
import Register from "./components/Register"
import Dashboard from './components/Dashboard';
import Search from "./components/Search"
import MixPosts from './components/MixPosts'
import Notification from './components/Notification';
import Profile from "./components/Profile"

const router=createBrowserRouter([
    {
      path:"/",
      element:<Log/>
    },
    {
      path:"/Register",
      element:<Register/>
    },
    {
      path:"/user/:id",
      element:<Dashboard/>,
      children:[
        {
          path:"/user/:id",
          element:<MixPosts/>
        },
        {
          path:"/user/:id/profile",
          element:<Profile/>
        },
        {
          path:"/user/:id/search",
          element:<Search/>
        },
        {
          path:"/user/:id/notification",
          element:<Notification/>
        }
      ]
    }
])

export default router;