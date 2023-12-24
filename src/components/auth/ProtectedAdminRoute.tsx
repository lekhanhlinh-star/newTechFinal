import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function ProtectedAdminRoute() {
    const [cookies] = useCookies();
    const toast = useToast()
    const token = cookies.jwt;
    const role = cookies?.user?.role;
    if (!token) {
        toast({
            title: "You are not authenticated", status: 'warning', duration: 500, isClosable: true, position: 'top',
        })
        return <Navigate to="/login"></Navigate>
    }
    if (role !== "admin") {
        toast({
            title: "You are not authorized as an administrator", status: 'warning', duration: 500, isClosable: true, position: 'top'
        })
        return <Navigate to="/login"></Navigate>
    }

    // If authenticated, render the child routes
    return <Outlet />;
}