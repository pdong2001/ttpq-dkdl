import {
  Box, Heading, Text, Image,
  VStack,
  useColorModeValue,
  Container,
  Flex,
  Stack, StackDivider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Wrap, WrapItem, useDisclosure, SimpleGrid, Divider
} from '@chakra-ui/react';
import React, { useState } from 'react';

// type Props = {};
const data = {
  header:
    'Thiêng liêng, xúc động buổi lễ chính thức Đại lễ Phật Thành Đạo PL.2565 – DL.2022 tại Thiền Tôn Phật Quang',
  linkImg: 'https://thientonphatquang.com/wp-content/uploads/2022/01/8a.jpg',
  shortContent:
    'Thực hiện theo chỉ đạo của Hòa thượng thượng Thiện hạ Nhơn, chủ tịch Hội Đồng Trị Sự TW GHPGVN, rạng sáng ngày 10/01/2022 (nhằm ngày 08/12 năm Tân Sửu), khi màn sương còn giăng phủ khắp thung lũng núi Dinh, Thiền Tôn Phật Quang đã long trọng tổ chức Đại lễ kính mừng sự kiện Phật Thành Đạo trong bầu không khí vô cùng thiêng liêng và xúc động.',
  content: `Đúng 4h00 sáng, sau tiếng đại hồng chung báo hiệu chương trình bắt đầu, đèn điện các nơi đều được tắt, /n chỉ còn nơi tôn tượng Đức Bổn Sư tỏa ánh sáng dịu dàng. Đại chúng hướng về tôn tượng, đồng loạt bắt chân kiết già, ngồi thiền với tư thế hoa sen trong bầu không khí tĩnh mịch nơi núi rừng thiêng liêng. Khung cảnh như đang tái hiện lại đêm thành đạo thiêng liêng của Đức Phật hơn 2.600 năm về trước. Ca khúc “Đêm Thành Đạo” vang lên cũng là lúc đại chúng cùng chắp tay hướng về tôn tượng Đức Bổn Sư để tưởng nhớ khoảnh khắc huy hoàng, Thế Tôn đắc thành Phật quả vô thượng chánh đẳng chánh giác, mở ra con đường giác ngộ cho muôn loài. Ca khúc kết thúc cũng là lúc nước mắt bắt đầu xuất hiện nơi khóe mắt của rất nhiều người hiện diện nơi đây và niềm xúc động càng thêm dâng trào sau từng lời cảm niệm như chạm vào sâu thẳm trái tim của tất cả những người con Phật: “…Mỗi mùa Thành Đạo về chúng con lại được quây quần bên nhau nhớ lại lúc xưa Thế Tôn một mình một bóng trong rừng hoang lắng sâu trong thiền định để tìm giác ngộ. Ánh sáng giác ngộ đó đã mở ra con đường chân lý tuyệt vời cho thế giới này. Dù không phải ai cũng có thể hiểu được chân lý cao siêu mầu nhiệm mà Thế Tôn đã tuyên giảng, nhưng những kẻ có duyên phúc, có trí tuệ, sẽ tìm thấy nơi đây một kho tàng vô giá vượt hơn tất cả mọi điều sai lạc tầm thường khác. Chúng con nguyện sẽ đem trọn cuộc đời mình, kiếp này đến kiếp khác, sẽ tinh tấn tu tập để trải nghiệm đạo lý của Thế Tôn một cách sinh động thực tế, để có đạo lực dẫn dắt nhiều chúng sinh cùng tiến lên trên đường Chánh Pháp, để dũng cảm khôn khéo bảo vệ Chánh Pháp thoát khỏi mọi sự chống phá đê hèn, giữ cho Chánh Pháp bền vững hưng thịnh theo sự tồn tại của hành tinh”. Trong buổi lễ, mỗi người sẽ được tận tay dâng lên cúng dường Đức Phật một cành hoa tươi thắm. Tuy chỉ là một cành hoa bé nhỏ nhưng chứa đựng trong đó trọn tấm lòng tôn kính Thế Tôn và ước nguyện cao đẹp cho một thế giới hoà bình, dịch bệnh chóng qua, con người yêu thương, hoà hợp, cùng chung nhau bước đi trên con đường vô ngã.`,
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



const CeremonyInfoPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [departmentSelected, setDepartmentSelected] = useState({
    name: '',
    image: '',
    desc: <></>,
  });
  // let departmentSelected = { name: '', image: '' };
  const handleViewDetail = (item: any) => {
    // departmentSelected = item;
    setDepartmentSelected(item);
    console.log('departmentSelected', departmentSelected);

    console.log('item', item);
    onOpen();
  };

  return (
    <Container maxW={'7xl'} p="12">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} style={{ marginBottom: 20, marginTop: 40 }}>
        <Stack spacing={2}>
          <Heading>{data.header}</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            {data.shortContent}
          </Text>

        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={data.linkImg}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
      <Stack
        spacing={{ base: 4, sm: 6 }}
        direction={'column'}
        divider={
          <StackDivider
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          />
        }>
        <VStack spacing={{ base: 4, sm: 6 }}>
          <Divider />
          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <Heading as="h2">What we write about</Heading>
            <Text as="p" fontSize="lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
              pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
              imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
              sapien. Suspendisse placerat vulputate posuere. Curabitur neque
              tortor, mattis nec lacus non, placerat congue elit.
            </Text>
            <Text as="p" fontSize="lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
              pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
              imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
              sapien. Suspendisse placerat vulputate posuere. Curabitur neque
              tortor, mattis nec lacus non, placerat congue elit.
            </Text>
            <Text as="p" fontSize="lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
              pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
              imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
              sapien. Suspendisse placerat vulputate posuere. Curabitur neque
              tortor, mattis nec lacus non, placerat congue elit.
            </Text>
          </VStack>
        </VStack>
      </Stack>
      <Wrap spacing='10px' className='wrap-department'>
        {data.linkSubImg.map((item, index) => DepartmentItem(index, item, handleViewDetail))}
      </Wrap>
      <Modal isOpen={isOpen} size='2xl' onClose={onClose} isCentered scrollBehavior='inside'>
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
          <ModalBody className='modal-body-department'>
            <Container boxSize='lg' mb='20px'>
              {/* SLIDER */}
            </Container>

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
          // opacity: 0.5,
          scale: '1.2',
        }}
      >
        <Image
          src={item}
          borderRadius={'lg'}
          onClick={() => handleViewDetail(item)}
          _hover={{
            // opacity: 0.5,
            scale: '1.2',
          }}
        ></Image>
      </Box>
    </WrapItem>
  );
};

export default CeremonyInfoPage;

