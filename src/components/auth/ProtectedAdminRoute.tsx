import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/react";
import {useCookies} from "react-cookie";


export function ProtectedAdminRoute() {
    const [cookies] = useCookies();
    const toast = useToast()
    const token = cookies.jwt;
    const role=cookies?.user?.role;



    // console.log("data of token", dataTokenO.token)
    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        toast({
            title: "You are not authenticated", status: 'warning', duration: 1000, isClosable: true, position: 'top',
        })
        return <Navigate to="/login"/>;
    }
    if(role!=="admin"){
        toast({
            title: "You are not authorized as an administrator", status: 'warning', duration: 500, isClosable: true, position: 'top'
        })
            return <Navigate to="/login"/>;
    }

    // If authenticated, render the child routes
    return <Outlet/>;
}