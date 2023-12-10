import {
    Avatar,
    Box,
    Button,
    Card,
    Center,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { FcPanorama } from "react-icons/fc";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import axios from "axios";



export function HeaderComponent({ settab }: any) {
    return (
        <Box minH={50} backgroundColor={"white"} zIndex={9999} p={2} position={"sticky"} top={0}>
            <Flex display="flex" alignItems="center" justifyContent="center">
                <Avatar ml={10} alignItems={"left"} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEX///+FgeL27uxbWqhsr/7dcqptsv9ZWKdaVqRZWKX68u5ts/9YV6dSUaRTWahWVaZ9etjIbqm4uNZvb7L5+fxPTqO6tdBigM5gX69ljttdZLJqp/VmlOLr5OhlY7a+vtrv7/apqc9fcr9poO7PydppaK6bm8eQjb5ta8Frab5iYavNzeJ9e7bb1OBLSqLY2OhjhdPl3uSXlMHf3+yEhLyrq9DJyeF3d7debbqIiL1heceoZ6lzXqiYZajOb6mKYqi7a6qahlGzAAAPOUlEQVR4nO1da3uaTBBtgnVRIduqqBGtKF5SYoxJNEZzaf//r3p39gYoIDYa8H32fMhjDaZ73Jk5M7uz8O2bgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgsL/Ec79c69arfae752sh3J81G/7K3NmWSbAsmbmqn9bz3pQx0P9doItEyHNB0KmhSf/E5LOcmRhQSzwU9OwNVo6WQ/v03D6msl56bqutQEaecXfM7W+k/UQP4eeZ1IqhNxg3nFtu1Ao2LbbmQ/gLYDp9bIe5CfgLNj86WjTKRSLxYIAvO5skM7mceFkPdB/xS2m/qe3rgsBdj7LwnWLcsT4Nuuh/hv6M8avUyn6U8cg/l3pMI6zftaD/Rc8WjS8NAtFMWXu9XwzGAw282tXTGqx0KRBx3rMeriHYwIE9bZbYfTsa4gtJIYiiKkk7lzbjGTFbcM0WpOsB3woJhBD9YFdpPxcElWCgg+Tq21cyrFoD4CieWYUx5Rgk8/SQOqfYWDD4Fx1fcBnuEkpjrMe9CHoWYSFPme+1hSqYFmj6Xqyno5IfspVpMm8cU6uQNYZCeOTSQlWqA1SN9MMy+sPu5eX5XL58rI77HuWQTm2qR1XKEXzKeuBp8aIjF7fUIIuTbgNazGk3DjI6+GCckTIpRQ3hKIxynrgadEnToheaBTp0Ak0p3cBeoLk3ZRmdHqHXvlCvgnzTGTxiSq9LQkaqLHDj3FsIENStKnyn4edTkmupl8XwURpTja6i+JHOd6NaF4Hhlq8Jt8GnmY9+DS4J1KPBhAi7TaxPFzrxhEkFLs1QhG1YcILA3K1dZ/18FNgQSyPho8iKDkeJRAEijCL+oDOOGFoLLIe/n6AUuibIndCpD0kESQUH6Dkp65YJPH0HBRjDGbnQpgBD7OGyQQJxSEksBoEG5hEnPvMpu4hohQVHjnMx30ECcVHk0emClEM5OV9derWFOG/RebSS4oyXELKXfKlaC0hLmbeq2EwUk2OdplA8G7c4K+W8lvRzsBMawaRCmKklQFYXDfB/Uxzxm0YJlF+yKhlTSEZDimNqE9BioLjvbB8hwmrUZd7ImZJEPguMpysSSQC5F53hZHGBlKiEUQ1zYWcT26mrp570QeXQkVe1HqxNkp1HntSKz1eLhch/V5mTSIREGjaFRb48TRmClmuZvjJQJmkslRiKu3ch5o1ZjGj0IZaSDIM1oaX5csVZAXIT8jLffhiCizU4HXWJBIxNZi52UQNzYak0FsGk7cF1IU44KTlBnmnZTPjNnJdX9SJWNDlGZtkmzLQlMcz0/BnDJbhUCidg1CDaDCdE4a1PGc19RoXC6gMJcPuCPleR5M0ZDWCPkqDqeZyucg/Q5hDSKJ9sYCa2GBlVLkPiXaYIGMI6TrMYd4ZSisNMGTqR0vh8pIS7IejLJvDs7BSWMHQm5XtSEMzGA2vIKRAIb+d68hIUyGRJucrGUG1wGNfDoaQl5nrHhA0JzvrbuPzUQup+JBDBxSf2CHMIv2xuNxGeSry9fwrfhUyTL5OHyotyg2LtycQW91mCMUF2wOAbLaaNYlExGfeLMZELr2dVebtaHxFghazIYejOoGjqv7yRJTNsPKhOVmTSMbK4Dn0QN9eaCOpjeVFLL3R5TZ9wPN1Y5U1hT3oC2WjZjreEvZG1LpNeSyMlKpo3vcu7sXCWbEN9UN4yqK3Lx5ge6otl+fy7YYEI8T2negk4nWK1cQ1FkvCsJqY/x02MFMdFvUrsGuxlYBGEQQZQXQKIZLm3khJNIUlJrYPAXWuGbvxxAmyhI7tc5BPYidrAvvhG11z/8YF37Zo+mad9fBT4IlaHe1AgC18w0uYxfKdBxvi/Gqw6vxvzBCAfrMcDCp9UjjFLyoOoaxCbL8YmhXweTTVODPEgw3bBEbmeDcVBX6XY9Z0wi4Fk545WQ8+HaqQgbZoo4xLG4JNrxfRqcB6TxElSDdyNCvfSXcAdCefNWOwdhpk1Ug6I1mSV91GDbqKRENN8eVsdvEpHBogN3TohQHviDImjbsu1FPd7l1jYvCuqAFtXYTtX/IZJ+uBp8ctbYrasJYu3ieLsGlpo9VqNdIsEyPeW8sawyjB3O8chlCljW18gmze2QaJqmEY4liCjpq2P83ofJyQgS4a6i+UAuE4b/HGdQFdb83FL19og2n+07UtjGmLsNap8F5gt9nWfbSbLu8drnRouLXyvToTiT7rWmNNtKw93+3M5835vOPKxn3ePnsOCfcunBk3x3lBNuqHG9nJ+3NuvJaT9XAPx9NEHAXStabtk/RPIxTspiacE0/OIiH1Ub9dsLNOV3weX67tQsU/hVCsFNzrFz5/9BpsLc7onJdTrbEOYO3q9Y1xRCS4bIgDurZtu8QdN23R+n319souMaxa1cl66KngjD3T4MZ39fH91buSAsEnTb4gF3iv3z/EBYbpjZ2sh78X92vM8rFSCQj8/P79O5lHwSGMKzJ/5Pc/r8TlJK/B63yvRD2veD5WKt38KHGGhMM7YbN13oKwfue/JQxLP244R2yunrOmEYd6VePuV2rdXFwEGBJ8vP55A1oUSHv78/ohfsUYXlzctErcIbVqHoOOMzbZUcNSqUWGu82Q0fz5F/DzI/SuYEg+0mITqZlm7hzyfmIy90PaLzrYSIbR8BmSD/1iZ2iRaU5y5JD156nF3U+74UP9R4bkYzcad0hr+pwPY4WTzAH3u/gkw4ugQ+bhJPTTWBPq8Cs4ys8wBGMV6qGNs03n7hcm5uHld3iMn2NIPv2bBx2MF9k55PPId7+LHXyOIRirdMhRJgrpLLVI99vD8OPvR1qGIYX8cod8kuqn/YocXAzDd6L376kZUvWQCvmVDnm/kOa5435JDF9ppXSlvaZmCA4pjfWrHLLeW/H7XBDzjB1YBMO/byIBv3r7m5ohKCQ3VmyteqdXSKJ+ZqL7xTH8+HPFp53m3X8+UjO8CDikeWqFfJqgGPXbx/CdlfJIu2FpGaksDmAYVEh0wgWP+ymvjdCu+iUzZA4INRVMCBurdMdUDKlCsgIMm9PTrI73ZHIWpX5JDH9yBxTzTuaDu+PPAxheSIWEY9NHP/ft9DWLm+ce99thSByQ+63P4gf3K+qO6RlSh2TGah35xjaOYfIwuNf9wgw/QAGjJp5PB6jjxwEMqUIymEdtaqhah/JjDNH7WyS/IMe3d3QIQ5/jUbdynmfMyVspIkyQoRZ2wO2RclPVDmL443eLT+JRN6vG1r4kLZrhtgNuXdKS16T+qyKNO3ojqtM3LH73jpShhjNEiZGXq2NahjctcQctdIpW255nGfHFUjRDpoCJg6bBMRVDUU6R2r9aQydpJr6Vko9SOGSpVEIpbPrHL0Su3H8ZF3zEBL9mnKhd+ukxbtEiaugpfTbFhYFljUdI2uonYxi/8HRK7C5NnZJh+vLpSIgsnk7L8FugBEYJJfBx+P3mS8ThAvjkDIPLGPsd8hP8fvnL/KGa6QsYkv9kKbaxT+WQNzIhwMut2v5LGH77RtVRbKYdnx+PnlScdr7er2GIoPHciF0S/gz8BWEDWuMzZGg2Hg5QyNT8Aur30DAzZlgud4+skEH165bL2TOE8/UNqZDaJxVSbK4R9ZvSEza5YAgNzcO1tb1F+i/85AaptR6y1umcMIS234cx51hCsQXhHn4txN3PGj+IhuLcMKSHmpbeYctxIQQW0paBE1I5Ysi601eH1FeB6fuNRG20Cne954shcByukVDI9AseIjnDaD3c6urPG0PmkN5BCumrnzeOuL9i7hgCRzhqIOurPfz82ogeWNj9azlkCMO6hAYUHnQSHFJsDoL6PUcerMmcIV5GngulN++cyG3UGGMVK4NEHSa75in+DilhsmSo4dV2aPDH9jDmjVKRxirME5Ha7yH2bwzZ3XoyZAjy1Yi2LxC1xsiU6VyYnzBPc9SIPh8Mtt7w+I1qs2RI94GWUTFCTIJsyJQOKWojUL94E+guNbEIvcPwG3GB2em39f1ncphagqHdTcL1VaA2SnC/h7Em9ruiGNbH0y+4dTQwfNHkwa2E0fY9f/Nfbsl7/aRvRRz9Iv9DFMOvAYJbJsGBH25xi2GsQ4JCipSVJZ/R6kevvhwu5NGvuQ03VsqUITzEoc367g1zFRd0YNhT+TAWon5xXwaElxWfcL0Nj43IniGcDelIjlAXxAwdFJKYXpL6XUJ9wvghvd0p8DsoZ84QHlTh8vMhyMTj+MDa7RuW0U/4/Zh3+uv6i8sei5EThpSjfKpK4hzd7ZtjjT61xRWP/cgNQzhnJ88xYSs26CT4KT9IRM9JVfzjUVkz3NiBM1sVey4c0pr24shE8uvxOETcbx7gVyjamwwZQkSHB3FUfJIksL4IjvF6sG2eUkuQ/nIdOOYGpg9mgXBGDD32AAc0cIMPOiqIoJOk6UF+Mh+A8BLkV3QHzLUNLyOG97x5gYysE+a4EYFVe4wNOpzfnVgz1/VNmF9HhGfLyK7Tu+cJ62pfBx/pVLSbusx04jkSfjJ70ZtBjyZCLz0644d63YrSQUfz4EHRSmHOA6sxi6kfoO6Y8exFmxeC4aUwR+ILWmV/Sv9pjXmUh/P1oaDT9oPOTmAl2Vkt0gCK/vl9jNf5ODwrT5WAK4U4+q7khUpIKP4834nD4cV34oxPkwQhGzR2xzvwxysCKyv+UGQgFt9JPk4EBVHv+Ta3PSfcIXkJyYo/7n7bc+7b9Rf0rB+M29VMpiWhuGHzoIMwJlXTcIp5bNLmdjg2cX54loPwEo37xUwMvhlKvcRzABHJAkxD3NckFHtFUovwLMODTvvhPIomFLyxKyH95hOEhCkHzbNibzA3ZfPRyZrEHsgHj8Jj1UIsRDYXKP52w1HfyZpACtSrI1GmhwMrzaPRTq7eEbm6OcrlCeco1OHUuhDzcHnVfAl7qC3SAjilfi78KGTnGyyXBSkVw/WkWKj7smNbR8STXJMIm2XYaJn7Wed2axMOp4+5spPMZYsj4ceLP83EfSfrof4z6kteQoI8BMNLRYqHZWx35Z0beiMm8ciXeJoAIJYAjM7owZWxkP3vNE0rBpK4Ux1C+3rALV14qt10xZJj7m/UchgCJWQOi7/jwJENU6ztycl6QCdAnZ/RJMVtHou/4+C2NrNmtf9LeInGffX/FF4UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFML4D48MoR9z1hGoAAAAAElFTkSuQmCC"></Avatar>
                <Text mr={"auto"} fontWeight={'semibold'} ml={5} color={"#3a95d8"}>Education</Text>
                <Button ml={5} py={8} color={"#666666"} backgroundColor={"white"} onClick={() => { settab(0) }}>Home</Button>
                <Button ml={5} py={8} color={"#666666"} backgroundColor={"white"} onClick={() => { settab(1) }}>Announcement</Button>
                <Button ml={5} py={8} color={"#666666"} backgroundColor={"white"} onClick={() => { settab(2) }}>Instructions</Button>
                <Button ml={5} py={8} color={"#666666"} backgroundColor={"white"} mr={"auto"}>About</Button>
                <Button mr={5} borderRadius={20} px={9} py={5} backgroundColor={"white"} border="1px solid #0098ff" >Login</Button>
                <Button mr={10} borderRadius={20} px={9} py={5} backgroundColor={"blue"} border="1px solid #d9d9d9d9" color={"white"}>Sign in</Button>
            </Flex>
        </Box >
    );
}