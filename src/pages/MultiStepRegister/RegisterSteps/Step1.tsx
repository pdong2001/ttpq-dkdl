import { Box, Button, Heading, Radio, Stack, Text } from '@chakra-ui/react';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { REGEX_PHONE } from '~/utils/common';
import Radios from '~/components/Form/Radios';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { fillForm } from '~/pages/MultiStepRegister/redux/slice';

const Step1 = (props: StepProps) => {
  const { nextStep } = props;
  const dispatch = useAppDispatch();
  const { name, phone, citizenId, registerType } =
    useAppSelector((state) => state.register.data) || {};
  const { bgColor, primaryColor, formTextColor } = useCustomColorMode();
  const formik = useFormik({
    initialValues: {
      name,
      phone,
      citizenId,
      registerType: registerType || '0',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Xin hãy nhập họ và tên'),
      phone: Yup.string()
        .required('Xin hãy nhập số điện thoại')
        .matches(REGEX_PHONE, 'Số điện thoại không hợp lệ'),
      citizenId: Yup.string().required('Xin hãy nhập số CCCD / Hộ chiếu'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      dispatch(fillForm(values));
      nextStep();
    },
  });
  const greatCeremony = 'Đại lễ Thành Đạo 2022';

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
              <FloatingLabel name='name' label='Họ và tên' color={formTextColor} isRequired />
              <FloatingLabel name='phone' label='Số điện thoại' color={formTextColor} isRequired />
              <FloatingLabel
                name='citizenId'
                label='Số CCCD / Hộ chiếu'
                color={formTextColor}
                isRequired
              />
              <Radios isRequired label='Hình thức đăng ký' name='registerType'>
                <Radio value='0'>Cá nhân</Radio>
                <Radio value='1'>Nhóm</Radio>
              </Radios>
            </Stack>

            <Button type='submit' fontFamily={'heading'} mt={8} w={'full'}>
              Tiếp theo
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </Stack>
  );
};

export default Step1;
