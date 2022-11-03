import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import './style.css';
// type Props = {};

const Timeline = () => {
  const tabs_name = [
    { title: 'MONDAY', sub: '8/12/2022' },
    { title: 'TUESDAY', sub: '9/12/2022' },
    { title: 'WEDNESDAY', sub: '10/12/2022' },
  ];
  const detail = {
    day_one: [
      { time: '08:00', content: 'Lễ tổng kết đạo tràng' },
      { time: '11:00', content: 'Dùng cơm trưa' },
      { time: '13:30', content: 'Các đạo tràng báo cáo' },
      { time: '16:00', content: 'Phát bằng khen' },
      { time: '17:00', content: 'Dùng cơm chiều' },
      { time: '18:15', content: 'Tụng kinh' },
      { time: '19:00', content: 'Thuyết giảng của Thượng toạ Trụ trì' },
      { time: '20:00', content: 'Văn nghệ' },
      { time: '22:00', content: 'Chỉ tịnh' },
    ],
    day_two: [
      { time: '04:30', content: 'Thức chúng' },
      { time: '04:45', content: 'Toạ thiền' },
      { time: '05:45', content: 'Thể dục' },
      { time: '06:30', content: 'Điểm tâm' },
      { time: '09:00', content: 'Lễ xuất gia' },
      { time: '11:00', content: 'Dùng cơm trưa' },
      { time: '12:00', content: 'Lễ Quy Y' },
      { time: '14:00', content: 'Chương trình giao lưu' },
      { time: '17:00', content: 'Dùng cơm chiều' },
      { time: '18:00', content: 'Toạ thiền' },
      { time: '19:00', content: 'Thuyết giảng của Thượng toạ Trụ trì' },
      { time: '20:00', content: 'Đêm văn nghệ' },
      { time: '22:00', content: 'Chỉ tịnh' },
    ],
    day_three: [
      { time: '08:00', content: 'Lễ tổng kết đạo tràng' },
      { time: '11:00', content: 'Dùng cơm trưa' },
      { time: '13:30', content: 'Các đạo tràng báo cáo' },
      { time: '16:00', content: 'Phát bằng khen' },
      { time: '17:00', content: 'Dùng cơm chiều' },
      { time: '18:15', content: 'Tụng kinh' },
      { time: '19:00', content: 'Thuyết giảng của Thượng toạ Trụ trì' },
      { time: '20:00', content: 'Văn nghệ' },
      { time: '22:00', content: 'Chỉ tịnh' },
    ],
  };
  return (
    <Box bgGradient={'linear(to-r, darkBlue.400, darkBlue.600)'} w='full'>
      <Container minH={'100vh'} centerContent justifyContent='center' alignItems='center'>
        <Tabs
          variant='unstyled'
          size={{ md: 'lg', sm: 'sm' }}
          w={{ lg: '900px', md: '800px' }}
          mt='50px'
        >
          <Box display={'flex'} justifyContent='center'>
            <TabList
              bg={'#1f2371'}
              color='#9293bc'
              _selected={{ color: 'white', bg: '#5d5e8d' }}
              borderRadius='xl'
              overflow='hidden'
              w={{ md: 'max-content' }}
            >
              {tabs_name.map((item, index) => CustomTab(item, index))}
            </TabList>
          </Box>
          <TabPanels pt='20px'>
            <TabPanel>{detail && TimelineItem(detail.day_one)}</TabPanel>
            <TabPanel>{detail && TimelineItem(detail.day_two)} </TabPanel>
            <TabPanel>{detail && TimelineItem(detail.day_three)} </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};
const CustomTab = (item: { title: any; sub: any }, index: React.Key | null | undefined) => (
  <Tab
    key={index}
    _selected={{ color: 'white', bg: '#5d5e8d' }}
    // width={{ sm: '80px', md: '150px' }}
    padding={{ md: '15px 30px', base: '15px 10px' }}
  >
    <Box>
      <h1
        style={{
          fontWeight: 'bold',
        }}
      >
        {item && item.title}
      </h1>
      <p
        style={{
          fontSize: '14px',
        }}
      >
        {item && item.sub}
      </p>
    </Box>
    <Box></Box>
  </Tab>
);
const TimelineItem = (detail) => (
  <Wrap className='wrap-timeline'>
    {detail.map((item: any, index: any) => TimelineDetailItem(item, index))}
  </Wrap>
);
const TimelineDetailItem = (item, index) => (
  <WrapItem key={index} width={{ sm: '300px', md: '45%' }}>
    <Box
      w={'full'}
      bg={useColorModeValue('#151853', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      padding={'15px 30px'}
      mb='20px'
      _hover={{
        opacity: 0.5,
      }}
    >
      <h3
        style={{
          fontWeight: 'bold',
          fontSize: '20px',
          color: 'white',
        }}
      >
        {item && item.time}
      </h3>
      <p
        style={{
          color: '#9293bc',
        }}
      >
        {item && item.content}
      </p>
    </Box>
  </WrapItem>
);
export default Timeline;
