import { Box, Button, Heading, Input, Radio, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
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
import FormInput from '~/components/Form/FormInput';
import CultivationPlace from '~/components/Form/CultivationPlace';
import { Gender } from '~/dtos/Enums/Gender.enum';
import { convertDateStringToObject } from '~/utils/date';

const Step2 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const {
    fullName,
    phoneNumber,
    identityCard,
    religiousName = '',
    gender,
    email = '',

    permanentAddress = { provinceId: 0, districtId: 0, wardId: 0 },
    temporaryAddress = { provinceId: 0, districtId: 0, wardId: 0 },

    organizationStructureId = '',
    dateOfBirth,
  } = useAppSelector((state) => state.register.data) || {};

  const { date: dobDate, month: dobMonth, year: dobYear } = convertDateStringToObject(dateOfBirth);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      gender,

      religiousName,

      dob: { date: '', month: '', year: '' },
      dobDate,
      dobMonth,
      dobYear,

      email,

      permanentAddress,
      permanentAddressProvince: permanentAddress.provinceId,
      permanentAddressDistrict: permanentAddress.districtId,
      permanentAddressWard: permanentAddress.wardId,

      temporaryAddress,
      temporaryAddressProvince: temporaryAddress.provinceId,
      temporaryAddressDistrict: temporaryAddress.districtId,
      temporaryAddressWard: temporaryAddress.wardId,

      organizationStructureId,
    },
    validationSchema: Yup.object({
      dob: Yup.object()
        .shape({
          date: Yup.string(),
          month: Yup.string(),
          year: Yup.string(),
        })
        .test({
          name: 'validDOB',
          test: (value, context) => {
            const { year, month, date } = value;

            if (!(year || month || date)) {
              return context.createError({ message: 'Bạn ơi, nhập ngày sinh nha' });
            }
            const isValidDateFormat = REGEX_YEAR_MONTH_DAY.test([year, month, date].join('-'));
            const isValidDateFollowCalender = Validator.validateCalenderDate(value);
            return (
              (isValidDateFormat && isValidDateFollowCalender) ||
              context.createError({ message: 'Bạn ơi, Ngày không hợp lệ rồi' })
            );
          },
        }),
      dobDate: Yup.string().required(),
      dobMonth: Yup.string().required(),
      dobYear: Yup.string().required(),

      email: Yup.string().email('Email không hợp lệ').required('Xin hãy nhập email'),

      permanentAddress: Yup.object().shape({
        provinceId: Yup.number(),
        districtId: Yup.number(),
        wardId: Yup.number().required('Bạn ơi, nhập đủ địa chỉ nha'),
      }),
      permanentAddressProvince: Yup.string().required(),
      permanentAddressDistrict: Yup.string().required(),
      permanentAddressWard: Yup.string().required(),

      temporaryAddress: Yup.object().shape({
        provinceId: Yup.number(),
        districtId: Yup.number(),
        wardId: Yup.number().required('Bạn ơi, nhập đủ địa chỉ nha'),
      }),
      temporaryAddressProvince: Yup.string().required(),
      temporaryAddressDistrict: Yup.string().required(),
      temporaryAddressWard: Yup.string().required(),

      organizationStructureId: Yup.number().required('Xin hãy chọn nơi sinh hoạt'),
    }),
    onSubmit: (values) => {
      const {
        gender,
        religiousName,
        dob,
        email,
        permanentAddress,
        temporaryAddress,
        organizationStructureId,
      } = values;
      const { year, month, date } = dob || {};
      dispatch(
        fillForm({
          gender,
          religiousName,
          email,
          temporaryAddress,
          permanentAddress,
          organizationStructureId,
          dateOfBirth: new Date(+year, +month - 1, +date),
        }),
      );
      nextStep();
    },
  });

  console.log('formiks', formik.errors, formik.values);

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
            Xin chào bạn <Text as='b'>{fullName}</Text>
          </Text>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            {`SĐT: ${phoneNumber} - CCCD: ${identityCard}`}
          </Text>
        </Stack>
      </Stack>
      <Box mt={{ base: 3, lg: 10 }}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 2, lg: 8 }}>
                <Stack spacing={3}>
                  <Radios spacing={8} label='Giới tính' name='gender' isRequired>
                    <Radio value={Gender.MALE}>Nam</Radio>
                    <Radio value={Gender.FEMALE}>Nữ</Radio>
                  </Radios>
                  <FormInput name='religiousName' label='Pháp danh' color={formTextColor} />
                  <Input type='date' name='dateOfBirth' />
                  <DateOfBirth name='dob' label='Ngày sinh' isRequired />
                  <FormInput name='email' label='Email' color={formTextColor} isRequired />
                </Stack>
                <Stack spacing={3}>
                  <Address name='permanentAddress' label='Địa chỉ thường trú' isRequired />
                  <Address name='temporaryAddress' label='Địa chỉ tạm trú' isRequired />
                  <CultivationPlace
                    name='organizationStructureId'
                    label='Địa điểm tu tập'
                    isRequired
                  />
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
