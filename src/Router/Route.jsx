import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AllBook from "../Pages/AllBook"
import AddBook from "../Pages/AddBook"
import BorrowedBook from "../Pages/BorrowedBook"
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                index: true,
                element: <Home />
            },
            {
                path: "/all-books",
                element: <AllBook></AllBook>
            },
            {
                path: "/borrowed-books",
                element: <BorrowedBook />
            },
            {
                path: "/add-book",
                element: <AddBook />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
        ]
    },
    {
        path: '/*',
        element: <ErrorPage/>
    }
        
])

export default router;