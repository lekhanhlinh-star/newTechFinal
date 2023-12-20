import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Test from "../components/test";
import Login_page from "../pages/LoginPage";
import { AdminPage } from "../pages/admin/AdminPage";
import Home_page from "../pages/home";
import { AdminStudentsPage } from "../pages/admin/AdminStudentsPage";
import { AdminLecturersPage } from "../pages/admin/AdminLecturerPage";
import { AdminProjectsPage } from "../pages/admin/AdminProjectPage";
import { AdminMajorPage } from "../pages/admin/AdminMajorPage";
import { AdminNotificationrPage } from "../pages/admin/AdminNotiPage";



const Routes = () => {
    const routesForPublic = [
        {
            path: "/", element: <Home_page />
        },
        {
            path: "/login", element: <Login_page />
        }
        ,
        {
            path: "/admin", element: <AdminPage></AdminPage>
        }
        ,
        {
            path: "/admin/students/", element: <AdminStudentsPage></AdminStudentsPage>
        },
        {
            path: "/admin/lecturers/", element: <AdminLecturersPage></AdminLecturersPage>
        },
        {
            path: "/admin/projects/", element: <AdminProjectsPage></AdminProjectsPage>
        },
        {
            path: "/admin/majors/", element: <AdminMajorPage></AdminMajorPage>
        },
        {
            path: "/admin/notifications/", element: <AdminNotificationrPage></AdminNotificationrPage>
        }
    ]
    const router = createBrowserRouter(routesForPublic)
    return <RouterProvider router={router} />
}
export default Routes
