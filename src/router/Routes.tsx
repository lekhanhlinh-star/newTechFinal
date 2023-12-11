import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Test from "../components/test";
import Login_page from "../pages/LoginPage";
import {AdminPage} from "../pages/admin/AdminPage";
import Home_page from "../pages/home";
import {AdminStudentsPage} from "../pages/admin/AdminStudentsPage";


 const Routes = () => {
     const routesForPublic = [
         {
             path: "/", element: <Home_page/>
         },
         {
             path: "/login", element: <Login_page/>
         }
         ,
         {
             path: "/admin", element: <AdminPage></AdminPage>
         }
         ,
           {
             path: "/admin/students/", element: <AdminStudentsPage></AdminStudentsPage>
         }
     ]
     const router = createBrowserRouter(routesForPublic)
     return <RouterProvider router={router}/>
 }
export default Routes
