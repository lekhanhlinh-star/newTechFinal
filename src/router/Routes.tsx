import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login_page from "../pages/LoginPage";
import {AdminPage} from "../pages/admin/AdminPage";
import Home_page from "../pages/home";
import { AdminStudentsPage } from "../pages/admin/AdminStudentsPage";
import { LecturerPage } from "../pages/lecture/LecturerPage";
import { DetailProject } from "../components/lecturer/DetailProject";
import { AdminLecturersPage } from "../pages/admin/AdminLecturerPage";
import { AdminProjectsPage } from "../pages/admin/AdminProjectPage";
import { AdminMajorPage } from "../pages/admin/AdminMajorPage";
import { AdminNotificationrPage } from "../pages/admin/AdminNotiPage";



const Routes = () => {
    const routesForPublic = [
        {
        path: "/", element: <Home_page/>
        },
        {
        path: "/login", element: <Login_page/>
        },
        {
        path: "/lecturers/", element: <LecturerPage></LecturerPage>
        }
        ,{
        path: "/lecturers/:id", element: <DetailProject></DetailProject>
        }]
    const routesForAdmin = [{
        path: "/admin", element: <ProtectedAdminRoute/>, children: [{
            path: "/admin/students/", element: <AdminStudentsPage></AdminStudentsPage>,
        }, {
            path: "/admin", element: <AdminPage></AdminPage>
        }, {
            path: "/admin/lecturers/", element: <AdminLecturersPage></AdminLecturersPage>
        }, {
            path: "/admin/projects/", element: <AdminProjectsPage></AdminProjectsPage>
        }, {
            path: "/admin/majors/", element: <AdminMajorPage></AdminMajorPage>
        }, {
            path: "/admin/notifications/", element: <AdminNotificationrPage></AdminNotificationrPage>
        }]

    }]


    const router = createBrowserRouter([...routesForPublic, ...routesForAdmin])
    return <RouterProvider router={router}/>
}
export default Routes
