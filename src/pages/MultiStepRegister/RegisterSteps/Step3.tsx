import {
  Stack,
  Heading,
  Button,
  Box,
  Text,
  Radio,
  SimpleGrid,
  // VisuallyHiddenInput,
} from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import Select from '~/components/Form/CustomSelect';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import { DepartureType } from '~/pages/MultiStepRegister/constants';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import { useAppSelector } from '~/hooks/reduxHook';
import useAxios from '~/hooks/useAxios';
import API from '~/apis/constants';
import { formatUrl } from '~/utils/functions';
import { useEffect, useState } from 'react';

// nơi xuất phát
// const departLocationList = [
//   { id: 1, name: 'Bến xe buýt Trường Đại học Nông Lâm', maTinh: 'HoChiMinh' },
//   {
//     id: 2,
//     name: 'Cầu Bùi Đình Túy, số 47 Bùi Đình Túy, P.24, Q. Bình Thạnh, Tp.HCM',
//     maTinh: 'HoChiMinh',
//   },
//   {
//     id: 3,
//     name: 'ĐH Tôn Đức Thắng, Quận 7',
//     maTinh: 'HoChiMinh',
//   },
// ];

// thời điểm khởi hành
// const timeToStartList = [
//   { id: 1, name: 'Đợt 1: 19h45 Thứ hai, ngày 08/08/2022' },
//   { id: 2, name: 'Đợt 2: 19h45 Thứ ba, ngày 09/08/2022 (Đợt chính thức)' },
//   { id: 3, name: 'Đợt 3: 06h00 Thứ tư, ngày 10/08/2022' },
// ];

// // thời điểm về lại nơi xuất phát
// const timeToReturnList = [
//   { id: 1, name: 'Đợt 1: 18h00 Thứ sáu, ngày 12/08/2022' },
//   { id: 2, name: 'Đợt 2: 18h00 Chủ nhật, ngày 14/08/2022' },
//   { id: 3, name: 'Đợt 3: 18h00 Thứ 2, ngày 15/08/2022' },
// ];

// danh sách tỉnh
// const provinceList = [
//   { id: 0, name: 'Ho Chi Minh' },
//   { id: 1, name: 'Ha Noi' },
//   { id: 2, name: 'Can Tho' },
//   { id: 3, name: 'Binh Duong' },
// ];

// register page
const registerPageTemp = {
  id: 'string',
  type: 0,
  pageContentId: 0,
  pageContent: {},
  ctnId: 0,
  start: '2022-11-10T04:56:04.526Z',
  end: '2022-11-10T04:56:04.526Z',
  name: 'string',
  event: {},
  eventId: 0,
};

const Step3 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      moveType: '0',

      startAddress: '',
      startTimeId: '',
      leaveAddress: '2',
      leaveTimeId: '',

      otherStartAddress: '',
      otherStartTime: '',
      startPlaneCode: '',
      otherLeaveTime: '',
      returnPlaneCode: '',
    },
    validationSchema: Yup.object({
      moveType: Yup.string().nullable().required(),
      // HCM
      startAddress: Yup.string()
        .nullable()
        .when('moveType', {
          is: '0',
          then: Yup.string().required('Xin hãy chọn nơi xuất phát HCM'),
          otherwise: Yup.string().notRequired(),
        }),
      startTimeId: Yup.string()
        .nullable()
        .when('moveType', {
          is: '0',
          then: Yup.string().required('Xin hãy chọn ngày giờ đi HCM'),
          otherwise: Yup.string().notRequired(),
        }),
      leaveTimeId: Yup.string()
        .nullable()
        .when('moveType', {
          is: '0',
          then: Yup.string().required('Xin hãy chọn ngày giờ về HCM'),
          otherwise: Yup.string().notRequired(),
        }),

      // Tỉnh khác / Tự túc
      otherStartAddress: Yup.string()
        .nullable()
        .when('moveType', {
          is: '1' || '2',
          then: Yup.string().required('Xin hãy chọn nơi xuất phát TinhKhac / Tự túc'),
          otherwise: Yup.string().notRequired(),
        }),
      otherStartTime: Yup.string()
        .nullable()
        .when('moveType', {
          is: '1' || '2',
          then: Yup.string().required('Xin hãy chọn ngày giờ đi TinhKhac / Tự túc'),
          otherwise: Yup.string().notRequired(),
        }),
      otherLeaveTime: Yup.string()
        .nullable()
        .when('moveType', {
          is: '1' || '2',
          then: Yup.string().required('Xin hãy chọn ngày giờ về TinhKhac / Tự túc'),
          otherwise: Yup.string().notRequired(),
        }),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      if (false) {
        nextStep();
      }
    },
  });

  const { moveType } = formik.values;
  let { data: registerPage } = useAppSelector((state) => state.registerPage);

  // fake data, khi nào gọi được api sẽ xóa start
  registerPage = { ...registerPageTemp };
  console.log('register page', registerPage);
  // fake data, khi nào gọi được api sẽ xóa end

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
  const OtherAddressList = startAddressList?.filter((item) => item.provinceId !== 1);

  // thời gian khởi hành theo địa điểm xuất phát
  const [HCMStartTimes, setHCMStartTimes] = useState([]);
  const { startAddress } = formik.values;
  useEffect(() => {
    const address = HCMAddressList?.find((item) => item.id == startAddress);
    if (address) {
      setHCMStartTimes(address.times);
    }
  }, [startAddress]);

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
  const { leaveAddress, leaveTimeId } = formik.values;
  console.log('leaveAddress', leaveAddress, leaveTimeId);

  useEffect(() => {
    const address = leaveAddressList?.find((item) => item.id == leaveAddress);
    if (address) {
      setLeaveTimes(address.times);
    }
  }, [leaveAddress]);

  useEffect(() => {
    if (moveType == DepartureType.HCM || moveType == DepartureType.TU_TUC) {
      formik.setFieldValue('otherStartAddress', '');
      formik.setFieldValue('otherStartTime', '');
      formik.setFieldValue('startPlaneCode', '');
      formik.setFieldValue('otherLeaveTime', '');
      formik.setFieldValue('returnPlaneCode', '');
    } else if (moveType == DepartureType.TINH_KHAC) {
      formik.setFieldValue('startAddress', '');
      formik.setFieldValue('startTimeId', '');
      formik.setFieldValue('leaveAddress', '');
      formik.setFieldValue('leaveTimeId', '');
    }
  }, [moveType]);

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
                {registerPage?.ctnId == 0 && <Radio value='0'>Đi cùng CTN HCM</Radio>}
                <Radio value='1'>Đi từ tỉnh khác</Radio>
                <Radio value='2'>Tự túc</Radio>
              </Radios>
              {moveType == DepartureType.HCM ? (
                // HCM
                <>
                  <Select
                    name='startAddress'
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
                  <Select
                    name='leaveAddress'
                    data={leaveAddressList}
                    label='Địa điểm trở về'
                    placeholder='Địa điểm trở về'
                    isRequired
                  />
                  <Select
                    name='leaveTimeId'
                    data={leaveTimes}
                    label='Thời gian trở về'
                    placeholder='Thời gian trở về'
                    isRequired
                  />
                </>
              ) : moveType == DepartureType.TINH_KHAC ? (
                // tỉnh khác
                <>
                  <Select
                    name='otherStartAddress'
                    data={OtherAddressList}
                    label='Nơi xuất phát'
                    placeholder='Chọn tỉnh/thành phố'
                    isRequired
                  />
                  <FloatingLabel
                    name='otherStartTime'
                    label='Chọn ngày giờ đi'
                    color={formTextColor}
                    type='datetime-local'
                    isRequired
                  />

                  <FloatingLabel
                    name='startPlaneCode'
                    label='Mã chuyến bay - Giờ bay đi'
                    color={formTextColor}
                  />
                  <FloatingLabel
                    name='otherLeaveTime'
                    label='Chọn ngày giờ về'
                    color={formTextColor}
                    type='datetime-local'
                    isRequired
                  />
                  <FloatingLabel
                    name='returnPlaneCode'
                    label='Mã chuyến bay - Giờ bay về'
                    color={formTextColor}
                  />
                </>
              ) : (
                // tự túc
                <>
                  <Select
                    name='otherStartAddress'
                    data={OtherAddressList}
                    label='Nơi xuất phát'
                    placeholder='Chọn tỉnh/thành phố'
                    isRequired
                  />
                  <FloatingLabel
                    name='otherStartTime'
                    label='Chọn ngày giờ đi'
                    color={formTextColor}
                    type='datetime-local'
                    isRequired
                  />
                  <FloatingLabel
                    name='otherLeaveTime'
                    label='Chọn ngày giờ về'
                    color={formTextColor}
                    type='datetime-local'
                    isRequired
                  />
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
