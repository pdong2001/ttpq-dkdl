import { Box, Button, Heading, Image, Radio, Stack, Text } from '@chakra-ui/react';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { REGEX_PHONE } from '~/utils/common';
import Radios from '~/components/Form/Radios';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { fillForm } from '~/pages/MultiStepRegister/services/slice';
import SearchLeader from '~/components/Form/SearchLeader';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';
import { searchMember } from '../services';

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
    validationSchema: Yup.object({
      fullName: Yup.string().required('Xin hãy nhập họ và tên'),
      phoneNumber: Yup.string()
        .required('Xin hãy nhập số điện thoại')
        .matches(REGEX_PHONE, 'Số điện thoại không hợp lệ'),
      identityCard: Yup.string().required('Xin hãy nhập số CCCD / Hộ chiếu'),
      leaderId: Yup.string().when('registerType', {
        is: RegisterType.GROUP,
        then: Yup.string().required('Hãy tìm trưởng đoàn của bạn'),
        otherwise: Yup.string(),
      }),
    }),
    onSubmit: (values) => {
      console.log('input step 1', values);

      dispatch(fillForm(values));
      dispatch(
        searchMember({
          data: values,
        }),
      );
      nextStep();
    },
  });
  const greatCeremony = 'Đại lễ Thành Đạo 2022';
  const isRegisterFollowGroup = formik.values.registerType === RegisterType.GROUP;

  console.log('formiks', formik.errors, formik.values);

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
              <Image
                src={`${
                  import.meta.env.TTPQ_BASE_URL
                }/images?key=ImageUpload/temporary/avatar/MjAyMg/MTE/DucPhatngang.jpg&scale=500`}
              />
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
              <Radios isRequired label='Hình thức đăng ký' name='registerType'>
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
