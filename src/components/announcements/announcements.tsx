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



export function AnnouncementsComponent() {
    const arr = [{
        title: "something",
        content: "Note that the effectiveness of justified text alignment can depend on the container's width and the length of the text. In some cases, if the text is too short or the container is too narrow, the justified alignment may not be noticeable.",
        image: "data:image/png;base64,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"
    },
    {
        title: "something",
        content: "Note that the effectiveness of justified text alignment can depend on the container's width and the length of the text. In some cases, if the text is too short or the container is too narrow, the justified alignment may not be noticeable.",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAACoCAMAAACPKThEAAABiVBMVEX/lsFvXdP/////6puRgPP/vAH/mcWbXnB2b9GSgfdyX9iJeuYwMF9WUY+QgfOUgPaEVGZ/dd1CQWf3kbpeU7Y2OFy/jQDkhKx6bc2EiImssrdXXV3035Hc3N1YUZKOkJDNephVVZ//+eP/wwAdIGZRSa2rgACiq6lLQppDPjJhUL43NHF4bcjIcpfpqwBgX1JTTVKpZ33Lzsk+NopiaGj/8qDw8fFcTrlxdnRLUlH/xwDstAB3WwB6ZAA/Oz9IYFuXnaa9wcN0eoTOlgChcgDgpQBGSziGYgCzggBURAB8VQBWUUdhURnEy9FhbHc8OhwrLypJQiuTU3NpRVRAR0k8PnA8NkNoXbhCMTZ1TlYoKz1WODw1PEdfWZ5KOQB+hYFoTgAwRUbk4NOAe1+YnZRfYkvDxrbl0pAkLiDBsn3u69qelGlua1JEOhcQGyUwLRtHNE6zp3auZo6PimNZUQBySmwLGTEAGx3BuHYrNgB0d0lbNlNAQT1eZj5PTzMfLWcAFQAhI0tGQI2lM50+AAAHBElEQVR4nO3di1fTVhzAcdI2gZQ+xNIWpUjhjkIplsFsaS0yWCnIZONlBbspzlfng6lMN+eYm/7lu0lTkqa5SZqgSb2/7/HAsZWEfLxJbh+Qnh4IgiAIgiAIgiAIgiAIgiDoE8f1xO0XcXorPldLoxfsdfjtZc7pjfhMfe2x2yRYgZUqrmE1sry8AlYGNay+WyyXV4t5sNJNtFpOIZZFlWGPZ17j2A1WUqLVGqbCWOsjnuXrWXUbhsONJqv89w2r6yueizdm1RnvmlRZbYpW7OoPJg9QFFt5fqyIWFsWD+5UWeW3yyzKbuBhtVIcbmb+tEiVlSd/YeeoMGJtVNFmZS+qrOZHLTZJn1V+xGr0WcE+aCqwMp9opZgpdFqeNisYV6YCK/OBVQdFsNXFTo9XxRFqrWBcmQuslHE9nE5nY0VKWLXT299B+JuNJ4ldTt7E86vhK82GLTyHNblLXn4yGekeLS65Fw2O6XTT/rjK6C2/emvOaQOTceeq/bxevjOw2tdbQTi0fxDvhqHF3R7jfbqFzsRKdxX8QK0b3h0yh6lC+lif2gp/A+GBn7pgYN0Shw4fJm5JuP/ni3YrGFjhtQRdP63gkuIeGMYHDUL4eLIUs9viEHH5OAEr1L/neqvePsFqJhi8RCgYDO5cZTVCLNK6UbwVoZb7UCpDWrywhjt4XPN8zfVW5wbw3scHPw7qlNZA6SiUmtJbflQ4XvLnIy7HwlZ4XPGXBv2kGL+fYEUQzFYqpdZhha0miMvHRUO8aOU0hkHNcTXIkMJYmlaorOlXvnvl8HD2Xla1D074iStg/FHhRNwVVj7RSmdbGC0rFPtlHbWNLXStMC50vxhT3mNkJe2DTmMYZNUKlddyD1Lq29Hqw3Gp4QpYSVXSXm/uUUx1R6nYpBp/eldxH9VWpXTCi3tUbj0srT4+tRo/VAwsqq1e1HOClTedbbHafCpbPV5FYIU3/e5bb6PEryXl7Ucy1fj9dbDCW37vSU6y8ta3Sso7lOMqBVYsWn92SuXN1Y+UJIrjVQGOV/gA/kCmwlhPlCe8E/k8uAHnQRR7rqTCWK8W5btjhSbVScuBjEorPAf1qso9k894KFW8Lx6s0oo9kFIrlN1WU2Gs0wk8wv9gfWt29ijFstRbsVv1dithAq9wYUssUk8yaLTaquc0rLy5tUrbdJXyx85o44kmFW6torZiS9RaCX8WX5Gocol0STVhjf2WpdVKNQdtq/6ilaryMiI//qHNCqUe6FBhrM2WHXCJ4+KblFqh8iNdKjyBl2fqiN2J42Vffo2otKrc0KdSTODxxy3x7Qnc8bXGC2N0WZW2EwZUGOt36WkY9Fp6DZnbbcxSabK6yr7QmoO2Y4k06Npx85U+7k2MunG1qT0Hbes5pkGru/KLotzLMl1WO/eIc1D1yLpRvhp70/L68UGWKqs/iHPQ9tZSre/h4CIHJZqslsxTeRN/xlvf/cnFj8CKUP1A9R4OYZqVWgArTayXKis8zaJnXJ10ZJV7+zfGUm44t/uX3vIptsIT+Decei1TYEXAerar2g3nwIqI9e5Y+NkReS1gpYP1D35ECFbmrLzvlW/BBiv91uIwrsyW2JbnpGBlUP0ArDrAah7ewcqoxgReXAtYGWIJE3jxiXewMsaSJvBgZQbr3TGMK9NYwgSeJqu0N2G998lIJNJLjVXmKxtl/sUFyD8b9UVZCT8VZzNG73/iS7Iyzj+oj2H05RRZ+ff/C4CVuQY/VKsZO9YUWTFMdXraxldTZmXvcEeTlb9qZ1iBFViBFViZCqzMB1bmOxurAFiZ3lgYVya2kvH7xU/iX6xy02GFlRaEpoUPg9MWsSixyhQVl5Yo1Kxp0WDl92cmW36DYX7J0vNYNFgxTFFCGpV+le2k3tPqdFtNFySrgmQ1/w1YgZUQWJkPrMwHVuazazVaEDoRP17Jg5WeVV6sMCJ+gnGlawX7IFhpZesxDgNWptMYVxaWQoeVv6iyWpkCK9JGBualJxgks6IVKjqsGObD4aTcw5tT8JwMeSuZhQm5BYtPI9NhxSjGUcPJ2rjyhbvLysG6bFzVAg5W83WRlS/U72jdNK7cEFiZryuswiEL+cjXAOPxWc3CEl1s1bys5Ln+kM7Vo8iXlcIm5Evk+aws8nxEvtSl0zrKuHjzQpZ7+0NW6iPfNTNjaYlD0eZlLuNO67TEzQVaLtjVedXAFKmPNWuLlL+hPad9FHGRKM+T9yEz+WoT04QCM7aWjBtLumgnjAf5kMHFLI3qjwYymtXukC9laC6+r9c9Vly8and7fCF+YEaroVDY4CqZhkv2zbjIqidyHp+s7O4pn6zw/pyLrLjbY33ubd9d15nlkr3ubc5lF23Uu6a64zmNA0EQBEEQBEEQBEEQBEGQq/of/mBc0iMYX/EAAAAASUVORK5CYII="
    },
    {
        title: "something",
        content: "Note that the effectiveness of justified text alignment can depend on the container's width and the length of the text. In some cases, if the text is too short or the container is too narrow, the justified alignment may not be noticeable.",
        image: "data:image/png;base64,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"
    },
    {
        title: "something",
        content: "Note that the effectiveness of justified text alignment can depend on the container's width and the length of the text. In some cases, if the text is too short or the container is too narrow, the justified alignment may not be noticeable.",
        image: "data:image/png;base64,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"
    }]

    return (
        <Box minH={50} p={2} position={"sticky"} top={0}>
            {/* <Box >
                <Image flex={1} src="https://t4.ftcdn.net/jpg/04/45/70/71/360_F_445707107_elptpcI7pUDPa9kMdnX9e3506QdHfo7r.jpg" style={{ width: '100%' }} />
            </Box> */}

            <Flex >
                <Box flex={1}>
                    <Image src="https://i.pinimg.com/736x/d8/98/41/d89841baf859ea26db5cc6be8a3899d1.jpg"></Image>
                </Box>
                <Box flex={1}>
                    <Spacer h={200}></Spacer>
                    <Text fontSize={30} fontFamily={"fantasy"} align={"left"}>View new Announcement</Text>
                    <Text fontSize={30} fontFamily={"fantasy"} align={"left"}>Don't Miss Any</Text>
                </Box>



            </Flex>

            <Flex direction={"column"}>
                {
                    arr.map((x) => (
                        <Flex my={5} >
                            <Image src={x.image}></Image>
                            <Box>
                                <Text fontSize={30} ml={5} align={"left"} >{x.title}</Text>
                                <Text ml={5} isTruncated align={"left"}>{x.content}</Text>
                            </Box>

                        </Flex>
                    ))
                }
            </Flex>
        </Box >
    );
}