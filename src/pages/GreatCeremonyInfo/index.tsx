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
import { Button, Text, Image } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import AboutImage from '~/assets/about.jpg';
import useCustomColorMode from '~/hooks/useColorMode';
import { useAppSelector } from '~/hooks/reduxHook';
import { useParams } from 'react-router-dom';

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
      <Box bgColor={'#f4f4f6'} bgSize={'cover'} py={10}>
        <Container maxW='6xl' px={[3, 5, 16, 20, 0]}>
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
                    fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                    mb={2}
                  >
                    Đại lễ Phật Thành Đạo
                  </Heading>
                </FadeInUp>
                <FadeInUp>
                  <Text textAlign='justify' mb={2}>
                    Theo truyền thống, hằng năm kể từ ngày mồng 6 - 8/12 âm lịch, Thiền Tôn Phật
                    Quang (Núi Dinh - BRVT) trang nghiêm trọng thể tổ chức kỷ niệm ngày Đức Phật
                    Thích Ca Mâu Ni Thành Đạo, với một chương trình diễn ra bao gồm nhiều hoạt động
                    thiết thực, đã giúp cho Lễ hội trở nên rất ý nghĩa, trong đó, tất cả Hội chúng
                    được dịp hoài niệm ghi nhớ ngày đạo Phật được khai sinh trên toàn cõi năm châu
                    bốn bể này.
                  </Text>
                </FadeInUp>
                <FadeInUp>
                  <Button mt={2}>Tìm hiểu thêm</Button>
                </FadeInUp>
              </Box>
            </VStack>
            <FadeInUp>
              <Image src={AboutImage} maxW='full' rounded={'md'} objectFit={'contain'} />
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
              <HStack spacing={[8, 10, 16, 16]}>
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
