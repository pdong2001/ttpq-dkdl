import {
  Stack,
  Heading,
  Button,
  Box,
  SimpleGrid,
  Avatar,
  GridItem,
  Alert,
  Text,
  Tag,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import _ from 'lodash';
import { StepProps } from '..';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { register, updateMember, updateRegister } from '~/slices/register';
import { unwrapResult } from '@reduxjs/toolkit';
import { TableComponent, LeaderComponent } from '~/components/Register';
import { mapSuccessData } from '~/components/Register/bindingData';
import { REGISTER_INFO_TITLE } from '~/configs/register';
import { CalendarIcon, HamburgerIcon, StarIcon } from '@chakra-ui/icons';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { ADD_NEW_REGISTER_PATH } from '~/routes';
import { formatUrl, getImageSrc } from '~/utils/functions';
import API from '~/apis/constants';
import { useContext, useRef, useState } from 'react';
import { MessageContext } from '~/providers/message';
import SuccessRegisterModal from '~/components/Modals/SuccessRegisterModal';
import FadeInUp from '~/components/Animation/FadeInUp';
import { CertificateRegistry } from '~/dtos/Enums/CertificateRegistry.enum';
import { HashLink } from 'react-router-hash-link';
import { BiUser, BiUserCircle } from 'react-icons/bi';

const Step6 = (props: StepProps) => {
  const { previousStep, nextStep } = props;
  const [openSuccess, setOpenSuccess] = useState(false);
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.register.data);
  const previewInfo = useAppSelector((state) => state.previewInfo.data);
  const registerInfo = useAppSelector((state) => state.registerInfo.data);
  const { receiveVolunteeCert } = useAppSelector((state) => state.registerPage.data);
  const { path } = useRouteMatch();
  const isAddNew = path === ADD_NEW_REGISTER_PATH;
  const messageService = useContext(MessageContext);
  const history = useHistory();
  const { shortUri } = useParams<any>();
  const { id, memberId } = registerInfo;
  const submitButtonRef = useRef<any>();
  const { register: registerData } = formData;

  const handleRegister = () => {
    if (isAddNew) {
      dispatch(
        register({
          data: formData,
        }),
      )
        .then(unwrapResult)
        .then(() => {
          setOpenSuccess(true);
        })
        .catch((e) => {
          messageService.add({ description: e.message || 'Dạ có lỗi xảy ra ạ', status: 'error' });
        });
    } else {
      const updateRegisterInfo = dispatch(
        updateRegister({
          url: formatUrl(API.UPDATE_REGISTER, { id }),
          data: {
            ...registerData,
          },
        }),
      );

      const updateMemberInfo = dispatch(
        updateMember({
          url: formatUrl(API.UPDATE_MEMBER, { id: memberId }),
          data: {
            ..._.omit(formData, ['register']),
          },
        }),
      );

      Promise.all([updateRegisterInfo, updateMemberInfo])
        .then((result) => result.map(unwrapResult))
        .then(([{ data: register, code: registerCode }, { data: member, code: memberCode }]) => {
          if (registerCode >= 400) {
            return Promise.reject(register);
          }
          if (memberCode >= 400) {
            return Promise.reject(member);
          }
          messageService.add({ title: 'Cập nhật thành công', status: 'success' });
          setTimeout(() => {
            history.replace(`/${shortUri}/register-info/${register?.id}`);
            history.go(0);
          }, 1000);
        })
        .catch((e) => {
          messageService.add({ description: e.message || 'Dạ có lỗi xảy ra ạ', status: 'error' });
        });
    }
  };

  const { infos, schedules, jobs, avatar, fullName, certRegistry } = mapSuccessData(previewInfo);

  return (
    <FadeInUp delay={0}>
      <Stack spacing={4}>
        <Box textAlign={'center'}>
          <Heading
            color={primaryColor}
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            textTransform='uppercase'
          >
            {`Xác nhận ${isAddNew ? 'thông tin' : 'chỉnh sửa'}`}
          </Heading>
          <Box mt={3}>
            <Text>
              Huynh đệ vui lòng <Tag colorScheme={'green'}>KIỂM TRA</Tag> lại thông tin và{' '}
              <Tag colorScheme={'red'}>NHẤN</Tag> nút{' '}
              <Tag cursor={'pointer'} onClick={() => submitButtonRef.current?.focus?.()}>
                {isAddNew ? 'Đăng ký' : 'Cập nhật'}
              </Tag>{' '}
              bên dưới để hoàn tất thủ tục đăng ký
            </Text>
          </Box>
        </Box>
        <GridItem>
          <Box>
            <Box textAlign={'center'}>
              <Avatar size={'2xl'} src={getImageSrc(avatar)} mb={4} pos={'relative'} />
              <Heading fontSize={'2xl'} fontFamily={'body'} mb={4}>
                {fullName}
              </Heading>
            </Box>
            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem>
                <AccordionButton p={0}>
                  <Alert status='error'>
                    <BiUser />
                    <Heading p={2} as='h5' size='md'>
                      Thông tin cá nhân
                    </Heading>
                  </Alert>
                </AccordionButton>
                <AccordionPanel>
                  <Box>{TableComponent(infos, REGISTER_INFO_TITLE)}</Box>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton p={0}>
                  <Alert status='success'>
                    <CalendarIcon />
                    <Heading p={2} as='h5' size='md'>
                      Lịch trình
                    </Heading>
                  </Alert>
                </AccordionButton>
                <AccordionPanel>
                  {TableComponent(
                    _.get(schedules.go, _.get(previewInfo, 'moveType', 0)),
                    REGISTER_INFO_TITLE,
                  )}
                  {TableComponent(
                    _.get(schedules.return, _.get(previewInfo, 'returnMoveType', 0)),
                    REGISTER_INFO_TITLE,
                  )}
                  {TableComponent(
                    { registeredDays: schedules.registeredDays },
                    REGISTER_INFO_TITLE,
                  )}
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton p={0}>
                  <Alert status='warning'>
                    <HamburgerIcon />
                    <Heading p={2} as='h5' size='md'>
                      Công việc
                    </Heading>
                  </Alert>
                </AccordionButton>
                <AccordionPanel>{TableComponent(jobs, REGISTER_INFO_TITLE)}</AccordionPanel>
              </AccordionItem>

              {receiveVolunteeCert && (
                <Box>
                  <Alert status='success'>
                    <StarIcon />
                    <Heading p={2} as='h5' size='md'>
                      Chứng nhận tình nguyện viên
                    </Heading>
                  </Alert>
                  {TableComponent(
                    _.get(
                      certRegistry,
                      CertificateRegistry.toEnum(_.get(previewInfo, 'certificateRegistry')),
                    ),
                    REGISTER_INFO_TITLE,
                  )}
                </Box>
              )}

              {_.get(previewInfo, 'leader', null) && LeaderComponent(_.get(previewInfo, 'leader'))}
            </Accordion>
          </Box>
        </GridItem>
      </Stack>
      <Box mt={10}>
        <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
          <Button
            colorScheme='gray'
            flexGrow={1}
            fontFamily={'heading'}
            onClick={() => {
              if (receiveVolunteeCert) {
                previousStep();
              } else {
                previousStep(4);
              }
            }}
          >
            Trở về
          </Button>
          <Button
            ref={submitButtonRef}
            flexGrow={1}
            fontFamily={'heading'}
            onClick={handleRegister}
          >
            {isAddNew ? 'Đăng ký' : 'Cập nhật'}
          </Button>
        </SimpleGrid>
      </Box>
      <SuccessRegisterModal
        open={openSuccess}
        onClose={() => {
          history.push(`/${shortUri}`);
          history.go(0);
        }}
        title='Đăng ký thành công'
        isSuccessPopup
      />
    </FadeInUp>
  );
};

export default Step6;
