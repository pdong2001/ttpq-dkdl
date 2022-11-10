import { Box, Button, Heading, Radio, Stack, Text } from '@chakra-ui/react';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { REGEX_PHONE } from '~/utils/common';
import Radios from '~/components/Form/Radios';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { fillForm } from '~/pages/MultiStepRegister/services/slice';
import { MemberResponseDto } from '~/types/Members/MemberResponse.dto';
import { searchMember } from '~/pages/MultiStepRegister/services';

const Step1 = (props: StepProps) => {
  const { nextStep } = props;
  const dispatch = useAppDispatch();
  // const { name, phone, citizenId, registerType } =
  //   useAppSelector((state) => state.register.data) || {};
  const { primaryColor, formTextColor } = useCustomColorMode();
  const {
    hoTen = '',
    soDienThoai = '',
    cccd = '',
    hinhThucDangKy = '0',
  } = useAppSelector((state) => state.register.data) || {};
  const formik = useFormik({
    initialValues: {
      hoTen,
      soDienThoai,
      cccd,
      hinhThucDangKy,
    } as MemberResponseDto,
    validationSchema: Yup.object({
      hoTen: Yup.string().required('Xin hãy nhập họ và tên'),
      soDienThoai: Yup.string()
        .required('Xin hãy nhập số điện thoại')
        .matches(REGEX_PHONE, 'Số điện thoại không hợp lệ'),
      cccd: Yup.string().required('Xin hãy nhập số CCCD / Hộ chiếu'),
    }),
    onSubmit: (values) => {
      dispatch(fillForm(values));
      dispatch(
        searchMember({ hoTen: values.hoTen, soDienThoai: values.soDienThoai, cccd: values.cccd }),
      ); /**/
      nextStep();
    },
  });
  const greatCeremony = 'Đại lễ Thành Đạo 2022';

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
              <FloatingLabel name='hoTen' label='Họ và tên' color={formTextColor} isRequired />
              <FloatingLabel
                name='soDienThoai'
                label='Số điện thoại'
                color={formTextColor}
                isRequired
              />
              <FloatingLabel
                name='cccd'
                label='Số CCCD / Hộ chiếu'
                color={formTextColor}
                isRequired
              />
              <Radios isRequired label='Hình thức đăng ký' name='hinhThucDangKy'>
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
    </>
  );
};

export default Step1;
