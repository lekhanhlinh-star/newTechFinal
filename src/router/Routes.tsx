import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Routes=()=>{
    const routesForPublic = [{
        path:"/",element:<div> Home </div>
    }]
    const router=createBrowserRouter(routesForPublic )
    return <RouterProvider router={router}/>
}
export default Routes