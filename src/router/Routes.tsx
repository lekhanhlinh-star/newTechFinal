import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Test from "../components/test";
import Login_page from "../pages/LoginPage";
import {AdminPage} from "../pages/admin/AdminPage";

const Routes=()=>{
    const routesForPublic = [{
            path:"/",element:<Test></Test>
        },
        {
            path: "/login",element: <Login_page/>
        }
        ,
        {
            path: "/admin",element: <AdminPage></AdminPage>
        }
    ]
    const router=createBrowserRouter(routesForPublic )
    return <RouterProvider router={router}/>
}
export default Routes