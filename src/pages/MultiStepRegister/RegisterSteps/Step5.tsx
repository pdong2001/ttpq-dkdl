import { Stack, Heading, Button, Box, Text, SimpleGrid, Avatar, Divider, GridItem, HStack, Table, TableContainer, Tag, Tbody, Td, Tr, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { register } from '../../../slices/register';
import { unwrapResult } from '@reduxjs/toolkit';
import { MdDepartureBoard, MdLocationCity } from 'react-icons/md';
import _ from 'lodash';

const mapTitlesStep1 = {
  hoTen: 'Họ Và Tên',
  soDienThoai: 'Số điện thoại',
  cccd: 'Căn cước công dân',
  diaDiemXuatPhat: 'Địa điểm xuất phát',
  thoiGianXuatPhat: 'Thời gian xuất phát',
  thoiGianTroVe: 'Thời gian trở về',
};

const dataSuccess = {
  step1: {
    soDienThoai: '43424242',
    cccd: '3232323',
    diaDiemXuatPhat: 'Bến xe buýt Trường ĐH Nông Lâm TP. HCM',
    thoiGianXuatPhat: '08:00 01-12-2022',
    thoiGianTroVe: '15:00 05-12-2022',
  },
  group: {
    cccdNhomTruong: '00109342343432',
    tenNhomTruong: 'Lương Thai Tam',
  },
  avatar: '23232323',
  hinhThucDangKy: '1',
  LinkQrCode: `/register-info/sdesdsd`,
  isOpen: true,
  hoTen: 'sdsdsdsd',
};

const Step5 = (props: StepProps) => {
  const { step1, LinkQrCode, isOpen, avatar, hoTen, group } = dataSuccess;
  const { previousStep, nextStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.register.data);
  const handleRegister = () => {
    dispatch(
      register({
        data: formData,
      }),
    )
      .then(unwrapResult)
      .then(() => {
        nextStep();
      })
      .catch((e) => {
        alert(e.message || 'Dạ có lỗi xảy ra ạ');
        console.log('Dạ có lỗi xảy ra ạ', e);
      });
  };
  return (
    <>
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Xác nhận đăng ký
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>


        <GridItem colSpan={{ base: 3, md: 5, lg: 4 }}>
            <Box textAlign={'center'}>
              <Avatar size={'2xl'} src={avatar} mb={4} pos={'relative'} />
              <Heading fontSize={'2xl'} fontFamily={'body'} mb={4}>
                {hoTen}
              </Heading>
              <Box>
              <TableContainer>
                <Table variant='simple' colorScheme={'gray'}>
                  <Tbody>
                    {_.map(step1, (info, key) => {
                      return (
                        <Tr>
                          <Td pr={0} pl={{ base: 2, sm: 2, md: 2 }}>
                            <Text as='b'>{mapTitlesStep1[key]}</Text>
                          </Td>
                          <Td pl={3} pr={{ base: 5, sm: 7, md: 5 }}>
                            {info}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              
              </Box>
              <Box>
              <Heading p={2} as='h5' size='md'>
                Thông tin bước 1
              </Heading>
              <TableContainer>
                <Table variant='simple' colorScheme={'gray'}>
                  <Tbody>
                    {_.map(step1, (info, key) => {
                      return (
                        <Tr>
                          <Td pr={0} pl={{ base: 2, sm: 2, md: 2 }}>
                            <Text as='b'>{mapTitlesStep1[key]}</Text>
                          </Td>
                          <Td pl={3} pr={{ base: 5, sm: 7, md: 5 }}>
                            {info}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              
              </Box>
              <Box>
              <Heading p={2} as='h5' size='md'>
                Thông tin bước 1
              </Heading>
              <TableContainer>
                <Table variant='simple' colorScheme={'gray'}>
                  <Tbody>
                    {_.map(step1, (info, key) => {
                      return (
                        <Tr>
                          <Td pr={0} pl={{ base: 2, sm: 2, md: 2 }}>
                            <Text as='b'>{mapTitlesStep1[key]}</Text>
                          </Td>
                          <Td pl={3} pr={{ base: 5, sm: 7, md: 5 }}>
                            {info}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              
              </Box>
              <Box>
              <Heading p={2} as='h5' size='md'>
                Thông tin bước 1
              </Heading>
              <TableContainer>
                <Table variant='simple' colorScheme={'gray'}>
                  <Tbody>
                    {_.map(step1, (info, key) => {
                      return (
                        <Tr>
                          <Td pr={0} pl={{ base: 2, sm: 2, md: 2 }}>
                            <Text as='b'>{mapTitlesStep1[key]}</Text>
                          </Td>
                          <Td pl={3} pr={{ base: 5, sm: 7, md: 5 }}>
                            {info}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              
              </Box>
              <Stack spacing='30px' p={5}>
              <SkeletonCircle
                size='16'
                alignItems='center'
              >
                <Avatar src={'sdsdsd'} />
              </SkeletonCircle>
              <VStack alignItems='start'>
                <Skeleton
                  justifyItems='center'

                  height={8}
                  minWidth={32}
                >
                  <Text color={primaryColor} fontWeight='bold'>
                     Phạm Văn Duy
                  </Text>
                </Skeleton>
                <Skeleton
                  height={8}
                  minWidth={40}
                >
                  <Text>sdsds dsdsdsd</Text>
                </Skeleton>
              </VStack>
              </Stack>
            </Box>
          </GridItem>



      </Stack>
      <Box mt={10}>
        <Stack spacing={4}></Stack>
        <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
          <Button colorScheme='gray' flexGrow={1} fontFamily={'heading'} onClick={previousStep}>
            Trở về
          </Button>
          <Button flexGrow={1} fontFamily={'heading'} onClick={handleRegister}>
            Đăng ký
          </Button>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Step5;
