import { Box, Button, Heading, Radio, Stack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { fillForm } from '~/slices/register';
import { fillDataPreview } from '~/slices/previewInfo';
import { searchMember } from '../../../slices/register';
import step1Schema from '../validationSchema/step1';
// import SearchLeader from '~/components/Form/SearchLeader';
import { RegisterType } from '~/dtos/Enums/RegisterType.enum';
import FormInput from '~/components/Form/FormInput';
import { useRouteMatch } from 'react-router-dom';
import { HOME_WITH_SHORT_URI } from '~/routes';
import FadeInUp from '~/components/Animation/FadeInUp';

const Step1 = (props: StepProps) => {
  const { nextStep } = props;
  const dispatch = useAppDispatch();
  const { path } = useRouteMatch();
  const isHomePage = path === HOME_WITH_SHORT_URI;

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
      // registerType:
      //   register?.registerType ||
      //   (registerInfo?.registerType && registerInfo.registerType + '') ||
      //   RegisterType.SINGLE,
      // leaderId: register?.leaderId || registerInfo?.leaderId || '',
    },
    validationSchema: step1Schema,
    onSubmit: (values) => {
      const { fullName, identityCard, /*registerType*/ phoneNumber } = values;
      // let { leaderId } = values;
      // if (registerType === RegisterType.SINGLE) {
      //   leaderId = '';
      // }
      dispatch(
        fillForm({
          fullName,
          identityCard,
          phoneNumber,
          register: {
            ...register,
            // registerType,
            // leaderId,
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

  // const setLeaderPreview = (leader) => {
  //   if (_.get(leader, 'success', false)) {
  //     dispatch(
  //       fillDataPreview({
  //         leader: _.get(leader, 'data', {}),
  //       }),
  //     );
  //   }
  // };
  // const { registerType: localRegisterType } = formik.values;

  const greatCeremony = 'Đại Lễ Phật Thành Đạo 2023';
  // const isRegisterFollowGroup = localRegisterType === RegisterType.GROUP;
  console.log('___', formik.values);

  return (
    <FadeInUp>
      <Stack spacing={4}>
        <Heading lineHeight={1.1} fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }} color='blue.300'>
          {`Đăng Ký Công Quả`}
        </Heading>
        <Text color={isHomePage ? 'blue.50' : 'gray.400'} fontSize={{ base: 'sm', sm: 'md' }}>
          {`${greatCeremony}`}
        </Text>
      </Stack>
      <Box mt={{ base: 4 }}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <FormInput
                {...(isHomePage && { color: 'white' })}
                name='fullName'
                label='Họ và tên'
                isRequired
              />
              <FormInput
                {...(isHomePage && { color: 'white' })}
                name='phoneNumber'
                label='Số điện thoại'
                isRequired
                pattern='[0-9]*'
                inputMode='numeric'
              />
              <FormInput
                {...(isHomePage && { color: 'white' })}
                name='identityCard'
                label='Số CCCD / Hộ chiếu'
                isRequired
                inputMode='numeric'
                type='number'
              />
              {/* <Radios
                {...(isHomePage && { color: 'white' })}
                label='Hình thức đăng ký'
                name='registerType'
              >
                <Radio value={RegisterType.SINGLE}>Cá nhân</Radio>
                <Radio value={RegisterType.GROUP}>Nhóm</Radio>
              </Radios> */}
              {/* {isRegisterFollowGroup && (
                <SearchLeader
                  {...(isHomePage && { color: 'white' })}
                  name='leaderId'
                  getLeader={(leader) => setLeaderPreview(leader)}
                  label='Trưởng nhóm'
                />
              )} */}
            </Stack>
            <Button type='submit' fontFamily={'heading'} mt={8} w={'full'}>
              Tiếp theo
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </FadeInUp>
  );
};

export default Step1;
