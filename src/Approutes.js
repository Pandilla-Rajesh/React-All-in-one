import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import ForGotPassWord from './Components/ForGotPassWord/ForGotPassWord'
import Home from './Components/Home/Home'
import ToDos from './Components/ToDos/ToDos'
import OtpInput from './Components/OtpInput/OtpInput'
import AxiosFetch from './Components/AxiosFetch/AxiosFetch'
import ReUseCounter from './Components/ReUseCounter/ReUseCounter'
import ToDoList from './Components/ToDoList/ToDoList'
import JsFunctions from './Components/JsFunctions/JsFunctions'
import Navbar from './NavBar'
import Login from './Components/Login/Login'
import PostsQuery from './Components/PostsQuery/PostsQuery'

const MainLayout = lazy(()=>import('./MainLaout/MainLayout'))
const SignIn = lazy(()=>import('./Components/SignIn/SignIn'))
const Register = lazy(()=>import('./Components/Register/Register'))


function Approutes(){

    const router = createBrowserRouter([
        // <Navbar />,
        // {index:true, element:(<Suspense fallback={<div>...Loading</div>}><SignIn/></Suspense>)},
        // {path:'/sign', element:(<Suspense fallback={<div>...Loading</div>}><SignIn/></Suspense>)},
        {index:true, element:(<Suspense fallback={<div>...Loading</div>}><Login/></Suspense>)},
        {path:'login', element:(<Suspense fallback={<div>...Loading</div>}><Login/></Suspense>)},
        {path:'register', element:(<Suspense fallback={<div>...Loading</div>}><Register/></Suspense>)},
        {path:'forgot', element:(<Suspense fallback={<div>...Loading</div>}><ForGotPassWord/></Suspense>)},
        {path:'otpinput', element:(<Suspense fallback={<div>...Loading</div>}><OtpInput/></Suspense>)},
        {path:'/', element:(<Suspense fallback={<div>...Loading</div>}><MainLayout/></Suspense>),
    
        children:[
            {path:'dashboard', element:(<Suspense fallback={<div>...Loading</div>}><Dashboard/></Suspense>)},
            {path:'home', element:(<Suspense fallback={<div>...Loading</div>}><Home/></Suspense>)},
            {path:'todo', element:(<Suspense fallback={<div>...Loading</div>}><ToDoList/></Suspense>)},
            {path:'axiosfetch', element:(<Suspense fallback={<div>...Loading</div>}><AxiosFetch/></Suspense>)},
            {path:'reusecounter', element:(<Suspense fallback={<div>...Loading</div>}><ReUseCounter/></Suspense>)},
            {path:'jsfunctions', element:(<Suspense fallback={<div>...Loading</div>}><JsFunctions/></Suspense>)},
            {path:'postquery', element:(<Suspense fallback={<div>...Loading</div>}><PostsQuery/></Suspense>)}
        ]
    }
    ])

    return(<Suspense fallback={<div>...Loading</div>}><RouterProvider router={router} /></Suspense>)
}

export default Approutes