import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  useColorModeValue,
  Container,
  Flex,
  Stack,
  StackDivider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Wrap,
  WrapItem,
  useDisclosure,
  SimpleGrid,
  Divider,
  HStack,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import Slider from 'react-slick';
import API from '~/apis/constants';
import useAxios from '~/hooks/useAxios';

import Ceremonys from './Ceremonys';

type Props = {
  id: number;
};

const data = {
  header:
    'Thiêng liêng, xúc động buổi lễ chính thức Đại lễ Phật Thành Đạo PL.2565 – DL.2022 tại Thiền Tôn Phật Quang',
  linkImg: 'https://thientonphatquang.com/wp-content/uploads/2022/01/8a.jpg',
  shortContent:
    'Thực hiện theo chỉ đạo của Hòa thượng thượng Thiện hạ Nhơn, chủ tịch Hội Đồng Trị Sự TW GHPGVN, rạng sáng ngày 10/01/2022 (nhằm ngày 08/12 năm Tân Sửu), khi màn sương còn giăng phủ khắp thung lũng núi Dinh, Thiền Tôn Phật Quang đã long trọng tổ chức Đại lễ kính mừng sự kiện Phật Thành Đạo trong bầu không khí vô cùng thiêng liêng và xúc động.',
  content: [
    'Đúng 4h00 sáng, sau tiếng đại hồng chung báo hiệu chương trình bắt đầu, đèn điện các nơi đều được tắt, chỉ còn nơi tôn tượng Đức Bổn Sư tỏa ánh sáng dịu dàng. Đại chúng hướng về tôn tượng, đồng loạt bắt chân kiết già, ngồi thiền với tư thế hoa sen trong bầu không khí tĩnh mịch nơi núi rừng thiêng liêng. Khung cảnh như đang tái hiện lại đêm thành đạo thiêng liêng của Đức Phật hơn 2.600 năm về trước. ',
    'Ca khúc “Đêm Thành Đạo” vang lên cũng là lúc đại chúng cùng chắp tay hướng về tôn tượng Đức Bổn Sư để tưởng nhớ khoảnh khắc huy hoàng, Thế Tôn đắc thành Phật quả vô thượng chánh đẳng chánh giác, mở ra con đường giác ngộ cho muôn loài. Ca khúc kết thúc cũng là lúc nước mắt bắt đầu xuất hiện nơi khóe mắt của rất nhiều người hiện diện nơi đây và niềm xúc động càng thêm dâng trào sau từng lời cảm niệm như chạm vào sâu thẳm trái tim của tất cả những người con Phật:',
    '“…Mỗi mùa Thành Đạo về chúng con lại được quây quần bên nhau nhớ lại lúc xưa Thế Tôn một mình một bóng trong rừng hoang lắng sâu trong thiền định để tìm giác ngộ. Ánh sáng giác ngộ đó đã mở ra con đường chân lý tuyệt vời cho thế giới này. Dù không phải ai cũng có thể hiểu được chân lý cao siêu mầu nhiệm mà Thế Tôn đã tuyên giảng, nhưng những kẻ có duyên phúc, có trí tuệ, sẽ tìm thấy nơi đây một kho tàng vô giá vượt hơn tất cả mọi điều sai lạc tầm thường khác.',
    'Chúng con nguyện sẽ đem trọn cuộc đời mình, kiếp này đến kiếp khác, sẽ tinh tấn tu tập để trải nghiệm đạo lý của Thế Tôn một cách sinh động thực tế, để có đạo lực dẫn dắt nhiều chúng sinh cùng tiến lên trên đường Chánh Pháp, để dũng cảm khôn khéo bảo vệ Chánh Pháp thoát khỏi mọi sự chống phá đê hèn, giữ cho Chánh Pháp bền vững hưng thịnh theo sự tồn tại của hành tinh”.',
    'Trong buổi lễ, mỗi người sẽ được tận tay dâng lên cúng dường Đức Phật một cành hoa tươi thắm. Tuy chỉ là một cành hoa bé nhỏ nhưng chứa đựng trong đó trọn tấm lòng tôn kính Thế Tôn và ước nguyện cao đẹp cho một thế giới hoà bình, dịch bệnh chóng qua, con người yêu thương, hoà hợp, cùng chung nhau bước đi trên con đường vô ngã.',
  ],
  linkSubImg: [
    'https://thientonphatquang.com/wp-content/uploads/2022/01/4-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/5-23.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/aa.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/4-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/5-23.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/aa.jpg',
    'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
  ],
  date: '27 Tháng Một, 2022',
};

const listCeremony = [
  {
    name: 'Đại lễ 1',
    startDate: '2022-11-08',
    endDate: '2022-11-08',
    linkImg: 'https://thientonphatquang.com/wp-content/uploads/2022/01/8a.jpg',
    shortContent:
      'Thực hiện theo chỉ đạo của Hòa thượng thượng Thiện hạ Nhơn, chủ tịch Hội Đồng Trị Sự TW GHPGVN, rạng sáng ngày 10/01/2022 (nhằm ngày 08/12 năm Tân Sửu), khi màn sương còn giăng phủ khắp thung lũng núi Dinh, Thiền Tôn Phật Quang đã long trọng tổ chức Đại lễ kính mừng sự kiện Phật Thành Đạo trong bầu không khí vô cùng thiêng liêng và xúc động.',
  },
  {
    name: 'Đại lễ 2',
    startDate: '2022-11-08',
    endDate: '2022-11-08',
    linkImg: 'https://thientonphatquang.com/wp-content/uploads/2022/01/8a.jpg',
    shortContent:
      'Thực hiện theo chỉ đạo của Hòa thượng thượng Thiện hạ Nhơn, chủ tịch Hội Đồng Trị Sự TW GHPGVN, rạng sáng ngày 10/01/2022 (nhằm ngày 08/12 năm Tân Sửu), khi màn sương còn giăng phủ khắp thung lũng núi Dinh, Thiền Tôn Phật Quang đã long trọng tổ chức Đại lễ kính mừng sự kiện Phật Thành Đạo trong bầu không khí vô cùng thiêng liêng và xúc động.',
  },
  {
    name: 'Đại lễ 3',
    startDate: '2022-11-08',
    endDate: '2022-11-08',
    linkImg: 'https://thientonphatquang.com/wp-content/uploads/2022/01/8a.jpg',
    shortContent:
      'Thực hiện theo chỉ đạo của Hòa thượng thượng Thiện hạ Nhơn, chủ tịch Hội Đồng Trị Sự TW GHPGVN, rạng sáng ngày 10/01/2022 (nhằm ngày 08/12 năm Tân Sửu), khi màn sương còn giăng phủ khắp thung lũng núi Dinh, Thiền Tôn Phật Quang đã long trọng tổ chức Đại lễ kính mừng sự kiện Phật Thành Đạo trong bầu không khí vô cùng thiêng liêng và xúc động.',
  },
];

const CeremonyInfoPage = ({ id }: Props) => {
  // Get data event detail
  const { data: dataDetailEvent, error } = useAxios({
    url: `${API.GET_CEREMONY}/${id}`,
    method: 'POST',
  });

  // Get data all event
  const { data: dataAllEvent, error: errorGetAllEvent } = useAxios({
    url: API.GET_EVENT_ALL,
    method: 'POST',
  });

  console.log('request data item: ', dataDetailEvent);
  console.log('request data all: ', dataAllEvent);
  console.log('request error: ', error);
  console.log('request error: ', errorGetAllEvent);

  const [initSlide, setInitSlide] = useState(0);

  // Settings for the slider
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initSlide,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [slider, setSlider] = useState<Slider | null>(null);
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  const handleViewDetail = (item: any, index: number) => {
    console.log(item);
    setInitSlide(index);
    onOpen();
  };

  interface BlogAuthorProps {
    date: Date;
    name: string;
  }

  const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
    return (
      <HStack marginTop='2' spacing='2' display='flex' alignItems='center' float={'right'}>
        <Image
          borderRadius='full'
          boxSize='40px'
          src='https://thientonphatquang.com/wp-content/uploads/2017/01/logopq48-48.jpg'
        />
        <Text fontWeight='medium'>{props.name}</Text>
        <Text>—</Text>
        <Text>{props.date.toLocaleDateString()}</Text>
      </HStack>
    );
  };

  return (
    <Container maxW={'7xl'} p='12'>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        style={{ marginBottom: 20, marginTop: 40 }}
      >
        <Stack spacing={2}>
          <Heading>{data.header}</Heading>
          <BlogAuthor name='Tổ truyền thông' date={new Date('2021-04-06T19:01:27Z')} />
          <Divider />
          <Text color={'gray.500'} fontSize={'lg'} textAlign='justify'>
            {data.shortContent}
          </Text>
        </Stack>
        <Flex>
          <Image rounded={'md'} alt={'feature image'} src={data.linkImg} objectFit={'cover'} />
        </Flex>
      </SimpleGrid>
      <Stack
        spacing={{ base: 4, sm: 6 }}
        direction={'column'}
        divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}
      >
        <VStack spacing={{ base: 4, sm: 6 }}>
          <Divider />
          <VStack paddingTop='40px' spacing='2' alignItems='flex-start'>
            <Heading as='h2'>Chi tiết Đại Lễ</Heading>
            {data.content.map((item, index) => (
              <Text key={index} as='p' fontSize='lg' textAlign='justify'>
                {item}
              </Text>
            ))}
          </VStack>
        </VStack>
      </Stack>
      <Wrap spacing='10px' className='wrap-department'>
        {data.linkSubImg.map((item, index) => DepartmentItem(index, item, handleViewDetail))}
      </Wrap>
      <Heading as='h2' paddingTop='60px'>
        Các Đại Lễ khác:
      </Heading>
      <Divider />
      <HStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {listCeremony.map((item, index) => (
            <Ceremonys
              key={index}
              name={item.name}
              startDate={item.startDate}
              endDate={item.endDate}
              shortContent={item.shortContent}
              linkImg={item.linkImg}
            />
          ))}
        </SimpleGrid>
      </HStack>
      <Modal isOpen={isOpen} size='6xl' onClose={onClose} isCentered scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <h1
              style={{
                textAlign: 'center',
                fontSize: '30px',
              }}
            >
              ALBULM ẢNH ĐẠI LỄ
            </h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position={'relative'} width={'full'} overflow={'hidden'}>
              {/* CSS files for react-slick */}
              <link
                rel='stylesheet'
                type='text/css'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
              />
              <link
                rel='stylesheet'
                type='text/css'
                href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
              />
              {/* Left Icon */}
              <IconButton
                aria-label='left-arrow'
                variant='ghost'
                position='absolute'
                left={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickPrev()}
              >
                <BiLeftArrowAlt size='40px' />
              </IconButton>
              {/* Right Icon */}
              <IconButton
                aria-label='right-arrow'
                variant='ghost'
                position='absolute'
                right={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickNext()}
              >
                <BiRightArrowAlt size='40px' />
              </IconButton>
              <Slider
                {...settings}
                ref={(slider: Slider) => {
                  setSlider(slider);
                  console.log('slide', slider);
                }}
              >
                {data.linkSubImg.map((image, index) => (
                  <Image
                    key={index}
                    rounded={'md'}
                    alt={'feature image'}
                    src={image}
                    objectFit={'cover'}
                    position='relative'
                  />
                ))}
              </Slider>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const DepartmentItem = (index: number, item: any, handleViewDetail: any) => {
  return (
    <WrapItem key={index} mb='10px'>
      <Box
        boxSize='xs'
        pos='relative'
        _hover={{
          scale: '1.2',
        }}
      >
        <Image
          src={item}
          borderRadius={'lg'}
          onClick={() => handleViewDetail(item, index)}
          _hover={{
            scale: '1.2',
          }}
        />
      </Box>
    </WrapItem>
  );
};

export default CeremonyInfoPage;
