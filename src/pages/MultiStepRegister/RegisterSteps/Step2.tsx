import { Box, Button, Heading, Radio, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import Radios from '~/components/Form/Radios';
import DateOfBirth from '~/components/Form/DateOfBirth';
import { fillForm } from '~/slices/register';
import { fillDataPreview } from '~/slices/previewInfo';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { convertDateStringToObject } from '~/utils/date';
import Address from '~/components/Form/Address';
import step2Schema from '../validationSchema/step2';
import { Gender } from '~/dtos/Enums/Gender.enum';
import CultivationPlace from '~/components/Form/CultivationPlace';
import FormInput from '~/components/Form/FormInput';
import { nanoid } from '@reduxjs/toolkit';
import FadeInUp from '~/components/Animation/FadeInUp';
import SearchLeader from '~/components/Form/SearchLeader';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';
import _ from 'lodash';

const Step2 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { ctnId: ctnIdFromPageConfig, ctnName } = registerPage;
  const {
    fullName,
    phoneNumber,
    identityCard,
    religiousName = '',
    gender,
    email = '',

    permanentAddress,
    permanentProvince,
    permanentDistrict,
    permanentWard,

    temporaryAddress,
    temporaryProvince,
    temporaryDistrict,
    temporaryWard,

    ctnId = '',
    ctnGroupId,

    dateOfBirth,
    register,
  } = useAppSelector((state) => state.register.data) || {};

  const registerInfo = useAppSelector((state) => state.registerInfo.data);

  const [permanentAddressProvince, permanentAddressDistrict, permanentAddressWard] = [
    permanentAddress?.provinceId || permanentProvince?.id,
    permanentAddress?.districtId || permanentDistrict?.id,
    permanentAddress?.wardId || permanentWard?.id,
  ];

  const [temporaryAddressProvince, temporaryAddressDistrict, temporaryAddressWard] = [
    temporaryAddress?.provinceId || temporaryProvince?.id,
    temporaryAddress?.districtId || temporaryDistrict?.id,
    temporaryAddress?.wardId || temporaryWard?.id,
  ];

  const { date: dobDate, month: dobMonth, year: dobYear } = convertDateStringToObject(dateOfBirth);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      gender: (gender && gender + '') || Gender.MALE,

      religiousName,

      dob: { date: '', month: '', year: '' },
      dobDate,
      dobMonth,
      dobYear,

      email,

      permanentAddress,
      permanentAddressProvince,
      permanentAddressDistrict,
      permanentAddressWard,

      temporaryAddress,
      temporaryAddressProvince,
      temporaryAddressDistrict,
      temporaryAddressWard,
      ctnGroupId,
      ctnId: ctnId ? ctnId : ctnIdFromPageConfig,

      registerType:
        register?.registerType ||
        (registerInfo?.registerType && registerInfo.registerType + '') ||
        RegisterType.SINGLE,
      leaderId: register?.leaderId || registerInfo?.leaderId || '',
    },
    validationSchema: step2Schema(ctnId || ctnIdFromPageConfig),
    onSubmit: (values) => {
      const {
        gender,
        religiousName,
        dob,
        email,
        permanentAddress,
        temporaryAddress,
        ctnId,
        ctnGroupId,
        registerType,
      } = values;
      let { leaderId } = values;
      if (registerType === RegisterType.SINGLE) {
        leaderId = '';
      }
      const { year, month, date } = dob || {};
      const dateOfBirth = [year, month, date].join('-');
      dispatch(
        fillForm({
          gender,
          religiousName,
          email,
          // ctnId: ctnId_group || ctnId,
          ctnGroupId,
          ctnId,
          dateOfBirth,
          temporaryAddress,
          permanentAddress,
          register: { ...register, leaderId, registerType },
        }),
      );
      dispatch(
        fillDataPreview({
          gender,
          religiousName,
          email,
          dateOfBirth,

          ...(ctnId && { ctnId: ctnName }),
        }),
      );
      nextStep();
    },
  });

  const setDataPreview = (dataFillForm) => {
    dispatch(fillDataPreview(dataFillForm));
  };
  const setLeaderPreview = (leader) => {
    if (_.get(leader, 'success', false)) {
      dispatch(
        fillDataPreview({
          leader: _.get(leader, 'data', {}),
        }),
      );
    }
  };
  return (
    <FadeInUp delay={0}>
      <Stack spacing={4} mb={{ base: 2, lg: 4 }}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          textAlign='center'
        >
          Cập nhật thông tin
        </Heading>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent='center'
          spacing={{ lg: 16 }}
        >
          {[
            { title: 'Xin chào bạn', value: fullName },
            { title: 'Số điện thoại', value: phoneNumber },
            { title: 'CCCD', value: identityCard },
          ].map(({ title, value }) => (
            <Text key={nanoid()} color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              {title}: <Text as='b'>{value}</Text>
            </Text>
          ))}
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
                  <FormInput name='religiousName' label='Pháp danh' />
                  <DateOfBirth name='dob' label='Ngày sinh' isRequired />
                  <Box display={ctnIdFromPageConfig ? 'none' : 'block'}>
                    <CultivationPlace
                      ctnName='ctnId'
                      groupName='ctnGroupId'
                      setDataPreview={setDataPreview}
                      label='Địa điểm tu tập'
                      isRequired={!ctnIdFromPageConfig}
                    />
                  </Box>
                </Stack>
                <Stack spacing={3}>
                  <FormInput name='email' label='Email' isRequired />
                  <Address
                    setDataPreview={setDataPreview}
                    name='permanentAddress'
                    label='Địa chỉ thường trú'
                    isRequired
                  />
                  <Address
                    setDataPreview={setDataPreview}
                    name='temporaryAddress'
                    label='Địa chỉ tạm trú'
                    isRequired
                  />
                  <Radios label='Hình thức đăng ký' name='registerType'>
                    <Radio value={RegisterType.SINGLE}>Cá nhân</Radio>
                    <Radio value={RegisterType.GROUP}>Nhóm</Radio>
                  </Radios>
                  <SearchLeader
                    name='leaderId'
                    getLeader={(leader) => {
                      if (formik.values.registerType === RegisterType.GROUP) {
                        setLeaderPreview(leader);
                      }
                    }}
                    label='Trưởng nhóm'
                    registerTypeFieldName='registerType'
                  />
                </Stack>
              </SimpleGrid>
            </Stack>
            <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
              <Button
                colorScheme='gray'
                flexGrow={1}
                fontFamily={'heading'}
                onClick={() => previousStep()}
              >
                Trở về
              </Button>
              <Button flexGrow={1} type='submit' fontFamily={'heading'}>
                Tiếp theo
              </Button>
            </SimpleGrid>
          </Form>
        </FormikProvider>
      </Box>
    </FadeInUp>
  );
};

export default Step2;
