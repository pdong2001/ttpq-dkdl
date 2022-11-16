import {
  Stack,
  Heading,
  Button,
  Box,
  Text,
  Radio,
  SimpleGrid,
  VisuallyHidden,
  // VisuallyHiddenInput,
} from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import Select from '~/components/Form/CustomSelect';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import useAxios from '~/hooks/useAxios';
import API from '~/apis/constants';
import { formatUrl } from '~/utils/functions';
import { useEffect, useState } from 'react';
import { fillForm } from '../../../slices/register';
import step3Schema from '../validationSchema/step3';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import DateTimePicker from '~/components/Form/DatePicker';

const Step3 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
  const { register } = useAppSelector((state) => state.register.data);
  const {
    moveType: moveTypeInStore = MoveType.HCM,
    startAddressId: startAddressIdInStore = '',
    startTimeId = '',
    leaveTimeId: leaveTimeIdInStore = '',
    startPlaneCode = '',
    returnPlaneCode = '',
    otherLeaveTime = '',
    otherStartTime = '',
    otherStartAddress = '',
  } = register;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      moveType: moveTypeInStore,

      startAddressId: startAddressIdInStore,
      startTimeId,
      leaveAddress: '2',
      leaveTimeId: leaveTimeIdInStore,

      otherStartAddress,
      otherStartTime,
      otherLeaveTime,
      startPlaneCode,
      returnPlaneCode,
    },
    validationSchema: step3Schema,
    onSubmit: (values) => {
      if (moveType != MoveType.HCM) {
        values.startAddressId = '';
        values.startTimeId = '';
        values.leaveAddress = '';
        values.leaveTimeId = '';
        if (moveType == MoveType.BY_YOUR_SELF) {
          values.startPlaneCode = '';
          values.returnPlaneCode = '';
        }
      } else {
        values.otherStartAddress = '';
        values.otherStartTime = '';
        values.otherLeaveTime = '';
        values.startPlaneCode = '';
        values.returnPlaneCode = '';
      }
      dispatch(
        fillForm({
          register: { ...register, ...values },
        }),
      );
      nextStep();
    },
  });

  const { moveType } = formik.values;
  let { data: registerPage } = useAppSelector((state) => state.registerPage);

  // địa điểm xuất phát
  const { data: startAddressList } = useAxios(
    {
      method: 'get',
      url: formatUrl(API.GET_START_ADDRESS_BY_EVENT, { id: 1 }),
      transformResponse: ({ data }) => data,
    },
    [],
  );

  const HCMAddressList = startAddressList?.filter((item) => item.provinceId === 1);

  // thời gian khởi hành theo địa điểm xuất phát
  const [HCMStartTimes, setHCMStartTimes] = useState([]);
  const { startAddressId } = formik.values;
  useEffect(() => {
    const address = HCMAddressList?.find((item) => item.id == startAddressId);

    if (address) {
      setHCMStartTimes(address.times);
    }
  }, [startAddressId, HCMAddressList]);

  // địa điểm trở về
  const { data: leaveAddressList } = useAxios(
    {
      method: 'get',
      url: formatUrl(API.GET_LEAVE_ADDRESS_BY_EVENT, { id: 1 }),
      transformResponse: ({ data }) => data,
    },
    [],
  );

  const [leaveTimes, setLeaveTimes] = useState([]);
  const { leaveAddress } = formik.values;

  useEffect(() => {
    const address = leaveAddressList?.find((item) => item.id == leaveAddress);
    if (address) {
      setLeaveTimes(address.times);
    }
  }, [leaveAddressList]);

  useEffect(() => {
    formik.setTouched({});
  }, [moveType]);

  console.log('formiks', formik.values);

  return (
    <>
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Lịch trình
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <Radios isRequired label='Hình thức di chuyển' name='moveType'>
                {registerPage?.ctnId == 0 && <Radio value={MoveType.HCM}>Đi cùng CTN HCM</Radio>}
                <Radio value={MoveType.BY_YOUR_SELF}>Tự túc</Radio>
                <Radio value={MoveType.OTHER}>Đi từ tỉnh khác</Radio>
              </Radios>
              {moveType == MoveType.HCM && (
                // HCM
                <>
                  <Select
                    name='startAddressId'
                    data={HCMAddressList}
                    label='Nơi xuất phát'
                    placeholder='Nơi xuất phát'
                    isRequired
                  />
                  <Select
                    name='startTimeId'
                    data={HCMStartTimes}
                    label='Thời gian khởi hành'
                    placeholder='Thời gian khởi hành'
                    isRequired
                  />
                  <VisuallyHidden>
                    <Select
                      name='leaveAddress'
                      data={leaveAddressList}
                      label='Địa điểm trở về'
                      placeholder='Địa điểm trở về'
                      isRequired
                    />
                  </VisuallyHidden>
                  <Select
                    name='leaveTimeId'
                    data={leaveTimes}
                    label='Thời gian trở về'
                    placeholder='Thời gian trở về'
                    isRequired
                  />
                </>
              )}
              {moveType !== MoveType.HCM && (
                // tỉnh khác and tự túc
                <>
                  <FloatingLabel
                    name='otherStartAddress'
                    label='Nơi xuất phát'
                    color={formTextColor}
                    isRequired
                  />
                  <DateTimePicker name='otherStartTime' label='Ngày giờ đi' isRequired />
                  {moveType === MoveType.OTHER && (
                    <FloatingLabel
                      name='startPlaneCode'
                      label='Mã chuyến bay - Giờ bay đi'
                      color={formTextColor}
                    />
                  )}
                  <DateTimePicker name='otherLeaveTime' label='Ngày giờ về' isRequired />
                  {moveType === MoveType.OTHER && (
                    <FloatingLabel
                      name='returnPlaneCode'
                      label='Mã chuyến bay - Giờ bay về'
                      color={formTextColor}
                    />
                  )}
                </>
              )}
            </Stack>
            <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
              <Button colorScheme='gray' flexGrow={1} fontFamily={'heading'} onClick={previousStep}>
                Trở về
              </Button>
              <Button flexGrow={1} type='submit' fontFamily={'heading'}>
                Tiếp theo
              </Button>
            </SimpleGrid>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
};

export default Step3;
