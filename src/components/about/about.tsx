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
import React, { useRef, useState } from "react";
import axios from "axios";



export function AboutComponent() {
    return (
        <Box minH={50} p={2} position={"sticky"} top={0}>
            <Box >
                <Image flex={1} src="https://t4.ftcdn.net/jpg/04/45/70/71/360_F_445707107_elptpcI7pUDPa9kMdnX9e3506QdHfo7r.jpg" style={{ width: '100%' }} />
            </Box>
            <Box mt={50}>
                <Text fontSize={30}>About us</Text>
                <Text whiteSpace="pre-wrap" textAlign="justify" fontFamily={"cursive"}>
                    Khánh Hòa - Cao tốc Nha Trang - Đà Lạt có chiều dài dự kiến khoảng 81,5km.
                    Sau khi dự án hoàn thành, phương tiện ôtô di chuyển từ Nha Trang lên Đà Lạt chỉ khoảng một giờ.
                    Ngày 10.12, đơn vị tư vấn thiết kế Công ty TNHH Tập đoàn Sơn Hải
                    (Tập đoàn Sơn Hải) đã báo cáo các phương án hướng tuyến, sơ bộ tổng mức đầu tư và các nội dung liên quan đến dự án cao tốc Nha Trang - Đà Lạt.
                    Ông Nguyễn Viết Hải - Chủ tịch hội đồng thành viên Công ty TNHH Tập
                    đoàn Sơn Hải - cho hay, dự án cao tốc Nha Trang - Đà Lạt có chiều dài khoảng 81,5km. Ông Hải cho rằng, sau khi dự án hoàn thành, từ Nha Trang đi Đà Lạt chỉ khoảng một giờ.
                    "Qua đánh giá, dự án này có khá nhiều khó khăn như tuyến đường hiểm trở, địa hình phức tạp, do đó, suất đầu tư lớn, kéo theo thời gian thu phí dài nên cần sự hỗ trợ, chỉ đạo của Chính phủ, bộ, ngành, địa phương để đi đến các bước tiếp theo" - ông Hải nêu quan điểm.</Text>
            </Box>

            <Flex direction={"column"} mt={50}>
                <Text fontSize={30}>Team members</Text>

                <Flex>
                    <Flex direction={"column"} flex={1}>
                        <Image src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg" flex={1}></Image>
                        <Text mt={5}>Nguyen van a</Text>
                    </Flex>
                    <Flex direction={"column"} flex={1}>
                        <Image src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg" flex={1}></Image>
                        <Text mt={5}>Nguyen van a</Text>
                    </Flex>
                    <Flex direction={"column"} flex={1}>
                        <Image src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg" flex={1}></Image>
                        <Text mt={5}>Nguyen van a</Text>
                    </Flex>
                </Flex>
            </Flex>

            <Box backgroundColor={"#f8f8f8"} mt={50}>
                <Text>Phone : 090909992</Text>
                <Text>Mail  : mjks@gmail.com</Text>

            </Box>
        </Box >
    );
}