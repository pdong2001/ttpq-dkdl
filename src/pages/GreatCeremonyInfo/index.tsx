import {
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Square,
  Stack,
  VStack,
} from '@chakra-ui/layout';
import { Button, Text, Image, GridItem, Grid } from '@chakra-ui/react';
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
      {/* section pt 100, pb 0, bg*/}
      <Box pt={10} pb={0} bgGradient={'linear(to-r, #59C173, #a17fe0, #5D26C1)'}>
        {/* title */}
        <Box w='100%' textAlign='center'>
          <FadeInUp>
            <Heading
              as={'h6'}
              color={'blue.500'}
              lineHeight={1.6}
              fontSize={{ base: 'sm', sm: 'md', md: 'xl' }}
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
        {/* container */}
        <Container
          as={SimpleGrid}
          maxW={'full'}
          columns={{ base: 1, md: 2 }}
          gridGap={{ base: 5 }}
          alignItems='start'
          px={{ base: 10, md: 20, lg: 28 }}
          pb={5}
        >
          <VStack>
            <Box mb={{ base: 4, md: 0 }}>
              <FadeInUp>
                <Heading
                  color={'white'}
                  textTransform={'uppercase'}
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  mb={2}
                >
                  Đại lễ Phật Thành Đạo
                </Heading>
              </FadeInUp>
              <FadeInUp>
                <Text color={'white'} textAlign='justify' mb={2}>
                  Theo truyền thống, hằng năm kể từ ngày mồng 6 - 8/12 âm lịch, Thiền Tôn Phật Quang
                  (Núi Dinh – BRVT) trang nghiêm trọng thể tổ chức kỷ niệm ngày Đức Phật Thích Ca
                  Mâu Ni Thành Đạo, với một chương trình diễn ra bao gồm nhiều hoạt động thiết thực,
                  đã giúp cho Lễ hội trở nên rất ý nghĩa, trong đó, tất cả Hội chúng được dịp hoài
                  niệm ghi nhớ ngày đạo Phật được khai sinh trên toàn cõi năm châu bốn bể này.
                </Text>
              </FadeInUp>
              <FadeInUp>
                <Button mt={2}>Tìm hiểu thêm</Button>
              </FadeInUp>
            </Box>
          </VStack>
          <FadeInUp>
            <Box>
              <Carousels images={eventImgages} styles={{}} settings={{}} />
            </Box>
          </FadeInUp>
        </Container>
        {/* countdown */}
        <FadeInUp>
          {/* <Stack
            as={SimpleGrid}
            maxW={'full'}
            columns={{ base: 1, md: 2, lg: 3 }}
            // templateColumns='repeat(3, 1fr)'
            // gridGap={{ base: 5 }}
            alignItems='start'
            px={{ base: 10, md: 20, lg: 28 }}
            pb={10}
            color='white'
            rounded='md'
            justifyContent={['space-between']}
          > */}
          <Stack
            direction={['column', 'row']}
            spacing={[5, 10, 16, 32]}
            px={{ base: 10, md: 20, lg: 28 }}
            color='white'
            rounded='md'
            justifyContent={['space-between']}
            pb={10}
          >
            <VStack spacing={5} justifyContent='start' alignItems='start'>
              <Text
                textTransform='uppercase'
                fontWeight='bold'
                fontSize={['xl', '2xl']}
                color={primaryColor}
              >
                Thời gian diễn ra
              </Text>
              <Text textTransform='uppercase'>Số ngày còn lại</Text>
            </VStack>
            <HStack spacing={[1, 6, 11, 15, 20]} justifyContent={['space-between']}>
              {new Array(4).fill('00').map((time, i) => {
                return (
                  <Square key={i} border='1px' size={['16', '16', '32']} p={6}>
                    <VStack spacing={[1, 2, 3, 4]}>
                      <Text
                        id={`countdown-${times[i].id}`}
                        fontWeight={'bold'}
                        fontSize={['xl', '2xl', '3xl', '4xl']}
                      >
                        {time}
                      </Text>

                      <Text fontSize={['sm', 'md', 'lg', 'xl', '2xl']}>{times[i].title}</Text>
                    </VStack>
                  </Square>
                );
              })}
            </HStack>
          </Stack>
        </FadeInUp>
      </Box>
    </>
  );
};

export default GreatCeremonyInfo;
