import { ArrowForwardIcon } from '@chakra-ui/icons';
import cover from '~/assets/cover/ptd-cover.jpeg';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  Avatar,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Divider,
  Tag,
  HStack,
} from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { useAppSelector } from '~/hooks/reduxHook';

import { TableComponent, OtherInfo } from '~/components/Register';
import { REGISTER_INFO_TITLE } from '~/configs/register';

import * as htmlToImage from 'html-to-image';
import useAxios from '~/hooks/useAxios';
import API from '~/apis/constants';
import { useContext } from 'react';
import { AuthContext } from '~/providers/auth';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { EDIT_REGISTER_PATH } from '~/routes';

const PATH_URL = window.location.origin;

export default function SuccessRegisterModal({
  open,
  onClose,
  title,
  isCentered,
  isSuccessPopup,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  isCentered?: boolean;
  isSuccessPopup?: boolean;
}) {
  const history = useHistory();
  const { shortUri } = useParams<any>();
  const { path } = useRouteMatch();
  const registerResult = useAppSelector((state) => state.register.data);
  const previewInfo = useAppSelector((state) => state.previewInfo.data);
  const { member } = useContext(AuthContext);
  const { register } = member || {};
  const isRegisterPopup = path === EDIT_REGISTER_PATH;
  const organizationStructureId =
    registerResult.organizationStructureId || member.organizationStructureId;
  const { data: ctnName, cancel: ctnToken } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      params: { CTNGroupId: organizationStructureId },
      transformResponse: ({ data }) => data?.find((ctn) => ctn.id === organizationStructureId).name,
    },
    [organizationStructureId],
  );
  if (!organizationStructureId || previewInfo.organizationStructureId) {
    ctnToken.cancel();
  }
  const registerId = registerResult.register?.id || member.register?.id;
  // const { avatar, fullName, infos } = mapSuccessData(previewInfo);
  const dataSuccess = {
    infosSuccess: {
      phoneNumber: registerResult?.phoneNumber || member.phoneNumber,
      identityCard: registerResult?.identityCard || member.identityCard,
      email: registerResult?.email || member.email,
    },
    avatar: registerResult.avatarPath || member.avatarPath,
    LinkQrCode: `${PATH_URL}/${shortUri}/register-info/${registerId}`,
    registerInfoPath: `/${shortUri}/register-info/${registerId}`,
    fullName: registerResult.fullName || member.fullName,
  };

  const { infosSuccess, LinkQrCode, avatar, fullName, registerInfoPath } = dataSuccess;

  const onImageDownload = async (fullName) => {
    function coverName(string) {
      return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    const svg: any = document.getElementById('chakra-modal-download-image');
    const dataUrl = await htmlToImage.toPng(svg);

    // download image
    const link = document.createElement('a');
    link.download = `${coverName(fullName)}_thong-tin-dang-ky.png`;
    link.href = dataUrl;
    link.click();
  };

  const copyLinkQR = () => {
    const eleAlert: any = document.getElementById('box-alert');
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(LinkQrCode);
    } else {
      document.execCommand('copy', true, LinkQrCode);
    }
    eleAlert.style.display = 'block';
    setTimeout(() => {
      eleAlert.style.display = 'none';
    }, 1000);
  };

  const isShowRegisterInfo = register || isSuccessPopup;

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={open}
      onClose={onClose}
      size={['sm', 'md', 'lg']}
      id='download-image'
      isCentered={isCentered}
    >
      <ModalOverlay />
      <ModalContent fontSize={['sm']} my={0}>
        <ModalHeader textAlign={'center'}>
          <Heading pt={0} as='h5' size='sx'>
            {title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={0} background={'#FFFFFF'}>
          {/* <GridItem colSpan={{ base: 3, md: 5, lg: 4 }}> */}
          <Stack>
            <Box position={'relative'} pb={[8, 12]}>
              <Box
                backgroundImage={`url(${cover})`}
                backgroundPosition={{ base: 'center' }}
                backgroundRepeat='no-repeat'
                backgroundSize='cover'
                transitionDuration={'2s'}
                width={'100%'}
                height={['140px', '160px', '180px']}
              ></Box>
              <Box
                textAlign='center'
                position='absolute'
                transform='translate(-50%, -50%)'
                left='50%'
              >
                <Avatar size={['lg', 'xl']} src={avatar} backgroundColor={'#c7ced6'} />
              </Box>
            </Box>
            <Box px={5}>
              <Box textAlign={'center'}>
                <Heading fontSize={['lg', 'xl', 'xl']} fontFamily={'body'} mb={2}>
                  {fullName}
                </Heading>
                {isRegisterPopup && (
                  <Heading
                    mb={2}
                    as='h5'
                    fontSize={{ base: 'xs', sm: 'md', md: 'md' }}
                    color={'red'}
                  >
                    <Tag>Dạ, sẽ có huynh đệ phụ trách liên hệ lại sau ạ</Tag>
                  </Heading>
                )}
              </Box>
              <Divider borderBottomWidth={'2px'} />
              <Box overflowY='scroll'>
                <Box>{TableComponent(infosSuccess, REGISTER_INFO_TITLE)}</Box>
                <Divider borderBottomWidth={'2px'} />
                <Box>
                  <HStack>
                    <Box w={isShowRegisterInfo ? '70%' : '100%'} pt={3}>
                      {OtherInfo({
                        isLeader: false,
                        title: registerResult?.religiousName || member.religiousName,
                        subTitle: previewInfo.organizationStructureId || ctnName,
                      })}
                    </Box>
                    {isShowRegisterInfo && (
                      <Box w='30%' pt={3} textAlign='center'>
                        <QRCode
                          id='QRCode'
                          size={256}
                          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                          value={LinkQrCode}
                          viewBox={`0 0 256 256`}
                        />
                      </Box>
                    )}
                  </HStack>
                  {isShowRegisterInfo && (
                    <Box w='100%' pt={3} textAlign={'center'} float={'right'}>
                      <Stack pt={1} textAlign={'center'} spacing={2} direction='column'>
                        <InputGroup size='md'>
                          <Input
                            colorScheme={'red'}
                            isReadOnly={true}
                            variant='filled'
                            pr='2.5rem'
                            type='text'
                            value={LinkQrCode}
                          />
                          <InputRightElement width='2.5rem'>
                            <IconButton
                              onClick={copyLinkQR}
                              size='sm'
                              aria-label='Copy Link'
                              icon={<MdContentCopy />}
                            />
                          </InputRightElement>
                        </InputGroup>
                      </Stack>
                    </Box>
                  )}
                  <Box id='box-alert' style={{ display: 'none' }}>
                    <Alert status='success' style={{ borderRadius: 4 }}>
                      <AlertIcon />
                      <Box>
                        <AlertDescription>Coppied</AlertDescription>
                      </Box>
                    </Alert>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
          {/* </GridItem> */}
        </ModalBody>

        <ModalFooter>
          {(register || isRegisterPopup) && (
            <>
              <Button variant='ghost' onClick={() => onImageDownload(fullName || '')} mr={3}>
                Lưu về máy
              </Button>
              <Button
                colorScheme='yellow'
                onClick={() => {
                  // historyLinkQrCode;
                  history.replace(registerInfoPath);
                }}
              >
                Thông tin đăng ký
                <ArrowForwardIcon pl={1} />
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
