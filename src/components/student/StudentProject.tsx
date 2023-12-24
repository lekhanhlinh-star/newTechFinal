import { Container, Flex } from "@chakra-ui/react";
import StudentSlidebar from "./StudentSlidebar";
import { memo, useEffect, useRef, useState } from "react";
import { StudentProjectregis } from "./StudentProjectregis";
import axios from "axios";
import { useCookies } from "react-cookie";
import { StudentProjectManage } from "./StudentProjectManage";


export function StudentManageProject() {
    // dang report
    // update task
    const [cookies] = useCookies();
    const token = cookies.jwt;
    const [haveproject, sethaveproject] = useState(false)
    const info = useRef()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_data = async () => {
            await axios.get("http://localhost:5000/api/v1/projects/projectByStudent", {
                headers: {
                    'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
                }
            }).then(data => {
                console.log(data.data.data.data)
                if (data.data.data.data) {
                    sethaveproject(true)
                    info.current = data.data.data.data
                }
                setLoading(false);

            }).catch(err => {
                console.log(err)
            })
        }
        fetch_data()
    }, [])

    if (loading) {
        return <p>Loading...</p>; // Render a loading indicator while waiting for useEffect to complete
    }

    return (<>
        <Flex letterSpacing={2}>
            < StudentSlidebar></StudentSlidebar>
            {
                haveproject ? <StudentProjectManage data={info} token={token}></StudentProjectManage> : <StudentProjectregis></StudentProjectregis>
            }
        </Flex>
    </>);
}

export default memo(StudentManageProject);
