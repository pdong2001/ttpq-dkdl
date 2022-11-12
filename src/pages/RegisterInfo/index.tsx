import {
  Box,
  Divider,
  Grid,
  GridItem,
  Avatar,
  IconButton,
  Stack,
  Button,
  Tag,
  TagLeftIcon,
  TagLabel,
  HStack,
} from '@chakra-ui/react';
import { Heading, Text, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { useRef, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Table, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  MdPhone,
  MdContentCopy,
  MdDepartureBoard,
  MdLocationCity,
  MdFacebook,
} from 'react-icons/md';
import { FaUserSecret, FaUserTie } from 'react-icons/fa';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { getRegisterInfo } from '~/apis/registerInfo/slice';
import { formatUrl } from '~/utils/functions';
import API from '~/apis/constants';
import { useParams } from 'react-router-dom';
import useAxios from '~/hooks/useAxios';
// type Props = {};

const RegisterInfo = () => {
  const { id } = useParams<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getRegisterInfo({
        method: 'get',
        url: formatUrl(API.GET_REGISTER_INFO, { id }),
      }),
    );
  }, []);
  const { data, loaded, error } = useAppSelector((state) => state.registerInfo);
  if (loaded) {
    console.log('data, error', data, error);
  }
  const member = data?.member;
  const note = data?.note;
  const leaderId = data?.leaderId;
  const moveType = data?.moveType;
  const organizationStructureId = member?.organizationStructureId;
  const receiveCardAddress = data?.receiveCardAddress;
  const expDepartments = data?.expDepartments ? data.expDepartments : [];
  const wishDepartments = data?.wishDepartments ? data.wishDepartments : [];
  const permanent = [member?.permanentAddress, member?.permanentWard, member?.permanentDistrict, member?.permanentProvince].join(", ");
  const temporary = [member?.temporaryAddress, member?.temporaryWard, member?.temporaryDistrict, member?.temporaryProvince].join(", ");

  const groupData = useAxios({
    method: 'post',
    url: formatUrl(API.GET_MEMBER_IN_GROUP, { leaderId }),
  }, [leaderId]);
  // if (!leaderId) {
  //   groupData.cancel();
  // }

  const ctnInfo = useAxios({
    method: 'get',
    url: API.GET_CTN,
    params: { ctnId: organizationStructureId }
  }, [organizationStructureId]);
  // if (organizationStructureId) {
  // }


  const tableInfo = [
    { title: 'Giới tính', value: member?.gender == 1 ? "Nữ" : "Nam" },
    { title: 'Năm sinh', value: member?.dateOfBirth.split("-").length ? member?.dateOfBirth.split("-")[0] : "" },
    { title: 'Căn cước', value: member?.identityCard },
    { title: 'Điện thoại', value: member?.phoneNumber },
    { title: 'Thư điện tử', value: member?.email }
  ];

  const tableInfoRight = [
    { title: 'Pháp Danh', value: member?.religiousName },
    { title: 'Nơi sinh hoạt', value: ctnInfo?.data?.Data[0].Name },
    { title: 'Địa chỉ thường trú', value: permanent },
    { title: 'Địa chỉ tạm trú', value: temporary },
    { title: 'Kỹ năng', value: member?.strongPoints ? member?.strongPoints : [] },
  ];

  let schedule = {
    departure_address: '',
    departure_time: '',
    return_address: '',
    return_time: '',
    departure_flight_code: '',
    return_flight_code: '',
  };
  if (moveType == 0) {
    schedule.departure_address = data.startTime?.address?.address ? data.startTime.address.address : '';
    schedule.departure_time = data.startTime.time;
    schedule.return_time = data.leaveTime.time;
    schedule.return_address = data.leaveTime?.address?.address ? data.leaveTime.address.address : ''
  } else {
    schedule.departure_address = data.otherStartAddress ? data.otherStartAddress : '';
    schedule.departure_time = data.otherStartTime ? data.otherStartTime : '';
    schedule.return_time = data.otherLeaveTime ? data.otherLeaveTime : '';
    if (moveType == 1) {
      schedule.departure_flight_code = data.startPlaneCode;
      schedule.return_flight_code = data.returnPlaneCode;
    }
  }

  const groupMembers = groupData?.data?.data ? groupData.data.data : [];

  return (
    <Box
      pt={24}
      pb={12}
      px={{ base: '3%', sm: '18%', md: '3%', xl: '10%' }}
      backgroundImage={'radial-gradient(150% 100% at 120% 0%, #fcaf17 0%, #0c4da2 100%)'}
      backgroundSize={'auto 240px'}
      backgroundRepeat={'no-repeat'}
    >
      <Grid
        templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(12, 1fr)' }}
        pt={10}
        gap={{ base: 5, xl: 10 }}
      >
        <GridItem colSpan={{ base: 3, md: 5, lg: 4 }}>
          <Box
            w={'full'}
            h={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            py={6}
            boxShadow={'2xl'}
            rounded={'lg'}
            textAlign={'center'}
          >
            <Avatar
              size={'2xl'}
              src={member?.avatarPath}
              mb={4}
              pos={'relative'}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {member?.fullName}
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mt={2} mb={5}>
              {member?.facebookAddress && <Button size='sm' onClick={() => { window.open(member?.facebookAddress, '_blank') }} leftIcon={<MdFacebook />} colorScheme='facebook' variant='solid'>
                Facebook
              </Button>}
            </Text>
            <TableContainer>
              <Table variant='simple' colorScheme={'gray'}>
                <Tbody borderTop={'1px solid var(--chakra-colors-chakra-border-color)'}>
                  {tableInfo.map((ele, idx) => (
                    <Tr key={idx}>
                      <Td pr={0} pl={{ base: 5, sm: 7, md: 5 }}>
                        <Text as='b'>{ele.title}</Text>
                      </Td>
                      <Td pl={0} pr={{ base: 5, sm: 7, md: 5 }}>
                        {ele.value}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Stack px={6} pt={5} textAlign={'center'} spacing={2} direction='column'>
              <Text as='b' color={'var(--chakra-colors-ttpq-600)'}>
                Đường dẫn vào nhóm
              </Text>
              <InputGroup size='md'>
                <Input
                  colorScheme={'red'}
                  isReadOnly={true}
                  variant='filled'
                  pr='2.5rem'
                  type='text'
                  value='https://invitelink.com/abcdadfad'
                />
                <InputRightElement width='2.5rem'>
                  <IconButton size='sm' aria-label='Copy Link' icon={<MdContentCopy />} />
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 7, lg: 8 }}>
          <Box
            w={'full'}
            h={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            p={6}
            rounded={'lg'}
          >
            <Stack pb={6}>
              <HStack>
                <Text w={'full'} as='b' color={'var(--chakra-colors-ttpq-600)'} fontSize='xl'>
                  Thông tin
                </Text>
                <Button onClick={onOpen} size='sm'>
                  Cập nhật
                </Button>
                <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Xác nhận thông tin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Số điện thoại</FormLabel>
                        <Input ref={initialRef} placeholder='Số điện thoại' />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Số căn cước hoặc chứng minh thư</FormLabel>
                        <Input placeholder='Số CCCD/CMT' />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button>Gửi</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </HStack>

              <Divider borderBottomWidth={'2px'} />

              <TableContainer whiteSpace={'break-spaces'}>
                <Table variant='unstyled' size='sm'>
                  <Tbody>
                    {tableInfoRight.map((ele, idx) => (
                      <Tr key={idx}>
                        <Td minW={'120px'} px={0}>
                          <Text as='b'>{ele.title}</Text>
                        </Td>
                        <Td px={0}>{
                          Array.isArray(ele.value) ? ele.value.map((item, idx2) => {
                            return <Tag key={idx2} colorScheme={'blue'} mr={2} mb={1} borderRadius='full'>
                              {item.name}
                            </Tag>
                          }) : ele.value
                        }</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>

            <Tabs isFitted variant='enclosed'>
              <TabList>
                <Tab>Công quả</Tab>
                <Tab>Lịch trình</Tab>
                <Tab>Khác</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Số lần đã về chùa:</Text> {member?.exps} lần
                    </Box>
                    <Box>
                      <Text as='b'>Kinh nghiệm làm việc tại các ban</Text>
                      <Box mt={2}>
                        {expDepartments.map((ele, idx) => (
                          <Tag key={idx} colorScheme={'blue'} mr={2} mb={1} borderRadius='full'>
                            {ele.name}
                          </Tag>
                        ))}
                      </Box>
                    </Box>
                    <Box>
                      <Text as='b'>Nguyện vọng làm việc tại ban</Text>
                      <Box mt={2}>
                        {wishDepartments.map((ele, idx) => (
                          <Tag key={idx} colorScheme={'pink'} mr={2} mb={1} borderRadius='full'>
                            {ele.name}
                          </Tag>
                        ))}
                      </Box>
                    </Box>
                    <Box>
                      <Text as='b'>Nơi nhận thẻ:</Text> {receiveCardAddress}
                    </Box>
                  </Stack>
                </TabPanel>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <HStack>
                        <MdLocationCity />
                        <Text as='b'>Nơi xuất phát</Text>
                      </HStack>
                      <Text>{ schedule && schedule?.departure_address }</Text>
                    </Box>
                    <Box>
                      <HStack>
                        <MdDepartureBoard />
                        <Text as='b'>Thời gian xuất phát</Text>
                      </HStack>
                      <Box mt={2}>
                        <Tag mr={2} mb={1} colorScheme={'blue'}>{ schedule && schedule?.departure_time }</Tag>
                        {moveType == 1 && schedule && schedule.departure_flight_code && 
                        <Tag mr={2} mb={1} colorScheme={'blue'}>Mã chuyến bay: { schedule?.departure_flight_code }</Tag>}
                      </Box>
                    </Box>
                    <Box>
                      <HStack>
                        <MdDepartureBoard />
                        <Text as='b'>Thời gian trở về</Text>
                      </HStack>
                      <Box mt={2}>
                        <Tag mr={2} mb={1} colorScheme={'pink'}>{ schedule && schedule?.return_time }</Tag>
                        {moveType == 1 && schedule && schedule.return_flight_code && 
                        <Tag mr={2} mb={1} colorScheme={'pink'}>Mã chuyến bay: { schedule?.return_flight_code }</Tag>}
                      </Box>
                    </Box>
                    {moveType == 0 && <Box>
                      <HStack>
                        <MdLocationCity />
                        <Text as='b'>Nơi trở về</Text>
                      </HStack>
                      <Text>{ schedule && schedule?.return_address }</Text>
                    </Box>}
                  </Stack>
                </TabPanel>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Thành viên nhóm</Text>
                      <TableContainer whiteSpace={'break-spaces'} maxW={'400px'}>
                        <Table variant='unstyled' size='sm'>
                          <Tbody>
                            {groupMembers && groupMembers.length && groupMembers.map((ele, idx) => (
                              <Tr key={idx}>
                                <Td py={1} px={0}>
                                  <Text>{ele.fullName}</Text>
                                </Td>
                                <Td>
                                  {ele.role == 1 && (
                                    <Tooltip label='Trưởng nhóm'>
                                      <span>
                                        <FaUserSecret />
                                      </span>
                                    </Tooltip>
                                  )}
                                  {ele.role == 2 && (
                                    <Tooltip label='Phó nhóm'>
                                      <span>
                                        <FaUserTie />
                                      </span>
                                    </Tooltip>
                                  )}
                                </Td>
                                <Td py={1} px={0}>
                                  <Tag colorScheme={'blue'}>
                                    <TagLeftIcon boxSize='12px' as={MdPhone} />
                                    <TagLabel>{ele.phoneNumber}</TagLabel>
                                  </Tag>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>
                    <Box>
                      <Text as='b'>Ghi chú:</Text>
                      <Text>{note}</Text>
                    </Box>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RegisterInfo;
