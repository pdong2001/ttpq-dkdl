import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { fillForm } from '~/slices/register';
import { fillDataPreview } from '~/slices/previewInfo';
import { searchMember } from '../../../slices/register';
import step1Schema from '../validationSchema/step1';
import FormInput from '~/components/Form/FormInput';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { HOME_WITH_SHORT_URI } from '~/routes';
import FadeInUp from '~/components/Animation/FadeInUp';
import { unwrapResult } from '@reduxjs/toolkit';
import { EventRegistryDto } from '~/dtos/EventRegistries/EventRegistryDto.model';
import { MemberDto } from '~/dtos/Members/MemberDto.model';
import publicRequest from '~/apis/common/axios';
import { formatUrl } from '~/utils/functions';
import API from '~/apis/constants';
import { useContext } from 'react';
import { MessageContext } from '~/providers/message';
import { getMemberAuth } from '~/slices/memberAuth';

const Step1 = (props: StepProps) => {
  const { nextStep } = props;
  const messageService = useContext(MessageContext);
  const dispatch = useAppDispatch();
  const { path } = useRouteMatch();
  const { shortUri } = useParams<any>();
  const history = useHistory();
  const isHomePage = path === HOME_WITH_SHORT_URI;

  const { event, eventId } = useAppSelector((state) => state.registerPage.data);

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
      dispatch(
        getMemberAuth({
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
                if (data.data) {
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
          handleNext();
        });
    },
  });

  const greatCeremony = event?.name || '';

  return (
    <FadeInUp>
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
    </FadeInUp>
  );
};

export default Step1;
