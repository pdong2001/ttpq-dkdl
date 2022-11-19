import {
  Box,
  Button,
  Flex,
  Stack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  SimpleGrid,
  Heading,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';
// import environmentDepartment from '~/assets/enviroment.jpg';
import department_names from '../../configs/departmemt';
import './style.css';
import { InfoIcon } from '@chakra-ui/icons';

type Props = {};

function DepartmentInfos({}: Props) {
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

    onOpen();
  };
  return (
    <Box
      bgGradient={'linear(to-r, Blue.300, blue.700)'}
      py={20}
      px={{ base: 10, md: 16, lg: 28, xl: 28 }}
      id='departmentInfo'
    >
      <Box w='100%' textAlign='center'>
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
          Các ban trong đại lễ
        </Heading>
      </Box>

      <SimpleGrid columns={{ md: 2, xl: 3 }} spacing='10px'>
        {department_names.map((item, index) => DepartmentItem(index, item, handleViewDetail))}
      </SimpleGrid>
      <Modal isOpen={isOpen} size='full' onClose={onClose} scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
              <Flex flex={1}>
                <Image
                  alt={'Login Image'}
                  objectFit={'cover'}
                  src={departmentSelected && departmentSelected.image}
                />
              </Flex>
              <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                  <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                    <Text color={'blue.400'} as={'span'}>
                      {departmentSelected && departmentSelected.name}
                    </Text>{' '}
                  </Heading>
                  {/* <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                    The project board is an exclusive resource for contract work. It's
                    perfect for freelancers, agencies, and moonlighters.
                  </Text> */}
                  {departmentSelected && departmentSelected.desc}
                  <Stack textAlign='center' spacing={4}>
                    <Button size='lg'>Đăng ký</Button>
                  </Stack>
                </Stack>
              </Flex>
            </Stack>

            {/* <Container boxSize='lg'>
              <Image
                src={departmentSelected && departmentSelected.image}
                alt='MT'
                borderRadius={'lg'}
                _hover={{
                  scale: '1.2',
                }}
              ></Image>
            </Container>
            {departmentSelected && departmentSelected.desc} */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
const DepartmentItem = (index: number, item: any, handleViewDetail: any) => {
  return (
    <Box
      key={index}
      bgImage={`url(${item.image})`}
      bgSize={'cover'}
      w={'100%'}
      h={{ base: '200px', sm: '320px', md: '300px', xl: '250px' }}
      display={'flex'}
      alignItems={'end'}
      borderRadius='xl'
      cursor={'pointer'}
      onClick={() => handleViewDetail(item)}
    >
      <Box
        bgColor={'rgba(0, 0, 0, 0.8)'}
        w={'100%'}
        h={'50px'}
        p={2}
        display='flex'
        alignItems={'center'}
        borderBottomRadius='xl'
      >
        <Text color={'white'}>{item.name}</Text>
        <InfoIcon marginLeft={'auto'} w={5} h={5} color={'rgba(255, 255, 255, 0.54)'} />
      </Box>
    </Box>
  );
};
export default DepartmentInfos;
