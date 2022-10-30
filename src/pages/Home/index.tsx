import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  useColorModeValue,
  RadioGroup,
  Radio,
  HStack,
  FormLabel,
  FormControl,
  VStack,
  Image,
  Square,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import CoverImage from '~/assets/festival_cover.jpg';
import FadeInUp from '~/components/Animation/FadeInUp';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import AboutImage from '~/assets/about.jpg';

export default function Home() {
  const backgroundColor = useColorModeValue('gray.50', 'gray.900');
  const formTextColor = useColorModeValue('gray.500', 'gray.200');
  return (
    <Box position={'relative'} w='full' minW={'sm'}>
      <Box bgImage={CoverImage} bgSize={'cover'} backgroundAttachment='fixed'>
        <Container
          as={SimpleGrid}
          maxW={'full'}
          columns={{ base: 1, md: 2 }}
          gap={{ base: 1 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 32 }}
          minH='100vh'
          alignItems={'center'}
        >
          <FadeInUp>
            <Stack
              bg={backgroundColor}
              rounded={'xl'}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: 'lg' }}
              mx={{ base: 10, md: 20 }}
            >
              <Stack spacing={4}>
                <Heading
                  color={'ttpq.500'}
                  lineHeight={1.1}
                  fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                >
                  Đăng ký đại lễ
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                  PL.2565 - DL.2022
                </Text>
              </Stack>
              <Box as={'form'} mt={10}>
                <Stack spacing={4}>
                  <FloatingLabel name='name' label='Họ và tên' color={formTextColor} />
                  <FloatingLabel name='phone' label='Số điện thoại' color={formTextColor} />
                  <FloatingLabel
                    name='phone'
                    label='Số căn cước / Hộ chiếu'
                    color={formTextColor}
                  />
                  <FormControl as='fieldset' border={1}>
                    <FormLabel as='legend' color={formTextColor}>
                      Hình thức đăng ký
                    </FormLabel>
                    <RadioGroup defaultValue='0' color={formTextColor}>
                      <HStack spacing='24px'>
                        <Radio value='0'>Cá nhân</Radio>
                        <Radio value='1'>Nhóm</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                </Stack>
                <Button fontFamily={'heading'} mt={8} w={'full'}>
                  Tiếp theo
                </Button>
              </Box>
              form
            </Stack>
          </FadeInUp>
        </Container>
      </Box>

      {/* About Great Ceremory */}
      <Box bgColor={'darkBlue.800'} bgSize={'cover'} px={{ base: 10, md: 20, lg: 28 }} py={10}>
        <FadeInUp>
          <Heading
            as={'h6'}
            color={'ttpq.500'}
            lineHeight={1.6}
            fontSize={{ base: 'md', sm: 'xl', md: '2xl' }}
            textTransform='uppercase'
            borderBottom={'2px'}
            borderColor='darkBlue.300'
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
          <VStack align={'start'}>
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
            <Image src={AboutImage} maxW='full' rounded={'md'} objectFit={'contain'} />
          </FadeInUp>
        </Container>

        {/* CONFERENCE DATE */}
        <FadeInUp>
          <Flex
            direction={['column', 'row']}
            // spacing={10}
            color='white'
            rounded='md'
            justifyContent={'center'}
          >
            <VStack justifyContent='center' alignItems={['center', 'start']} spacing={5}>
              <Text
                textTransform='uppercase'
                fontWeight='bold'
                fontSize={['xl', '2xl']}
                color={'ttpq.500'}
              >
                Thời gian diễn ra
              </Text>
              <Text textTransform='uppercase'>Số ngày còn lại</Text>
            </VStack>
            <Spacer />
            <HStack spacing={5} justifyContent='center'>
              {new Array(4).fill('00').map((time, i) => {
                const times = ['Ngày', 'Giờ', 'Phút', 'Giây'];
                return (
                  <Square border='1px' px={[2, 4, 6, 8]} py={[1, 2, 3, 4]}>
                    <VStack>
                      <Text fontWeight={'bold'} fontSize={['xl', '2xl', '3xl', '4xl']}>
                        {time}
                      </Text>
                      <Text>{times[i]}</Text>
                    </VStack>
                  </Square>
                );
              })}
            </HStack>
          </Flex>
        </FadeInUp>
      </Box>
    </Box>
  );
}
