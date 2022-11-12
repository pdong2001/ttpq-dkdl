import { Stack, Heading, Button, Box, Text, Radio, SimpleGrid } from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import Select from '~/components/Form/CustomSelect';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import { DepartureType } from '~/pages/MultiStepRegister/constants';
import { useState } from 'react';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';

// nơi xuất phát
const departLocationList = [
  { id: 1, name: 'Bến xe buýt Trường Đại học Nông Lâm', maTinh: 'HoChiMinh' },
  {
    id: 2,
    name: 'Cầu Bùi Đình Túy, số 47 Bùi Đình Túy, P.24, Q. Bình Thạnh, Tp.HCM',
    maTinh: 'HoChiMinh',
  },
  {
    id: 3,
    name: 'ĐH Tôn Đức Thắng, Quận 7',
    maTinh: 'HoChiMinh',
  },
];

// thời điểm khởi hành
const timeToStartList = [
  { id: 1, name: 'Đợt 1: 19h45 Thứ hai, ngày 08/08/2022' },
  { id: 2, name: 'Đợt 2: 19h45 Thứ ba, ngày 09/08/2022 (Đợt chính thức)' },
  { id: 3, name: 'Đợt 3: 06h00 Thứ tư, ngày 10/08/2022' },
];

// thời điểm về lại nơi xuất phát
const timeToReturnList = [
  { id: 1, name: 'Đợt 1: 18h00 Thứ sáu, ngày 12/08/2022' },
  { id: 2, name: 'Đợt 2: 18h00 Chủ nhật, ngày 14/08/2022' },
  { id: 3, name: 'Đợt 3: 18h00 Thứ 2, ngày 15/08/2022' },
];

// danh sách tỉnh
const provinceList = [
  { id: 0, name: 'Ho Chi Minh' },
  { id: 1, name: 'Ha Noi' },
  { id: 2, name: 'Can Tho' },
  { id: 3, name: 'Binh Duong' },
];

const Step3 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const [moveType, setMoveType] = useState('0');

  const handleMoveType = (e) => {
    setMoveType(e.target.value);
  };

  const formik = useFormik({
    initialValues: {
      enableReinitialize: true,
      moveType: '0',
      startPlaneCode: '',
      startTimeId: '',
      leaveTimeId: '',

      departLocationTinhKhac: '',
      idThoiDiemVeChuaTinhKhac: '',
      idThoiDiemRoiChuaTinhKhac: '',

      departLocationTuTuc: '',
      idThoiDiemVeChuaTuTuc: '',
      idThoiDiemRoiChuaTuTuc: '',
      // } as UpSertMemberDto,
    },
    validationSchema: Yup.object({
      moveType: Yup.string().required(),
      // HCM
      startPlaneCode: Yup.string().when('hinhThucDiChuyen', {
        is: '0',
        then: Yup.string().required('Nơi đi HCM'),
        otherwise: Yup.string().notRequired(),
      }),
      startTimeId: Yup.string().when('hinhThucDiChuyen', {
        is: '0',
        then: Yup.string().required('TG đi HCM'),
        otherwise: Yup.string().notRequired(),
      }),
      leaveTimeId: Yup.string().when('hinhThucDiChuyen', {
        is: '0',
        then: Yup.string().required('TG về HCM'),
        otherwise: Yup.string().notRequired(),
      }),

      // Tỉnh khác
      departLocationTinhKhac: Yup.string().when('hinhThucDiChuyen', {
        is: '1',
        then: Yup.string().required('Nơi đi TinhKhac'),
        otherwise: Yup.string().notRequired(),
      }),
      idThoiDiemVeChuaTinhKhac: Yup.string().when('hinhThucDiChuyen', {
        is: '1',
        then: Yup.string().required('TG đi TinhKhac'),
        otherwise: Yup.string().notRequired(),
      }),
      idThoiDiemRoiChuaTinhKhac: Yup.string().when('hinhThucDiChuyen', {
        is: '1',
        then: Yup.string().required('TG về TinhKhac'),
        otherwise: Yup.string().notRequired(),
      }),

      // Tự túc
      departLocationTuTuc: Yup.string().when('hinhThucDiChuyen', {
        is: '2',
        then: Yup.string().required('Nơi đi TuTuc'),
        otherwise: Yup.string().notRequired(),
      }),
      idThoiDiemVeChuaTuTuc: Yup.string().when('hinhThucDiChuyen', {
        is: '2',
        then: Yup.string().required('TG đi TuTuc'),
        otherwise: Yup.string().notRequired(),
      }),
      idThoiDiemRoiChuaTuTuc: Yup.string().when('hinhThucDiChuyen', {
        is: '2',
        then: Yup.string().required('TG về TuTuc'),
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
              <Radios
                isRequired
                label='Hình thức di chuyển'
                name='moveType'
                onChange={handleMoveType}
              >
                <Radio value='0'>Đi cùng CTN HCM</Radio>
                <Radio value='1'>Đi từ tỉnh khác</Radio>
                <Radio value='2'>Tự túc</Radio>
              </Radios>
              {moveType == DepartureType.HCM.toString() ? (
                // HCM
                <>
                  <Select
                    name=''
                    data={departLocationList}
                    label='Nơi xuất phát'
                    placeholder='Nơi xuất phát'
                    isRequired
                  />
                  <Select
                    name='startTimeId'
                    data={timeToStartList}
                    label='Thời gian khởi hành'
                    placeholder='Thời gian khởi hành'
                    isRequired
                  />
                  <Select
                    name='leaveTimeId'
                    data={timeToReturnList}
                    label='Thời gian trở về'
                    placeholder='Thời gian trở về'
                    isRequired
                  />
                </>
              ) : moveType == DepartureType.TINH_KHAC.toString() ? (
                // tỉnh khác
                <>
                  <Select
                    name='otherStartAddress'
                    data={provinceList}
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
                    data={provinceList}
                    label='Nơi xuất phát'
                    placeholder='Chọn tỉnh/thành phố'
                    isRequired
                  />
                  <FloatingLabel
                    name='idThoiDiemVeChuaTuTuc'
                    label='Chọn ngày giờ đi'
                    color={formTextColor}
                    type='datetime-local'
                    isRequired
                  />
                  <FloatingLabel
                    name='idThoiDiemRoiChuaTuTuc'
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
