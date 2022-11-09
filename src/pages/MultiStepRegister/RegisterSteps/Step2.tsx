import { Box, Button, Heading, Radio, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import * as Yup from 'yup';
import Address from '~/components/Form/Address';
import Radios from '~/components/Form/Radios';
import DateOfBirth from '~/components/Form/DateOfBirth';
import Validator from '~/utils/common/validator';
import { REGEX_YEAR_MONTH_DAY } from '~/utils/common';
import { fillForm } from '~/pages/MultiStepRegister/services/slice';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { RegisterType } from '~/pages/MultiStepRegister/constants';
import { convertDateStringToObject } from '~/utils/date';
import FormInput from '~/components/Form/FormInput';
import CultivationPlace from '~/components/Form/CultivationPlace';
// import { UpSertMemberDto } from '~/types/Members/UpSertMember.dto';

// // nơi sinh hoạt
// const youthAssociationList = [
//   {
//     id: 1,
//     ten: 'CTN Hà Nội',
//     ParentId: 0,
//     Status: 1,
//     Sort: 0,
//     Type: 2,
//     ProvinceId: 2,
//     DistrictIds: null,
//     PerDelId: 0,
//     DeleteReason: null,
//   },
//   {
//     id: 2,
//     ten: 'Tổ 1',
//     ParentId: 1398,
//     Status: 1,
//     Sort: 0,
//     Type: 1,
//     ProvinceId: 2,
//     DistrictIds: '1,4',
//     PerDelId: 0,
//     DeleteReason: null,
//   },
// ];
// // tổ
// const groupOfYouthAssociationList = [
//   {
//     id: 1,
//     ten: 'CTN Hà Nội',
//     ParentId: 0,
//     Status: 1,
//     Sort: 0,
//     Type: 2,
//     ProvinceId: 2,
//     DistrictIds: null,
//     PerDelId: 0,
//     DeleteReason: null,
//   },
//   {
//     id: 1403,
//     ten: 'Thứ 2 Chùa Đồng',
//     ParentId: 1,
//     Status: 1,
//     Sort: 20,
//     Type: 1,
//     ProvinceId: 0,
//     DistrictIds: null,
//     PerDelId: 0,
//     DeleteReason: null,
//   },
// ];

const Step2 = (props: StepProps) => {
  const dispatch = useAppDispatch();
  const {
    hoTen,
    hinhThucDangKy,
    soDienThoai,
    cccd,
    phapDanh = '',
    ngaySinh,
  } = useAppSelector((state) => state.register.data) || {};
  const {
    // day: ngaySinhDay = '',
    month: ngaySinhMonth = '',
    year: ngaySinhYear = '',
  } = ngaySinh ? convertDateStringToObject(ngaySinh) || {} : {};

  const { nextStep, previousStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const isRegisterFollowGroup = hinhThucDangKy === RegisterType.GROUP.toString();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dangKyDaiLe: {
        roleInGroup: 2,
      },
      citizenIdOfLeader: '', //chưa có trong DTO
      phapDanh,
      ngaySinh: '',
      ngaySinhDay: undefined,
      ngaySinhMonth,
      ngaySinhYear,
      email: '',
      permanentAddressCodeProvince: '',
      permanentAddressCodeDistrict: '',
      permanentAddressCodeVillage: '',
      temporaryAddressProvince: '',
      temporaryAddressDistrict: '',
      temporaryAddressVillage: '',
      youthAssociation: '',
      groupOfYouthAssociation: '',
      youthAssociationGroup: '',
    },
    validationSchema: Yup.object({
      citizenIdOfLeader: isRegisterFollowGroup
        ? Yup.string().required('Xin hãy nhập CCCD / Hộ chiếu của trưởng nhóm')
        : Yup.string(),
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
      // ngaySinhDay: Yup.string().required(),
      ngaySinhMonth: Yup.string().required(),
      ngaySinhYear: Yup.string().required(),
      email: Yup.string().email('Email không hợp lệ').required('Xin hãy nhập email'),
      permanentAddressCode: Yup.object()
        .shape({
          province: Yup.number(),
          district: Yup.number(),
          village: Yup.number(),
        })
        .test({
          name: 'valiAddress1',
          test: (value, context) => {
            const { province, district, village } = value;
            console.log('address', province, district, village);

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
          name: 'valiAddress2',
          test: (value, context) => {
            const { province, district, village } = value;
            console.log(province, district, village);

            if (!(province && district && village)) {
              return context.createError({ message: 'Bạn ơi, nhập đủ địa chỉ nha' });
            }
            return true;
          },
        }),
      permanentAddressCodeProvince: Yup.string().required(),
      permanentAddressCodeDistrict: Yup.string().required(),
      permanentAddressCodeVillage: Yup.string().required(),
      temporaryAddressProvince: Yup.string().required(),
      temporaryAddressDistrict: Yup.string().required(),
      temporaryAddressVillage: Yup.string().required(),
      youthAssociation: Yup.object().shape({
        groupId: Yup.string(),
        teamId: Yup.string().required('Xin hãy chọn nơi sinh hoạt'),
      }),
      youthAssociationTeam: Yup.string().required(),
      youthAssociationGroup: Yup.string().required(),
    }),
    onSubmit: (values) => {
      dispatch(fillForm(values));
      nextStep();
    },
  });

  console.log('formiks', formik.values, formik.errors);
  console.log('CTN', formik.values.youthAssociation);

  return (
    <>
      <Stack spacing={4} mb={{ base: 2, lg: 4 }}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          textAlign='center'
        >
          Cập nhật thông tin
        </Heading>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            Xin chào bạn <Text as='b'>{hoTen}</Text>
          </Text>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            {`SĐT: ${soDienThoai} - CCCD: ${cccd}`}
          </Text>
        </Stack>
      </Stack>
      <Box mt={{ base: 3, lg: 10 }}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              {isRegisterFollowGroup && (
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
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 2, lg: 8 }}>
                <Stack spacing={3}>
                  <Radios spacing={8} label='Giới tính' name='gender' defaultValue='0' isRequired>
                    <Radio value='0'>Nam</Radio>
                    <Radio value='1'>Nữ</Radio>
                  </Radios>
                  <FormInput name='phapDanh' label='Pháp danh' color={formTextColor} />
                  <DateOfBirth name='ngaySinh' label='Ngày sinh' isRequired />

                  <FormInput name='email' label='Email' color={formTextColor} isRequired />
                </Stack>
                <Stack spacing={3}>
                  <Address name='permanentAddressCode' label='Địa chỉ thường trú' isRequired />
                  <Address name='temporaryAddress' label='Địa chỉ tạm trú' isRequired />
                  <CultivationPlace name='youthAssociation' label='Địa điểm tu tập' isRequired />
                </Stack>
              </SimpleGrid>
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

export default Step2;
