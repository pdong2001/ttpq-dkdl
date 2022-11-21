import {
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Square,
  Stack,
  VStack,
  Flex,
} from '@chakra-ui/layout';
import { Button, Text, Image, GridItem, Grid, color } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import AboutImage from '~/assets/about.jpg';
import useCustomColorMode from '~/hooks/useColorMode';
import { useAppSelector } from '~/hooks/reduxHook';
import { useParams } from 'react-router-dom';
import Carousels from '~/components/Carousels';
import EVENT_INFO_00 from '~/assets/event-info/dai-le-00.jpg';
import EVENT_INFO_01 from '~/assets/event-info/dai-le-01.jpg';
import EVENT_INFO_10 from '~/assets/event-info/dai-le-10.jpg';
import EVENT_INFO_11 from '~/assets/event-info/dai-le-11.jpg';
import EVENT_INFO_20 from '~/assets/event-info/dai-le-20.jpg';
import EVENT_INFO_21 from '~/assets/event-info/dai-le-21.jpg';
import EVENT_INFO_30 from '~/assets/event-info/dai-le-30.jpg';
import EVENT_INFO_31 from '~/assets/event-info/dai-le-31.jpg';
import EVENT_INFO_40 from '~/assets/event-info/dai-le-40.jpg';
import EVENT_INFO_41 from '~/assets/event-info/dai-le-41.jpg';
import EVENT_INFO_42 from '~/assets/event-info/dai-le-42.jpg';
import EVENT_INFO_50 from '~/assets/event-info/dai-le-50.jpg';
import EVENT_INFO_51 from '~/assets/event-info/dai-le-51.jpg';
import EVENT_INFO_52 from '~/assets/event-info/dai-le-52.jpg';
import EVENT_INFO_53 from '~/assets/event-info/dai-le-53.jpg';
import EVENT_INFO_54 from '~/assets/event-info/dai-le-54.jpg';

const BuddhaEnlightenmentStartTime = 'December 27, 2022 00:00:00';
const times = [
  { id: 'days', title: 'Ngày' },
  { id: 'hours', title: 'Giờ' },
  { id: 'minutes', title: 'Phút' },
  { id: 'seconds', title: 'Giây' },
];

const coundown = (startTime) => {
  const targetDate: any = new Date(startTime || '');
  console.log('targetDate', targetDate);

  setInterval(() => {
    const today = new Date().getTime();
    const diff = targetDate - today;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const timeParse = [days, hours, minutes, seconds];
    for (let i = 0; i < times.length; i++) {
      const timesRuner = times[i];
      const element: any = document.getElementById(`countdown-${timesRuner.id}`);
      if (element) {
        element.innerHTML = JSON.stringify(timeParse[i]);
      }
    }
  }, 1000);
};

const eventImgages = [
  EVENT_INFO_00,
  EVENT_INFO_01,
  EVENT_INFO_10,
  EVENT_INFO_11,
  EVENT_INFO_20,
  EVENT_INFO_21,
  EVENT_INFO_30,
  EVENT_INFO_31,
  EVENT_INFO_40,
  EVENT_INFO_41,
  EVENT_INFO_42,
  EVENT_INFO_50,
  EVENT_INFO_51,
  EVENT_INFO_52,
  EVENT_INFO_53,
  EVENT_INFO_54,
];

const GreatCeremonyInfo = () => {
  const { primaryColor } = useCustomColorMode();
  const { event } = useAppSelector((state) => state.registerPage.data);
  const { startDate: startTime } = event || { startDate: BuddhaEnlightenmentStartTime };
  const { shortUri } = useParams<any>();

  useEffect(() => {
    const startDate = new Date(startTime || '');
    if (startDate.getTime() > new Date().getTime()) {
      coundown(startTime);
    }
  }, []);

  return (
    <>
      <Box id='eventInfo' scrollMarginTop={16} />
      <Box bgColor={'#f4f4f6'} bgSize={'cover'} py={5}>
        <Container maxW='6xl' px={[3, 5, 16, 20, 0]}>
          <Box w='100%' textAlign='center'>
            <FadeInUp>
              <Heading
                as={'h6'}
                color={'blue.500'}
                lineHeight={1.6}
                fontSize={{ base: 'sm', sm: 'md', md: '2xl' }}
                textTransform='uppercase'
                borderBottom={'2px'}
                borderColor='darkBlue.100'
                mb={10}
                display='inline-block'
              >
                Thông tin đại lễ
              </Heading>
            </FadeInUp>
          </Box>
          <Container
            as={SimpleGrid}
            maxW={'full'}
            columns={{ base: 1, lg: 2 }}
            gridGap={{ base: 10 }}
            alignItems='start'
            px={0}
            mb={10}
          >
            <VStack align={'start'} spacing={{ sx: 10 }}>
              <Box mb={{ base: 4, md: 0 }} color='gray.700'>
                <FadeInUp>
                  <Heading
                    textTransform={'uppercase'}
                    fontSize={{ base: '2xl', md: '2xl', lg: '2xl' }}
                    mb={2}
                  >
                    Đại lễ Phật Thành Đạo
                  </Heading>
                </FadeInUp>
                <FadeInUp>
                  <Box textAlign='justify'>
                    <Text mb={2}>
                      “Cứ mỗi lần ngồi lại với nhau để tưởng nhớ đến đêm Phật Thành Đạo Quả Vô
                      Thượng Chánh Đẳng Chánh Giác, chúng con lại khởi lên niềm vui bất tận. Giống
                      như trong khu rừng rậm gai góc, bỗng có con đường hiện ra. Giống như trong
                      trại giam tăm tối, bỗng cánh cửa hé mở. Khi tâm của Phật bừng chiếu cả pháp
                      giới thì cũng là lúc thế gian có con đường dẫn ra khỏi luân hồi khổ đau.” -
                      Trích Cảm niệm Thành Đạo.
                    </Text>
                    <Text mb={2}>
                      Kính mừng sự kiện vĩ đại ấy, Thiền Tôn Phật Quang long trọng tổ chức chương
                      trình Đại lễ kỷ niệm mừng ngày Đức Phật Bổn Sư Thích Ca Mâu Ni thành đạo PL.
                      2566 - DL. 2022.
                    </Text>
                    <Text mb={2}>
                      Chúng Thanh Niên Phật Tử Phật Quang xin kêu gọi quý Phật tử cùng các bạn thanh
                      niên, sinh viên đăng kí công quả và tham dự Đại lễ.
                    </Text>
                  </Box>
                </FadeInUp>
                <FadeInUp>
                  <Button
                    mt={2}
                    cursor={'pointer'}
                    as={'a'}
                    href='https://www.facebook.com/page/255090418336957/search/?q=ph%E1%BA%ADt%20th%C3%A0nh%20%C4%91%E1%BA%A1o'
                    target={'_blank'}
                    display={'inline-flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    transition={'background 0.3s ease'}
                  >
                    Tìm hiểu thêm
                  </Button>
                </FadeInUp>
              </Box>
            </VStack>
            <FadeInUp>
              <Carousels images={eventImgages} styles={{}} settings={{}} />
            </FadeInUp>
          </Container>

          {/* CONFERENCE DATE */}
          <FadeInUp>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              spacing={[4, 6, 8]}
              rounded='md'
              justifyContent='space-between'
              alignItems='center'
            >
              <VStack
                justifyContent='center'
                alignItems={{ base: 'center', lg: 'start' }}
                spacing={[2, 3, 4, 5]}
              >
                <Text
                  textTransform='uppercase'
                  fontWeight='bold'
                  fontSize={['xl', 'lg', '2xl']}
                  color={primaryColor}
                >
                  Thời gian diễn ra
                </Text>
                <Text textTransform='uppercase'>Số ngày còn lại</Text>
              </VStack>
              <HStack spacing={[4, 10, 16, 16]}>
                {new Array(4).fill('00').map((time, i) => {
                  return (
                    <Square key={i} border='1px' size={[16, 16, 20, 24, 32]} rounded='xl'>
                      <Flex align='center' direction='column'>
                        <Text
                          id={`countdown-${times[i].id}`}
                          fontWeight={'bold'}
                          fontSize={['xl', '2xl', '3xl', '4xl']}
                        >
                          {time}
                        </Text>
                        <Text>{times[i].title}</Text>
                      </Flex>
                    </Square>
                  );
                })}
              </HStack>
            </Stack>
          </FadeInUp>
        </Container>
      </Box>
    </>
  );
};

export default GreatCeremonyInfo;
