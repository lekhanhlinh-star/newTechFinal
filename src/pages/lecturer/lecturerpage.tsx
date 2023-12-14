'use client'

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Spacer,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios';


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { HeaderComponent } from '../../components/home/header_components';
import { BodyComponent } from '../../components/home/body_component';
import { AboutComponent } from '../../components/about/about';
import { AnnouncementsComponent } from '../../components/announcements/announcements';
export default function Lecturer_page() {
    const [tab, settab] = useState(0)

    return (
        <Box letterSpacing={2} backgroundColor={"#f8f8f8"}>
            <HeaderComponent settab={settab}></HeaderComponent>
            {
                tab === 0 ? <BodyComponent></BodyComponent> : null
            }
            {
                tab === 1 ? <AboutComponent></AboutComponent> : null
            }
            {
                tab === 2 ? <AnnouncementsComponent></AnnouncementsComponent> : null
            }

        </Box>
    )
}