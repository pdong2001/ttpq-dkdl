import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { fillForm, getExistMember, resetRegister } from '~/slices/register';
import { fillDataPreview } from '~/slices/previewInfo';
import step1Schema from '../validationSchema/step1';
import FormInput from '~/components/Form/FormInput';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { EDIT_REGISTER_PATH, HOME_WITH_SHORT_URI } from '~/routes';
import FadeInUp from '~/components/Animation/FadeInUp';
import { unwrapResult } from '@reduxjs/toolkit';
import publicRequest from '~/apis/common/axios';
import { alertUnsave, formatUrl } from '~/utils/functions';
import API from '~/apis/constants';
import { useContext } from 'react';
import { MessageContext } from '~/providers/message';

const Step1 = (props: StepProps) => {
  const { nextStep } = props;
  const messageService = useContext(MessageContext);
  const dispatch = useAppDispatch();
  const { path } = useRouteMatch();
  const { shortUri } = useParams<any>();
  const history = useHistory();
  const isHomePage = path === HOME_WITH_SHORT_URI;
  const isEditRegisterPage = path === EDIT_REGISTER_PATH;

  const { event, eventId } = useAppSelector((state) => state.registerPage.data);

  const {
    fullName = '',
    phoneNumber,
    identityCard,
    register,
    isChecked,
  } = useAppSelector((state) => state.register.data) || {};
  const registerInfo = useAppSelector((state) => state.registerInfo.data);

  const { member } = registerInfo || {};

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: fullName || member?.fullName,
      phoneNumber: phoneNumber || member?.phoneNumber,
      identityCard: identityCard || member?.identityCard,
    },
    validationSchema: step1Schema,
    onSubmit: (values) => {
      const { fullName, identityCard, /*registerType*/ phoneNumber } = values;
      const handleNext = () => {
        dispatch(
          fillDataPreview({
            fullName,
            identityCard,
            phoneNumber,
          }),
        );
        nextStep();
      };
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
      if (!isChecked) {
        dispatch(
          getExistMember({
            data: {
              phoneNumber,
              identityCard,
            },
          }),
        )
          .then(unwrapResult)
          .then(({ data }) => {
            const { member } = data || {};
            if (member?.id) {
              publicRequest
                .get(formatUrl(API.CHECK_EXIST_REGISTER, { eventId }), {
                  params: { memberId: member.id },
                })
                .then(({ data }) => {
                  if (data.data && !isEditRegisterPage) {
                    if (window) {
                      window.removeEventListener('beforeunload', alertUnsave);
                    }
                    messageService.add({
                      title: 'Bạn đã đăng ký lễ này rồi ạ',
                      status: 'error',
                    });
                    setTimeout(() => {
                      history.replace(`/${shortUri}/register-info/${data.data}`);
                      history.go(0);
                    }, 1000);
                  } else {
                    handleNext();
                  }
                })
                .catch(() => {
                  handleNext();
                });
            }
          })
          .catch(() => {
            dispatch(resetRegister({ fullName, identityCard, phoneNumber }));
            handleNext();
          });
      } else {
        handleNext();
      }
    },
  });

  const greatCeremony = event?.name || '';

  return (
    <>
      <Box>
        <Stack spacing={4}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: 'xl', sm: '2xl', md: '3xl' }}
            color='blue.500'
          >
            {`Đăng Ký Công Quả`}
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            {`${greatCeremony}`}
          </Text>
        </Stack>
        <Box mt={{ base: 4 }}>
          <FormikProvider value={formik}>
            <Form noValidate>
              <Stack spacing={4}>
                <FormInput
                  {...(isHomePage && { color: 'gray.500' })}
                  name='fullName'
                  label='Họ và tên'
                  isRequired
                />
                <FormInput
                  {...(isHomePage && { color: 'gray.500' })}
                  name='phoneNumber'
                  label='Số điện thoại'
                  isRequired
                  pattern='[0-9]*'
                  inputMode='numeric'
                />
                <FormInput
                  {...(isHomePage && { color: 'gray.500' })}
                  name='identityCard'
                  label='Số CCCD / Hộ chiếu'
                  isRequired
                  inputMode='numeric'
                  type='number'
                />
              </Stack>
              <Button type='submit' fontFamily={'heading'} mt={8} w={'full'}>
                Tiếp theo
              </Button>
            </Form>
          </FormikProvider>
        </Box>
      </Box>
    </>
  );
};

export default Step1;
