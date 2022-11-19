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
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const {
    fullName = '',
    phoneNumber,
    identityCard,
    register,
  } = useAppSelector((state) => state.register.data) || {};
  const registerInfo = useAppSelector((state) => state.registerInfo.data);

  const { member } = registerInfo || {};

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: fullName || member?.fullName,
      phoneNumber: phoneNumber || member?.phoneNumber,
      identityCard: identityCard || member?.identityCard,
      registerType:
        register?.registerType ||
        (registerInfo?.registerType && registerInfo.registerType + '') ||
        RegisterType.SINGLE,
      leaderId: register?.leaderId || registerInfo?.leaderId || '',
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
            ...register,
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
      dispatch(
        fillDataPreview({
          fullName,
          identityCard,
          phoneNumber,
        }),
      );
      nextStep();
    },
  });

  const setLeaderPreview = (leader) => {
    if (_.get(leader, 'success', false)) {
      dispatch(
        fillDataPreview({
          leader: _.get(leader, 'data', {}),
        }),
      );
    }
  };
  const { registerType: localRegisterType } = formik.values;

  const greatCeremony = 'Đại lễ Thành Đạo 2022';
  const isRegisterFollowGroup = localRegisterType === RegisterType.GROUP;

  console.log('___', formik.values);

  return (
    <>
      <Stack spacing={4}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }} color='blue.500'>
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
              <FloatingLabel name='fullName' label='Họ và tên' isRequired />
              <FloatingLabel name='phoneNumber' label='Số điện thoại' isRequired />
              <FloatingLabel name='identityCard' label='Số CCCD / Hộ chiếu' isRequired />
              <Radios label='Hình thức đăng ký' name='registerType'>
                <Radio value={RegisterType.SINGLE}>Cá nhân</Radio>
                <Radio value={RegisterType.GROUP}>Nhóm</Radio>
              </Radios>
              {isRegisterFollowGroup && (
                <SearchLeader
                  name='leaderId'
                  getLeader={(leader) => setLeaderPreview(leader)}
                  label='Trưởng nhóm'
                />
              )}
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
