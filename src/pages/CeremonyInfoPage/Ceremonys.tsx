// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

type Props = {
  name: string;
  startDate: string;
  endDate: string;
  linkImg: string;
  shortContent: string;
};

export default function blogPostWithImage({ name, startDate, linkImg, shortContent }: Props) {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={linkImg}
            // layout={'fill'}
          />
        </Box>
        <Stack>
          <Heading
            paddingTop={'40px'}
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {name}
          </Heading>
          <Text color={'gray.500'}>{shortContent}</Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={'https://thientonphatquang.com/wp-content/uploads/2017/01/logopq48-48.jpg'}
            // alt={'Author'}
          />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>Tổ truyền thông</Text>
            <Text color={'gray.500'}>{startDate}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
