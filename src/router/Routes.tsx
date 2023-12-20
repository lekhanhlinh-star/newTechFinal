import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Test from "../components/test";
import Login_page from "../pages/LoginPage";
import {AdminPage} from "../pages/admin/AdminPage";
import Home_page from "../pages/home";
import {AdminStudentsPage} from "../pages/admin/AdminStudentsPage";
import {LecturerPage} from "../pages/lecture/LecturerPage";
import {DetailProject} from "../components/lecturer/DetailProject";


 const Routes = () => {
     const routesForPublic = [
         {
             path: "/",
             element: <Home_page/>
         },
         {
             path: "/login",
             element: <Login_page/>
         }
         ,
         {
             path: "/admin",
             element: <AdminPage></AdminPage>
         }
         ,

         {
             path: "/admin/students/",
             element: <AdminStudentsPage></AdminStudentsPage>
         },
         {
             path: "/lecturer",
             element: <LecturerPage></LecturerPage>
         },
         {
             path: "/lecturer/project/:id",
             element:<DetailProject></DetailProject>
         }
     ]
     const router = createBrowserRouter(routesForPublic)
     return <RouterProvider router={router}/>
 }
export default Routes
