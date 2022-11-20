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
  Container,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { useHistory } from 'react-router-dom';

// import { Image } from '@chakra-ui/react';
// import environmentDepartment from '~/assets/enviroment.jpg';
import department_names from '../../configs/departmemt';
import { ADD_NEW_REGISTER_PATH } from '~/routes';
import './style.css';
import { InfoIcon } from '@chakra-ui/icons';
import Carousels from '~/components/Carousels';
import { formatUrl } from '~/utils/functions';
import { fillForm } from '~/slices/register';
import FadeInUp from '~/components/Animation/FadeInUp';

type Props = {};

const departmemtImages = [
  'https://thientonphatquang.com/wp-content/uploads/2022/01/4-2.jpg',
  'https://thientonphatquang.com/wp-content/uploads/2022/01/5-23.jpg',
  'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
  'https://thientonphatquang.com/wp-content/uploads/2022/01/aa.jpg',
  'https://thientonphatquang.com/wp-content/uploads/2022/01/4-2.jpg',
  'https://thientonphatquang.com/wp-content/uploads/2022/01/5-23.jpg',
  'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
  'https://thientonphatquang.com/wp-content/uploads/2022/01/aa.jpg',
  'https://thientonphatquang.com/wp-content/uploads/2022/01/6-2.jpg',
];

const CODE_REGISTER = 'WCUdZLd';

function DepartmentInfos({}: Props) {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const [departmentSelected, setDepartmentSelected] = useState({
    name: '',
    image: '',
    desc: <></>,
    code: '',
    images: [],
  });

  const { data: registerPageData } = useAppSelector((state) => state.registerPage);

  // let departmentSelected = { name: '', image: '' };
  const handleViewDetail = (item: any) => {
    // departmentSelected = item;
    setDepartmentSelected(item);
    onOpen();
  };

  const redirectRegisterToDepartment = (code) => {
    const departmemts = _.get(registerPageData, 'departments');
    const deparmentWishJoin = _.find(departmemts, (d) => d.code === code);
    if (registerPageData.id) {
      history.push(formatUrl(ADD_NEW_REGISTER_PATH, { shortUri: registerPageData.id }));
      setTimeout(() => {
        dispatch(
          fillForm({
            register: {
              wishDepartmentId: _.get(deparmentWishJoin, 'id'),
            },
          }),
        );
        console.log('SET_DEPARMENT');
      }, 3000);
      return;
    } else {
      history.push(formatUrl(ADD_NEW_REGISTER_PATH, { shortUri: CODE_REGISTER }));
    }
  };

  return (
    <>
      <Box id='departmentInfo' scrollMarginTop={16} />
      <Box
        bg='yellow.50'
        py={10}
        // px={{ base: 10, md: 16, lg: 28, xl: 28 }}
        id='departmentInfo'
      >
        <Container maxW='6xl' px={[3, 5, 16, 0]}>
          <FadeInUp>
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
          </FadeInUp>
          <SimpleGrid columns={{ md: 2, xl: 3 }} spacing='10px'>
            {department_names.map((item, index) => (
              <FadeInUp> {DepartmentItem(index, item, handleViewDetail)} </FadeInUp>
            ))}
          </SimpleGrid>

          <Modal isOpen={isOpen} size='full' onClose={onClose} scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody p={0}>
                <SimpleGrid minH={'100vh'} maxH={'100vh'} columns={{ sm: 1, md: 1, base: 1, lg: 2 }} spacing={10}>
                  <Flex p={2} flex={1} align={'center'} justify={'center'}>
                    <Carousels
                      images={departmentSelected.images}
                      styles={{ }}
                      settings={{}}
                    />
                  </Flex>
                  <Flex p={2} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={6}>
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
                        <Button
                          onClick={() => redirectRegisterToDepartment(departmentSelected.code)}
                          size='lg'
                        >
                          Đăng ký
                        </Button>
                      </Stack>
                    </Stack>
                  </Flex>
                </SimpleGrid>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Box>
    </>
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
