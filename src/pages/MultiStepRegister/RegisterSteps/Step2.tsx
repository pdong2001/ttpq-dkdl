import { Box, Button, Heading, Radio, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import Radios from '~/components/Form/Radios';
import DateOfBirth from '~/components/Form/DateOfBirth';
import { fillForm } from '~/pages/MultiStepRegister/services/slice';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import FormInput from '~/components/Form/FormInput';
import CultivationPlace from '~/components/Form/CultivationPlace';
import { Gender } from '~/dtos/Enums/Gender.enum';
import { convertDateStringToObject } from '~/utils/date';
import Address from '~/components/Form/Address';
import step2Schema from '../validationSchema/step2';

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

    permanentAddress = { provinceId: '', districtId: '', wardId: '' },
    temporaryAddress = { provinceId: '', districtId: '', wardId: '' },

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
    validationSchema: step2Schema,
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

  // console.log('formiks', formik.errors, formik.values);

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
                  <Radios spacing={8} label='Giới tính' name='gender'>
                    <Radio value={Gender.MALE}>Nam</Radio>
                    <Radio value={Gender.FEMALE}>Nữ</Radio>
                  </Radios>
                  <FormInput name='religiousName' label='Pháp danh' color={formTextColor} />
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
