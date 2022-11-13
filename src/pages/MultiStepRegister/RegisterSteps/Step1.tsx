import { Box, Button, Heading, Radio, Stack, Text } from '@chakra-ui/react';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { fillForm } from '~/pages/MultiStepRegister/services/slice';
import SearchLeader from '~/components/Form/SearchLeader';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';
import { searchMember } from '../services';
import step1Schema from '../validationSchema/step1';

const Step1 = (props: StepProps) => {
  const { nextStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const {
    fullName,
    phoneNumber,
    identityCard,
    register: { registerType, leaderId = '' },
  } = useAppSelector((state) => state.register.data) || {};

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName,
      phoneNumber,
      identityCard,
      registerType,
      leaderId,
    },
    validationSchema: step1Schema,
    onSubmit: (values) => {
      let { fullName, identityCard, registerType, leaderId, phoneNumber } = values;
      if (registerType === RegisterType.SINGLE) {
        leaderId = '';
      }
      dispatch(
        fillForm({
          fullName,
          identityCard,
          phoneNumber,
          register: {
            registerType,
            leaderId,
          },
        }),
      );
      dispatch(
        searchMember({
          data: {
            phoneNumber,
            identityCard,
          },
        }),
      );
      nextStep();
    },
  });
  const { registerType: localRegisterType } = formik.values;

  const greatCeremony = 'Đại lễ Thành Đạo 2022';
  const isRegisterFollowGroup = localRegisterType === RegisterType.GROUP;
  // console.log('formiks', formik.errors, formik.values);

  return (
    <>
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          {`Đăng Ký Công Quả`}
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          {`${greatCeremony} PL.2565 - DL.2022`}
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <FloatingLabel name='fullName' label='Họ và tên' color={formTextColor} isRequired />
              <FloatingLabel
                name='phoneNumber'
                label='Số điện thoại'
                color={formTextColor}
                isRequired
              />
              <FloatingLabel
                name='identityCard'
                label='Số CCCD / Hộ chiếu'
                color={formTextColor}
                isRequired
              />
              <Radios label='Hình thức đăng ký' name='registerType'>
                <Radio value={RegisterType.SINGLE}>Cá nhân</Radio>
                <Radio value={RegisterType.GROUP}>Nhóm</Radio>
              </Radios>
              {isRegisterFollowGroup && <SearchLeader name='leaderId' label='Trưởng nhóm' />}
            </Stack>
            <Button type='submit' fontFamily={'heading'} mt={8} w={'full'}>
              Tiếp theo
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
};

export default Step1;
