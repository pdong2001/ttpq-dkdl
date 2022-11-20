import {
  Box,
  Heading,
  Grid,
  GridItem,
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useBreakpointValue,
  SimpleGrid,
  Container,
} from '@chakra-ui/react';
import './style.css';
import { useState } from 'react';

import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import FadeInUp from '~/components/Animation/FadeInUp';

// type Props = {};

const Timeline = () => {
  const mediaQuery = useBreakpointValue({
    base: 'small',
    sm: 'large',
    md: 'large',
    lg: 'large',
    xl: 'large',
  });
  const days_schedule = [
    {
      day: { titleDay: 'Thứ tư', titleMonth: 'Tháng 12', titleDate: '28', titleYear: '2022' },
      timelines: [
        [
          { time: '08h00', content: 'Lễ Tổng Kết Đạo Tràng' },
          { time: '11h00', content: 'Dùng cơm trưa' },
          { time: '13h30', content: 'Các đạo tràng báo cáo' },
          { time: '16h00', content: 'Phát bằng khen' },
          { time: '17h00', content: 'Dùng cơm chiều' },
        ],
        [
          { time: '18h15', content: 'Tụng kinh' },
          { time: '19h00', content: 'Thuyết giảng của Thượng tọa Trụ trì' },
          { time: '20h00', content: 'Văn nghệ' },
          { time: '22h00', content: 'Chỉ tịnh' },
        ],
      ],
    },
    {
      day: { titleDay: 'Thứ năm', titleMonth: 'Tháng 12', titleDate: '29', titleYear: '2022' },
      timelines: [
        [
          { time: '04h30', content: 'Thức Chúng' },
          { time: '04h45', content: 'Tọa Thiền' },
          { time: '05h45', content: 'Thể dục' },
          { time: '06h30', content: 'Điểm tâm' },
          { time: '09h00', content: 'Lễ xuất gia' },
          { time: '11h00', content: 'Dùng cơm trưa' },
          { time: '12h00', content: 'Lễ Quy Y Tam Bảo' },
        ],
        [
          { time: '14h00', content: 'Chương trình giao lưu' },
          { time: '17h00', content: 'Dùng cơm chiều' },
          { time: '18h00', content: 'Tọa Thiền' },
          { time: '19h00', content: 'Thuyết giảng của Thượng tọa Trụ trì' },
          { time: '20h00', content: 'Đêm văn nghệ' },
          { time: '22h00', content: 'Chỉ tịnh' },
        ],
      ],
    },
    {
      day: { titleDay: 'Thứ sáu', titleMonth: 'Tháng 12', titleDate: '30', titleYear: '2022' },
      timelines: [
        [
          { time: '03h30', content: 'Thức chúng' },
          { time: '04h00', content: 'Tọa Thiền' },
          {
            time: '04h30',
            content: 'Chương trình Lễ Thành Đạo',
            color: 'red.600',
            sub_content: [
              'Phát nhạc đêm Thành Đạo',
              'Đọc Cảm Niệm Thành Đạo',
              'Tụng Sám Thành Đạo',
              'Phục nguyện - Tam Tự Quy y',
              'Dâng hoa',
              'Cảm tạ của Ban tổ chức',
            ],
          },
        ],
        [
          { time: '07h30', content: 'Điểm tâm' },
          {
            time: '08h30',
            content: 'Họp tổng kết lễ Thành Đạo',
            sub_content: ['Giao lưu Ban Điều Hành Đạo Tràng, Chúng Thanh Niên'],
          },
          { time: '10h00', content: 'Lễ Quy Y' },
          { time: '10h30', content: 'Dùng cơm trưa' },
          { time: '12h00', content: 'Hoàn mãn' },
        ],
      ],
    },
  ];
  const [current_day, setDay] = useState(0);

  const handleChooseDay = (index) => {
    setDay(index);
  };

  const handleNext = () => {
    if (current_day == days_schedule.length - 1) return;
    setDay(current_day + 1);
  };

  const handlePrev = () => {
    if (current_day == 0) return;
    setDay(current_day - 1);
  };

  return (
    <>
      <Box id='timeline' scrollMarginTop={16} />
      <Box
        bgColor={'#f4f4f6'}
        w='full'
        pt={10}
        pb={24}
        px={{ base: 3, md: 10, xl: 28 }}
        id='timeline'
      >
        <Container maxW='7xl' textAlign='center'>
          <FadeInUp>
            <Heading
              as={'h6'}
              color='blue.500'
              lineHeight={1.6}
              fontSize={{ base: 'sm', sm: 'md', md: 'xl' }}
              textTransform='uppercase'
              borderBottom={'2px'}
              borderColor='darkBlue.100'
              mb={10}
              display='inline-block'
            >
              Chương trình Đại lễ
            </Heading>
          </FadeInUp>
          <FadeInUp delay={0.5}>
            <Grid templateColumns='repeat(9, 1fr)' boxShadow='2xl'>
              <GridItem
                h={{ base: '200px', sm: '100%' }}
                colSpan={{ base: 9, md: 4, lg: 3 }}
                borderLeft={'3px solid'}
                borderRight={'3px solid'}
                borderColor={'blue.500'}
              >
                <VStack spacing={0} h='100%'>
                  <Box
                    w='100%'
                    h={{ base: '80px', md: '25%' }}
                    bg='blue.500'
                    color='white'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    {days_schedule[current_day].day.titleDay}
                  </Box>
                  <Box
                    w='100%'
                    h='70%'
                    bg='white'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Grid w='100%' templateColumns='repeat(8, 1fr)'>
                      <GridItem
                        onClick={handlePrev}
                        colSpan={1}
                        cursor={current_day == 0 ? 'inherit' : 'pointer'}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      >
                        <MdArrowBackIosNew opacity={current_day == 0 ? 0 : 1} />
                      </GridItem>
                      <GridItem colSpan={6}>
                        <Text fontSize='1.5em' color='gray'>
                          {days_schedule[current_day].day.titleMonth}
                        </Text>
                        <Text fontSize='3em' color='black'>
                          {days_schedule[current_day].day.titleDate}
                        </Text>
                      </GridItem>
                      <GridItem
                        onClick={handleNext}
                        colSpan={1}
                        cursor={current_day == days_schedule.length - 1 ? 'inherit' : 'pointer'}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      >
                        <MdArrowForwardIos
                          opacity={current_day == days_schedule.length - 1 ? 0 : 1}
                        />
                      </GridItem>
                    </Grid>
                  </Box>
                  <Box
                    w='100%'
                    h={{ base: '80px', md: '25%' }}
                    bg='blue.500'
                    color='white'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    {days_schedule[current_day].day.titleYear}
                  </Box>
                </VStack>
              </GridItem>
              <GridItem colSpan={{ base: 9, md: 5, lg: 6 }} bg={'white'} color={'gray.500'} p={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 10 }}>
                  <Accordion defaultIndex={[0]}>
                    {days_schedule[current_day].timelines[0].map((item, index) => (
                      <AccordionItem
                        textAlign='left'
                        borderTopWidth={index == 0 ? 0 : '1px'}
                        borderBottomWidth='0 !important'
                        key={nanoid()}
                      >
                        <Box>
                          <AccordionButton>
                            <Box flex='1' textAlign='left' color={item.color && item.color}>
                              {item.time}: {item.content}
                            </Box>
                            {item.sub_content && <AccordionIcon />}
                          </AccordionButton>
                        </Box>
                        {item.sub_content && (
                          <AccordionPanel pb={4}>
                            <UnorderedList>
                              {item.sub_content.map((subcontent) => (
                                <ListItem>{subcontent}</ListItem>
                              ))}
                            </UnorderedList>
                          </AccordionPanel>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Accordion defaultIndex={[0]}>
                    {days_schedule[current_day].timelines[1].map((item, index) => (
                      <AccordionItem
                        textAlign='left'
                        borderTopWidth={index == 0 ? 0 : '1px'}
                        borderBottomWidth='0 !important'
                        key={nanoid()}
                      >
                        <Box>
                          <AccordionButton>
                            <Box flex='1' textAlign='left' color={item.color && item.color}>
                              {item.time}: {item.content}
                            </Box>
                            {item.sub_content && <AccordionIcon />}
                          </AccordionButton>
                        </Box>
                        {item.sub_content && (
                          <AccordionPanel pb={4}>
                            <UnorderedList>
                              {item.sub_content.map((subcontent) => (
                                <ListItem>{subcontent}</ListItem>
                              ))}
                            </UnorderedList>
                          </AccordionPanel>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </SimpleGrid>
              </GridItem>
            </Grid>
          </FadeInUp>
        </Container>
      </Box>
    </>
  );
};

export default Timeline;
