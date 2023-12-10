import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home_page from "../pages/home";
const Routes = () => {
    const routesForPublic = [{
        path: "/", element: <Home_page></Home_page>
    }]
    const router = createBrowserRouter(routesForPublic)
    return <RouterProvider router={router} />
}
export default Routes