import { Box, Button, Heading, Radio, Stack, Text } from '@chakra-ui/react';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import useCustomColorMode from '~/hooks/useColorMode';
import _ from 'lodash';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { fillForm } from '~/slices/register';
import { fillDataPreview } from '~/slices/previewInfo';
import { searchMember } from '../../../slices/register';
import step1Schema from '../validationSchema/step1';
import SearchLeader from '~/components/Form/SearchLeader';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';

const Step1 = (props: StepProps) => {
  const { nextStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const {
    fullName = '',
    phoneNumber,
    identityCard,
    register,
  } = useAppSelector((state) => state.register.data) || {};

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName,
      phoneNumber,
      identityCard,
      registerType: register.registerType || RegisterType.SINGLE,
      leaderId: register.leaderId || '',
    },
    validationSchema: step1Schema,
    onSubmit: (values) => {
      let { fullName, identityCard, registerType, leaderId, phoneNumber } = values;
      if (registerType === RegisterType.SINGLE) {
        leaderId = '';
      }
      let dataFillForm = {
        fullName,
        identityCard,
        phoneNumber,
        register: {
          ...register,
          registerType,
          leaderId,
        },
      }
      dispatch(
        fillForm(dataFillForm),
      );
      dispatch(
        searchMember({
          data: {
            phoneNumber,
            identityCard,
          },
        }),
      );
      dispatch(fillDataPreview(dataFillForm));
      nextStep();
    },
  });

  const setLeaderPreview = (dataLeader) => {
    if (_.get(dataLeader, 'success', false)) {
      dispatch(fillDataPreview({dataLeader}));
    }
  }
  const { registerType: localRegisterType } = formik.values;

  const greatCeremony = 'Đại lễ Thành Đạo 2022';
  const isRegisterFollowGroup = localRegisterType === RegisterType.GROUP;

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
      <Box mt={{ base: 4, sm: 10 }}>
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
              {isRegisterFollowGroup && <SearchLeader name='leaderId' getLeader={setLeaderPreview} label='Trưởng nhóm' />}
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
