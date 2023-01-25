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
  Center,
} from '@chakra-ui/layout';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import useCustomColorMode from '~/hooks/useColorMode';
import { useAppSelector } from '~/hooks/reduxHook';
import { useParams } from 'react-router-dom';
import Carousels from '~/components/Carousels';
import EVENT_INFO_20 from '~/assets/event-info/new-year/new-year-5.jpg';
import EVENT_INFO_21 from '~/assets/event-info/new-year/new-year-6.jpg';
import EVENT_INFO_30 from '~/assets/event-info/new-year/new-year-7.jpg';
import EVENT_INFO_40 from '~/assets/event-info/new-year/new-year-9.jpg';
import GreatCeremonyInfoDetails from './details';

import './index.scss';

const BuddhaEnlightenmentStartTime = 'December 27, 2022 00:00:00';
const times = [
  { id: 'days', title: 'Ngày' },
  { id: 'hours', title: 'Giờ' },
  { id: 'minutes', title: 'Phút' },
  { id: 'seconds', title: 'Giây' },
];

const coundown = (startTime) => {
  const targetDate: any = new Date(startTime || '');
  setInterval(() => {
    const today = new Date().getTime();
    const diff = targetDate - today;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
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

const eventImgages = [EVENT_INFO_20, EVENT_INFO_21, EVENT_INFO_30, EVENT_INFO_40];

const GreatCeremonyInfo = () => {
  const { primaryColor } = useCustomColorMode();
  const { event } = useAppSelector((state) => state.registerPage.data);
  const {
    startDate: startTime,
    endDate: endTime,
    name: eventName,
    description,
  } = event || {
    startDate: BuddhaEnlightenmentStartTime,
  };
  // const { shortUri } = useParams<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const today = new Date();
  const startDate = new Date(startTime || '');
  const isComming = startDate.getTime() > today.getTime();
  const isEnded = new Date(endTime || '').getTime() < today.getTime();

  useEffect(() => {
    if (isComming) {
      coundown(startTime);
    }
  }, [startTime, isComming]);

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
                {description ? (
                  <FadeInUp>
                    <Box className='p-editor-container'>
                      <Box className='p-editor-content ql-container'>
                        <Box
                          className='ql-editor'
                          style={{
                            background: 'unset',
                            padding: 'unset',
                            fontSize: 'unset',
                            fontWeight: 'unset',
                          }}
                          dangerouslySetInnerHTML={{ __html: description || '' }}
                        ></Box>
                      </Box>
                    </Box>
                  </FadeInUp>
                ) : (
                  <FadeInUp>
                    <Heading
                      textTransform={'uppercase'}
                      fontSize={{ base: '2xl', md: '2xl', lg: '2xl' }}
                      mb={2}
                    >
                      {eventName}
                    </Heading>
                    <Box textAlign='justify'>
                      <Text mb={2}>
                        <Text fontStyle={'italic'}>
                          <Text>“Vui vì Tết được về chùa</Text>
                          <Text>Được quỳ bên Phật đón mùa xuân sang</Text>
                          <Text>Hoa đào thắm, sắc mai vàng</Text>
                          <Text>Trong tình huynh đệ lòng càng thêm xuân&quot;</Text>
                        </Text>
                      </Text>
                      <Text mb={2}>
                        Tết Nguyên Đán là lúc mọi người được đoàn viên, ôn lại câu chuyện năm cũ và
                        hứa hẹn với nhau về những điều tốt đẹp trong năm mới. Đặc biệt may mắn hơn
                        nữa, chúng ta dành tâm hồn để được tắm mình trong đạo lý thiêng liêng, thì
                        cuộc đời ta trong năm đó sẽ gặp được nhiều may mắn hơn.
                      </Text>
                      <Text mb={2}>
                        Mùa xuân tại Thiền Tôn Phật Quang, luôn ngập tràn muôn hoa đủ sắc màu rực
                        rỡ, tươi đẹp đón chào hàng vạn lượt Phật tử từ mọi miền tổ quốc. Nhiều
                        chương trình đặc sắc như tụng kinh cầu quốc thái dân an, chúc Tết, thuyết
                        giảng... diễn ra từ đêm 30 Tết đến Mùng 6 Tết.
                      </Text>
                      <Text mb={2}>
                        Chúng Thanh Niên Phật Tử Phật Quang xin mời quý Phật tử cùng các bạn thanh
                        niên, sinh viên hưởng trọn hương vị Xuân và cùng tham gia công quả tại Thiền
                        Tôn Phật Quang.
                      </Text>
                    </Box>
                  </FadeInUp>
                )}

                {/* <Button
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
                  </Button> */}
                {/* <Button onClick={onOpen}>Tìm hiểu thêm</Button> */}
              </Box>
            </VStack>
            <Box style={{ height: '100%' }}>
              <FadeInUp>
                <Carousels images={eventImgages} />
              </FadeInUp>
            </Box>
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
              {isComming && (
                <>
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
                </>
              )}
            </Stack>
          </FadeInUp>
        </Container>
      </Box>
      {/* event detail */}
      <Modal isOpen={isOpen} size='full' onClose={onClose} scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            zIndex={1}
            backgroundColor='#FFF'
            _hover={{
              bg: 'whiteAlpha.300',
            }}
          />
          <ModalBody p={0}>
            <GreatCeremonyInfoDetails />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GreatCeremonyInfo;
