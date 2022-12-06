import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import Signup from '../Pages/Login/Signup';
import Login from '../Pages/Login/Login';
import DeshboardLayout from '../Layout/DeshboardLayout';
import Category from '../Pages/Category/Category';
import PrivateRoute from './PrivateRoute';
import Blog from '../Pages/Blog';
import Deshboard from '../Pages/Deshboard/Deshboard';
import AdminRoute from './AdminRoute';
import AllSeller from '../Pages/Deshboard/AdminDeshbord/AllSeller';
import AllBuyer from '../Pages/Deshboard/AdminDeshbord/AllBuyer';
import BuyerRoute from './BuyerRoute';
import MyOrder from '../Pages/Deshboard/BuyerDeshboard/MyOrder';
import SellerRoute from './SellerRoute';
import AddAProduct from '../Pages/Deshboard/SellerDeshboard/AddAProduct';
import MyProduct from '../Pages/Deshboard/SellerDeshboard/MyProduct';
import Report from '../Pages/Deshboard/AdminDeshbord/Report';
import Payment from '../Pages/Deshboard/BuyerDeshboard/Payment';
import ErrorPage from '../Pages/ErrorPage';
import BlogPage from '../Pages/BlogPage';





export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>,
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },

            {
                path: '/blog/:id',
                element: <BlogPage></BlogPage>,
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/blog/${params.id}`);
                }
            },

            {
                path: '/category/:id',
                element: <PrivateRoute><Category></Category></PrivateRoute>,
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/category/${params.id}`);
                }
            }
        ]
    }
    ,
    {
        path: '/',
        element: <PrivateRoute><DeshboardLayout></DeshboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/deshboard',
                element: <Deshboard></Deshboard>
            }
            ,
            {
                path: '/deshboard/AllSeller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            }
            ,
            {
                path: '/deshboard/AllBuyer',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/deshboard/MyOrder',
                element: <BuyerRoute><MyOrder></MyOrder></BuyerRoute>
            },
            {
                path: '/deshboard/payment/:id',
                element: <BuyerRoute><Payment></Payment></BuyerRoute>,
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/deshboard/payment/${params.id}`);
                }
            },
            {
                path: "/deshboard/AddAProduct",
                element: <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            {
                path: '/deshboard/MyProduct',
                element: <SellerRoute><MyProduct></MyProduct></SellerRoute>
            },
            {
                path: '/deshboard/report',
                element: <AdminRoute><Report></Report></AdminRoute>
            },


        ]

    }
])
