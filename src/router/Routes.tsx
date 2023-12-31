import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login_page from "../pages/LoginPage";
import {AdminPage} from "../pages/admin/AdminPage";
import Home_page from "../pages/home";
import {AdminStudentsPage} from "../pages/admin/AdminStudentsPage";
import {LecturerPage} from "../pages/lecture/LecturerPage";
import {DetailProject} from "../components/lecturer/project/DetailProject";
import {AdminLecturersPage} from "../pages/admin/AdminLecturerPage";
import {AdminProjectsPage} from "../pages/admin/AdminProjectPage";
import {AdminMajorPage} from "../pages/admin/AdminMajorPage";
import {AdminNotificationrPage} from "../pages/admin/AdminNotiPage";
import {ProtectedAdminRoute} from "../components/auth/ProtectedAdminRoute";
import {StudentPage} from "../pages/student/StudentPage";

import {StudentInfo} from "../components/student/info/StudentInfo";
import {EditInfoLectures} from "../components/lecturer/EditInfoLectures";
import {StudentManageProject} from "../components/student/project/StudentProject";
import {ProjectedHoDRoute} from "../components/auth/ProjectedHodRoute";
import {HoDPage} from "../pages/HoD/HoDPage";


const Routes = () => {
    const routesForPublic = [{
        path: "/", element: <Home_page/>
    }, {
        path: "/login", element: <Login_page/>
    },

        {
            path: "/lecturers/projects/:id", element: <DetailProject></DetailProject>
        }]
    const routesForStudent = [{
        path: "/students", element: <StudentPage></StudentPage>
    }, {
        path: "/students/info", element: <StudentInfo></StudentInfo>
    }, {
        path: "students/project", element: <StudentManageProject></StudentManageProject>
    },]

    const routesForLecture = [{
        path: "/lecturers/projects/", element: <LecturerPage></LecturerPage>
    }, {
        path: "students/project", element: <StudentManageProject></StudentManageProject>
    }, {
        path: "/lecturers/projects/:id", element: <DetailProject></DetailProject>
    }, {
        path: "/lecturers", element: <EditInfoLectures></EditInfoLectures>
    }]

    const routesForHoD = [


        {
            path: "/lecturers/HoD", element: <ProjectedHoDRoute/>, children: [{
                path: "/lecturers/HoD/projects/", element: <HoDPage></HoDPage>
            }]
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


    const router = createBrowserRouter([...routesForPublic, ...routesForAdmin, ...routesForLecture, ...routesForHoD, ...routesForStudent])
    return <RouterProvider router={router}/>
}
export default Routes
