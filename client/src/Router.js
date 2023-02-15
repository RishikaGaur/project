import React from 'react';
import {createBrowserRouter} from "react-router-dom"
import App from './App';
import Home from "./components/Home"
import Log from "./components/Log"
import Register from "./components/Register"
import Dashboard from './components/Dashboard';

const router=createBrowserRouter([
    {
      // path:"/",
      // element:<App/>,
      // children:[
      //   {
      //     path:"/home/:roomId",
      //     element:<Home/>
      //   }
      // ]
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
      // children:[
        // {
        //   path:"/user",
        //   element:<Posts/>
        // },
        // {
        //   path:"/profile"
        //   element:<Profile/>
        // },
        // {
        //   path:"/search"
        // },
        // {
        //   path:"notification"
        // }
      // ]
    }
])

export default router;