import { Box, Button, ButtonGroup, Heading, Radio, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import * as Yup from 'yup';
import Select from '~/components/Form/CustomSelect';
import Address from '~/components/Form/Address';
import Radios from '~/components/Form/Radios';
import DateOfBirth from '~/components/Form/DateOfBirth';
import Validator from '~/utils/common/validator';
import { REGEX_YEAR_MONTH_DAY } from '~/utils/common';
import { fillForm } from '~/pages/MultiStepRegister/services/slice';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { RegisterType } from '~/pages/MultiStepRegister/constants';
// import { UpSertMemberDto } from '~/types/Members/UpSertMember.dto';

// nơi sinh hoạt
const youthAssociationList = [
  {
    id: 1,
    ten: 'CTN Hà Nội',
    ParentId: 0,
    Status: 1,
    Sort: 0,
    Type: 2,
    ProvinceId: 2,
    DistrictIds: null,
    PerDelId: 0,
    DeleteReason: null,
  },
  {
    id: 2,
    ten: 'Tổ 1',
    ParentId: 1398,
    Status: 1,
    Sort: 0,
    Type: 1,
    ProvinceId: 2,
    DistrictIds: '1,4',
    PerDelId: 0,
    DeleteReason: null,
  },
];
// tổ
const groupOfYouthAssociationList = [
  {
    id: 1,
    ten: 'CTN Hà Nội',
    ParentId: 0,
    Status: 1,
    Sort: 0,
    Type: 2,
    ProvinceId: 2,
    DistrictIds: null,
    PerDelId: 0,
    DeleteReason: null,
  },
  {
    id: 1403,
    ten: 'Thứ 2 Chùa Đồng',
    ParentId: 1,
    Status: 1,
    Sort: 20,
    Type: 1,
    ProvinceId: 0,
    DistrictIds: null,
    PerDelId: 0,
    DeleteReason: null,
  },
];

const Step2 = (props: StepProps) => {
  const dispatch = useAppDispatch();
  const { hoTen, hinhThucDangKy, soDienThoai, cccd } =
    useAppSelector((state) => state.register.data) || {};
  const { nextStep, previousStep } = props;
  const { bgColor, primaryColor, formTextColor } = useCustomColorMode();

  const formik = useFormik({
    initialValues: {
      dangKyDaiLe: {
        roleInGroup: 2,
      },
      // citizenIdOfLeader: '', //chưa có trong DTO
      phapDanh: '',
      ngaySinh: '',
      // dateOfBirthDay: '',
      // dateOfBirthMonth: '',
      // dateOfBirthYear: '',
      email: '',
      permanentAddress: {},
      permanentAddressProvince: '',
      permanentAddressDistrict: '',
      permanentAddressVillage: '',
      temporaryAddressProvince: '',
      temporaryAddressDistrict: '',
      temporaryAddressVillage: '',
      youthAssociation: '',
      groupOfYouthAssociation: '',
    },
    validationSchema: Yup.object({
      citizenIdOfLeader: Yup.string().required('Xin hãy nhập CCCD / Hộ chiếu của trưởng nhóm'),
      ngaySinh: Yup.object()
        .shape({
          day: Yup.string(),
          month: Yup.string(),
          year: Yup.string(),
        })
        .test({
          name: 'validDOB',
          test: (value, context) => {
            const { year, month, day } = value;

            if (!(year || month || day)) {
              return context.createError({ message: 'Bạn ơi, nhập ngày sinh nha' });
            }
            const isValidDateFormat = REGEX_YEAR_MONTH_DAY.test([year, month, day].join('-'));
            const isValidDateFollowCalender = Validator.validateCalenderDate(value);
            return (
              (isValidDateFormat && isValidDateFollowCalender) ||
              context.createError({ message: 'Bạn ơi, Ngày không hợp lệ rồi' })
            );
          },
        }),
      dateOfBirthDay: Yup.string().required(),
      dateOfBirthMonth: Yup.string().required(),
      dateOfBirthYear: Yup.string().required(),
      email: Yup.string().email('Email không hợp lệ').required('Xin hãy nhập email'),
      permanentAddress: Yup.object()
        .shape({
          province: Yup.number(),
          district: Yup.number(),
          village: Yup.number(),
        })
        .test({
          name: 'valiAddress',
          test: (value, context) => {
            const { province, district, village } = value;
            if (!(province && district && village)) {
              return context.createError({ message: 'Bạn ơi, nhập đủ địa chỉ nha' });
            }
            return true;
          },
        }),
      temporaryAddress: Yup.object()
        .shape({
          province: Yup.number(),
          district: Yup.number(),
          village: Yup.number(),
        })
        .test({
          name: 'valiAddress',
          test: (value, context) => {
            const { province, district, village } = value;
            console.log(province, district, village);

            if (!(province && district && village)) {
              return context.createError({ message: 'Bạn ơi, nhập đủ địa chỉ nha' });
            }
            return true;
          },
        }),
      permanentAddressProvince: Yup.string().required(),
      permanentAddressDistrict: Yup.string().required(),
      permanentAddressVillage: Yup.string().required(),
      temporaryAddressProvince: Yup.string().required(),
      temporaryAddressDistrict: Yup.string().required(),
      temporaryAddressVillage: Yup.string().required(),
      youthAssociation: Yup.string().required('Xin hãy chọn nơi sinh hoạt'),
    }),
    onSubmit: (values) => {
      dispatch(fillForm(values));
      nextStep();
    },
  });

  return (
    <Stack
      bg={bgColor}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
      mx={{ base: 10, md: 20 }}
    >
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Cập nhật thông tin
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          Xin chào bạn <Text as='b'>{hoTen}</Text>
        </Text>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          {`SĐT: ${soDienThoai} - CCCD: ${cccd}`}
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              {hinhThucDangKy === RegisterType.GROUP.toString() && (
                <>
                  {' '}
                  <Radios isRequired label='Vai trò trong nhóm' name='roleInGroup'>
                    <Radio value='0'>Trưởng nhóm</Radio>
                    <Radio value='1'>Phó nhóm</Radio>
                    <Radio value='2'>Thành viên</Radio>
                  </Radios>
                  <FloatingLabel
                    name='citizenIdOfLeader'
                    label='Số CCCD / Hộ chiếu của trưởng nhóm'
                    color={formTextColor}
                    isRequired
                  />
                </>
              )}
              <FloatingLabel name='phapDanh' label='Pháp danh' color={formTextColor} />
              <Radios label='Giới tính' name='gender' defaultValue='0' isRequired>
                <Radio value='0'>Nam</Radio>
                <Radio value='1'>Nữ</Radio>
              </Radios>
              <DateOfBirth name='ngaySinh' label='Ngày sinh' isRequired />

              {/*<FloatingLabel name='dob' label='Ngày sinh' color={formTextColor} isRequired />*/}
              <FloatingLabel name='email' label='Email' color={formTextColor} isRequired />
              <Address name='permanentAddressCode' label='Địa chỉ thường trú' isRequired />
              <Address name='temporaryAddress' label='Địa chỉ tạm trú' isRequired />
              <Select
                name='youthAssociation'
                data={youthAssociationList}
                label='Nơi sinh hoạt'
                placeholder='Nơi sinh hoạt'
                isRequired
              />
              <Select
                name='groupOfYouthAssociation'
                data={groupOfYouthAssociationList}
                label='Tổ'
                placeholder='Tổ'
              />
            </Stack>
            <ButtonGroup mt={8} w={'full'}>
              <Button colorScheme='gray' flexGrow={1} fontFamily={'heading'} onClick={previousStep}>
                Trở về
              </Button>
              <Button flexGrow={1} type='submit' fontFamily={'heading'}>
                Tiếp theo
              </Button>
            </ButtonGroup>
          </Form>
        </FormikProvider>
      </Box>
    </Stack>
  );
};

export default Step2;
