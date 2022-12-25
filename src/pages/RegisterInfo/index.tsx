import {
  Box,
  Divider,
  Grid,
  GridItem,
  Avatar,
  Flex,
  Stack,
  Button,
  Tag,
  TagLeftIcon,
  TagLabel,
  HStack,
  Link,
} from '@chakra-ui/react';
import { Heading, Text, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Table, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { MdPhone, MdDepartureBoard, MdLocationCity, MdFacebook, MdVerified } from 'react-icons/md';
import { FaUserSecret, FaUserTie } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { formatUrl, getImageSrc, mapReceiverCardAddressDetail } from '~/utils/functions';
import API from '~/apis/constants';
import { useParams } from 'react-router-dom';
import useAxios from '~/hooks/useAxios';
import { getRegisterInfo } from '~/slices/registerInfo';
import { Gender } from '~/dtos/Enums/Gender.enum';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import { convertToAppDateTime } from '~/utils/date';
import { EDIT_REGISTER_PATH } from '~/routes';
import useCustomColorMode from '~/hooks/useColorMode';
import LoginPopup from '~/components/LoginPopup';
import { AuthContext } from '~/providers/auth';
import { ClothingSize } from '~/dtos/Enums/ClothingSize.enum';
import { get } from 'lodash';
import { CarBookingType } from '~/dtos/Enums/CarBookingType.enum';
import { PositionType } from '~/dtos/Enums/PositionType.enum';
import { EventExp } from '~/dtos/Enums/EventExp.enum';
// type Props = {};

const RegisterInfo = () => {
  const history = useHistory();
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const { id, shortUri } = useParams<any>();
  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();
  const { member: authMember } = useContext(AuthContext);

  const { data } = useAppSelector((state) => state.registerInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getRegisterInfo({
        method: 'get',
        url: formatUrl(API.GET_REGISTER_INFO, { id }),
      }),
    );
  }, []);
  const member = data?.member;
  const note = data?.note;
  const leaderId = data?.leaderId;
  const moveType = data?.moveType?.toString();
  const organizationStructureId = member?.organizationStructureId;
  const receiveCardAddress = mapReceiverCardAddressDetail(data?.receiveCardAddress);
  const expDepartments = data?.expDepartments || [];
  const wishDepartment = data?.wishDepartment;
  const isArrived = data?.isArrived;
  const arrivedAt = data?.arrivedAt;
  const department = get(data, 'departmentDetail.department.name');
  const roles = get(data, 'departmentDetail.roles', []);
  const manager = roles.find((item) => item.position === PositionType.Manager);

  const carBookingType = data?.carBookingType?.toString();
  const clothingSize = data?.clothingSize;
  const certificateRegistry = data?.certificateRegistry;
  const companyNameEN = data?.companyNameEN;
  const companyNameVIE = data?.companyNameVIE;
  const assignedDepartment = data.departmentDetail;
  const assignedArea = data.area;
  const assignedGroup = data.group;

  const permanent =
    member?.permanentAddress ||
    [
      [member?.permanentWard?.pre, member?.permanentWard?.name].join(' '),
      member?.permanentDistrict?.name,
      member?.permanentProvince?.name,
    ]
      .filter((e) => !!e)
      .join(', ');
  const temporary =
    member?.temporaryAddress ||
    [
      [member?.temporaryWard?.pre, member?.temporaryWard?.name].join(' '),
      member?.temporaryDistrict?.name,
      member?.temporaryProvince?.name,
    ]
      .filter((e) => !!e)
      .join(', ');

  const { data: groupData, cancel: groupToken } = useAxios(
    {
      method: 'post',
      url: formatUrl(API.GET_MEMBER_IN_GROUP, { leaderId }),
    },
    [leaderId],
  );
  if (!leaderId) {
    groupToken.cancel();
  }

  const { data: ctnInfo, cancel: ctnToken } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      params: { CTNGroupId: organizationStructureId },
      transformResponse: ({ data }) => data,
    },
    [organizationStructureId],
  );
  if (!organizationStructureId) {
    ctnToken.cancel();
  }

  const tableInfo = [
    { title: 'Giới tính', value: member?.gender == Gender.FEMALE ? 'Nữ' : 'Nam' },
    {
      title: 'Năm sinh',
      value: member?.dateOfBirth?.split('-').length ? member?.dateOfBirth.split('-')[0] : '',
    },
    { title: 'Căn cước', value: member?.identityCard },
    { title: 'Điện thoại', value: member?.phoneNumber },
    { title: 'Thư điện tử', value: member?.email },
  ];

  const tableInfoRight = [
    { title: 'Pháp Danh', value: member?.religiousName },
    {
      title: 'Nơi sinh hoạt',
      value: ctnInfo?.find((ctn) => ctn.id === organizationStructureId).name,
    },
    { title: 'Địa chỉ thường trú', value: permanent },
    { title: 'Địa chỉ tạm trú', value: temporary },
    { title: 'Kỹ năng', value: member?.strongPoints || [] },
  ];

  const schedule = {
    departure_address: '',
    departure_time: '',
    return_address: '',
    return_time: '',
    departure_flight_code: '',
    return_flight_code: '',
  };

  const contactStatusMap = {
    '-1': 'Hủy',
    '0': 'Chưa liên hệ',
    '1': 'Chưa chắc chắn',
    '2': 'Chắc chắn tham gia',
  };

  const startAddress = data.startTime?.address;
  const leaveAddress = data.leaveTime?.address;
  const contactStatus = data.contactStatus?.toString();
  if (moveType == MoveType.WithCTN) {
    schedule.departure_address =
      [startAddress?.name, startAddress?.address].filter((e) => !!e).join(', ') || '';
    schedule.departure_time = convertToAppDateTime(data.startTime?.time) || '';
    schedule.return_time = convertToAppDateTime(data.leaveTime?.time) || '';
    schedule.return_address =
      [leaveAddress?.name, leaveAddress?.address].filter((e) => !!e).join(', ') || '';
  } else {
    schedule.departure_address = data.otherStartAddress || '';
    schedule.departure_time = convertToAppDateTime(data.otherStartTime) || '';
    schedule.return_time = convertToAppDateTime(data.otherLeaveTime) || '';
    if (moveType == MoveType.ByPlane) {
      schedule.departure_flight_code = data.startPlaneCode || '';
      schedule.return_flight_code = data.returnPlaneCode || '';
    }
  }

  const groupMembers = groupData?.data || [];
  const isOwner = authMember?.register?.id === data.id;

  const handleUpdateInfo = () => {
    if (isOwner) {
      history.push(formatUrl(EDIT_REGISTER_PATH, { shortUri }));
    } else {
      onOpenLoginModal();
    }
  };
  ``;
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
              src={getImageSrc(member?.avatarPath, 120)}
              mb={4}
              pos={'relative'}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              <Flex justify='center' gap={2}>
                {member?.fullName}{' '}
                {isArrived && (
                  <Tooltip hasArrow rounded='md' label='Đã về chùa'>
                    <span>
                      <MdVerified color='green' />
                    </span>
                  </Tooltip>
                )}
              </Flex>
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mt={2} mb={5}>
              {member?.facebookAddress && (
                <Button
                  size='sm'
                  onClick={() => {
                    window.open(member?.facebookAddress, '_blank');
                  }}
                  leftIcon={<MdFacebook />}
                  colorScheme='facebook'
                  variant='solid'
                >
                  Facebook
                </Button>
              )}
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

            <Flex px={6} pt={5} textAlign={'center'} alignItems='center' direction='column'>
              <Text as='b' color={primaryColor}>
                Tình trạng xác nhận
              </Text>
              <Tag mt={3} textAlign='center' colorScheme={'blue'} borderRadius='full'>
                {contactStatusMap[contactStatus ? contactStatus : 0]}
              </Tag>

              {isArrived && (
                <>
                  <Text mt={5} as='b' color={primaryColor}>
                    Đã về chùa lúc
                  </Text>
                  <Tag
                    mt={3}
                    textAlign='center'
                    colorScheme={isArrived ? 'green' : 'blue'}
                    borderRadius='full'
                  >
                    {isArrived ? convertToAppDateTime(arrivedAt) : 'Đang Cập Nhật'}
                  </Tag>
                </>
              )}
              {/* <Text as='b' color={primaryColor}>
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
              </InputGroup> */}
            </Flex>
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
                <Text w={'full'} as='b' color={primaryColor} fontSize='xl'>
                  Thông tin
                </Text>
                {shortUri && (
                  <Button onClick={handleUpdateInfo} size='sm'>
                    Cập nhật
                  </Button>
                )}
                <LoginPopup
                  title={'Xác thực thông tin'}
                  isOpen={isOpenLoginModal}
                  onClose={onCloseLoginModal}
                  onSuccess={() => {
                    dispatch(
                      getRegisterInfo({
                        method: 'get',
                        url: formatUrl(API.GET_REGISTER_INFO, { id }),
                      }),
                    ).then(() => {
                      history.push(
                        formatUrl(EDIT_REGISTER_PATH, { shortUri: data.eventRegistryPageId }),
                      );
                    });
                  }}
                />
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
                        <Td px={0}>
                          {Array.isArray(ele.value)
                            ? ele.value.map((item, idx2) => {
                                return (
                                  <Tag
                                    key={idx2}
                                    colorScheme={'blue'}
                                    mr={2}
                                    mb={1}
                                    borderRadius='full'
                                  >
                                    {item.name}
                                  </Tag>
                                );
                              })
                            : ele.value}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>

            <Tabs isFitted variant='enclosed'>
              <TabList>
                <Tab>Ban</Tab>
                <Tab>Công quả</Tab>
                <Tab>Lịch trình</Tab>
                <Tab>Khác</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Trưởng Ban </Text>
                      <Box mt={2}>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {manager?.religiousName || manager?.fullName || 'Đang cập nhật'}
                        </Tag>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          <TagLeftIcon boxSize='12px' as={MdPhone} />
                          {manager?.phoneNumber ? (
                            <Link href={`tel:${manager?.phoneNumber}`}>{manager?.phoneNumber}</Link>
                          ) : (
                            'Đang cập nhật'
                          )}
                        </Tag>
                      </Box>
                    </Box>

                    <Box>
                      <Text as='b'>Ban đã được phân </Text>
                      <Box mt={2}>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {department || 'Đang cập nhật'}
                        </Tag>
                      </Box>
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
                        {wishDepartment && (
                          <Tag colorScheme={'pink'} mr={2} mb={1} borderRadius='full'>
                            {wishDepartment.name}
                          </Tag>
                        )}
                      </Box>
                    </Box>
                  </Stack>
                </TabPanel>

                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Số lần đã về chùa</Text>
                      <Box mt={2}>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {EventExp.toString(member?.exps + '')}
                        </Tag>
                      </Box>
                    </Box>
                    {receiveCardAddress && (
                      <Box mt='2'>
                        <Text as='b'>Nơi nhận thẻ</Text>{' '}
                        {receiveCardAddress && <Text>{receiveCardAddress.name}</Text>}
                      </Box>
                    )}
                    {clothingSize && (
                      <Box mt='2'>
                        <Text as='b'>Size áo</Text>{' '}
                        <Tag colorScheme={'pink'} mr={2} mb={1} borderRadius='full'>
                          {ClothingSize.toString(clothingSize)}
                        </Tag>
                      </Box>
                    )}
                  </Stack>
                </TabPanel>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Hình thức di chuyển</Text>
                      <Box mt='2'>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {MoveType.toString(moveType)}
                        </Tag>
                      </Box>
                    </Box>
                    <Box>
                      <HStack>
                        <MdLocationCity />
                        <Text as='b'>Nơi xuất phát</Text>
                      </HStack>
                      <Text>{schedule && schedule?.departure_address}</Text>
                    </Box>
                    <Box>
                      <HStack>
                        <MdDepartureBoard />
                        <Text as='b'>Thời gian xuất phát</Text>
                      </HStack>
                      <Box mt={2}>
                        <Tag mr={2} mb={1} colorScheme={'blue'}>
                          {schedule && schedule?.departure_time}
                        </Tag>
                        {moveType == MoveType.ByPlane &&
                          schedule &&
                          schedule.departure_flight_code && (
                            <Tag mr={2} mb={1} colorScheme={'blue'}>
                              Mã chuyến bay: {schedule?.departure_flight_code}
                            </Tag>
                          )}
                      </Box>
                    </Box>
                    <Box>
                      <HStack>
                        <MdDepartureBoard />
                        <Text as='b'>Thời gian trở về</Text>
                      </HStack>
                      <Box mt={2}>
                        <Tag mr={2} mb={1} colorScheme={'pink'}>
                          {schedule && schedule?.return_time}
                        </Tag>
                        {moveType == MoveType.ByPlane && schedule && schedule.return_flight_code && (
                          <Tag mr={2} mb={1} colorScheme={'pink'}>
                            Mã chuyến bay: {schedule?.return_flight_code}
                          </Tag>
                        )}
                      </Box>
                    </Box>
                    {moveType == MoveType.WithCTN && (
                      <Box>
                        <HStack>
                          <MdLocationCity />
                          <Text as='b'>Nơi trở về</Text>
                        </HStack>
                        <Text>{schedule && schedule?.return_address}</Text>
                      </Box>
                    )}

                    {moveType == MoveType.ByPlane && (
                      <Box>
                        <HStack>
                          <MdDepartureBoard />
                          <Text as='b'>Đăng ký ô tô</Text>
                        </HStack>
                        {carBookingType && (
                          <Tag mt={2} mr={2} mb={1} colorScheme={'green'}>
                            {CarBookingType.toString(carBookingType)}
                          </Tag>
                        )}
                      </Box>
                    )}
                  </Stack>
                </TabPanel>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Thành viên nhóm</Text>
                      {groupMembers?.length === 0 ? (
                        <Box mt='2'>
                          <Tag mr={2} mb={1} colorScheme={'blue'}>
                            Chưa có nhóm
                          </Tag>
                        </Box>
                      ) : (
                        <TableContainer whiteSpace={'break-spaces'} maxW={'400px'}>
                          <Table variant='unstyled' size='sm'>
                            <Tbody>
                              {groupMembers &&
                                groupMembers.length &&
                                groupMembers.map((ele, idx) => (
                                  <Tr key={idx}>
                                    <Td py={1} px={0}>
                                      <Text>{ele?.religiousName || ele?.fullName}</Text>
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
                      )}
                    </Box>

                    <Box>
                      <Text as='b'>Đăng Ký Nhận Giấy Chứng Nhận TNV</Text>
                      <Box mt='2'>
                        <Tag mr={2} mb={1} colorScheme={certificateRegistry ? 'green' : 'pink'}>
                          {certificateRegistry ? 'Có' : 'Không'}
                        </Tag>
                      </Box>
                    </Box>
                    {certificateRegistry && (
                      <Box>
                        <Text as='b'>Tên trường hoặc nơi công tác</Text>
                        <Box mt='2'>
                          <Tag mr={2} mb={1} colorScheme={'blue'}>
                            Tiếng Việt: {companyNameVIE}
                          </Tag>

                          {companyNameEN && (
                            <Box mt='2'>
                              <Tag mr={2} mb={1} colorScheme={'blue'}>
                                Tiếng Anh: {companyNameEN}
                              </Tag>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    )}

                    <Box>
                      <Text as='b'>Ghi chú</Text>
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
