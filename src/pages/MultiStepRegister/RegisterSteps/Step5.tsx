import { Stack, Heading, Button, Box, Text, SimpleGrid, Avatar, GridItem, Tag, AlertIcon, Alert } from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import _ from 'lodash';
import { StepProps } from '..';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { register } from '../../../slices/register';
import { unwrapResult } from '@reduxjs/toolkit';
import { TableComponent, LeaderComponent } from '~/components/Register';
import { mapSuccessData } from '~/components/Register/bindingData';
import { mapTitlesRegister } from '~/configs/register';
import { CalendarIcon, HamburgerIcon } from '@chakra-ui/icons';

const Step5 = (props: StepProps) => {
  const { previousStep, nextStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.register.data);
  const previewInfo = useAppSelector((state) => state.previewInfo.data);

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
  const { infos, schedules, jobs, avatar, fullName } = mapSuccessData(previewInfo);
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
              {fullName}
            </Heading>
            <Box>
              {TableComponent(infos, mapTitlesRegister)}
            </Box>
            <Box>
              <Alert status='success'>
                <CalendarIcon />
                <Heading p={2} as='h5' size='md'>Lịch trình di chuyển</Heading>
              </Alert>
              {TableComponent(_.get(schedules, _.get(previewInfo, 'moveType', 0)), mapTitlesRegister)}
            </Box>
            <Box>
              <Alert status='warning'>
                <HamburgerIcon />
                <Heading p={2} as='h5' size='md'>Công việc</Heading>
              </Alert>
              {TableComponent(jobs, mapTitlesRegister)}
            </Box>
            {_.get(previewInfo, 'leader', null) && LeaderComponent(_.get(previewInfo, 'leader'))}
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
