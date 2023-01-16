import { ArrowForwardIcon } from '@chakra-ui/icons';
import PTD_cover from '~/assets/cover/ptd-cover.jpeg';
import Tet_cover from '~/assets/cover/Tet-cover.jpg';
import cqhn_cover from '~/assets/cover/cqhn-cover.jpeg';
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
  Flex,
  Tooltip,
  useToast,
  Text,
  Link,
} from '@chakra-ui/react';
import { MdContentCopy, MdVerified } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { useAppSelector } from '~/hooks/reduxHook';

import { TableComponent, OtherInfo } from '~/components/Register';
import { REGISTER_INFO_TITLE } from '~/configs/register';

import * as htmlToImage from 'html-to-image';
import useAxios from '~/hooks/useAxios';
import API from '~/apis/constants';
import { useContext, useState } from 'react';
import { AuthContext } from '~/providers/auth';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { ADD_NEW_REGISTER_PATH } from '~/routes';
import { getImageSrc } from '~/utils/functions';
import { EventType } from '~/dtos/event/EventType.enum';

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
  const toast = useToast();
  const history = useHistory();
  const { shortUri } = useParams<any>();
  const { path } = useRouteMatch();
  const registerResult = useAppSelector((state) => state.register.data);
  const previewInfo = useAppSelector((state) => state.previewInfo.data);
  const { event, hotline = '0866.884.669' } = useAppSelector((state) => state.registerPage.data);
  const { member } = useContext(AuthContext);
  const [isDownloading, setDownloading] = useState(false);

  const { register } = member || {};
  const { type: eventType } = event || {};
  let cover;
  switch (eventType) {
    case EventType.DaiLe:
      cover = PTD_cover;
      break;
    case EventType.Tet:
      cover = Tet_cover;
      break;
    case EventType.CCHN:
      cover = cqhn_cover;
      break;
    default:
      cover = cqhn_cover;
  }
  const isRegisterPopup = path === ADD_NEW_REGISTER_PATH;
  const ctnId = registerResult.ctnId || member.ctnId;
  const { data: ctnName, cancel: ctnToken } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      params: { CTNGroupId: ctnId },
      transformResponse: ({ data }) => data?.find((ctn) => ctn.id === ctnId).name,
    },
    [ctnId],
  );
  if (!ctnId || previewInfo.ctnId) {
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
    LinkQrCode: `${PATH_URL}/register-info/${registerId}`,
    registerInfoPath: `/${shortUri}/register-info/${registerId}`,
    fullName: registerResult.fullName || member.fullName,
  };

  const { infosSuccess, LinkQrCode, avatar, fullName, registerInfoPath } = dataSuccess;

  const onImageDownload = async (fullName = '') => {
    toast({
      title: 'Đang tải xuống',
      description: 'Qúy phật tử vui lòng chờ trong giây lát!',
      status: 'success',
      duration: 10000,
      isClosable: true,
      // zIn
    });
    setDownloading(true);
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
    setDownloading(false);
    setTimeout(() => {
      toast.closeAll();
    }, 1000);
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
        <ModalBody px={0} background={'#FFFFFF'} position={'relative'}>
          {/* {isDownloading && DownloadingRender()} */}
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
                <Avatar size={['lg', 'xl']} src={getImageSrc(avatar)} backgroundColor={'#c7ced6'} />
              </Box>
            </Box>
            <Box px={5}>
              <Box textAlign={'center'}>
                <Heading fontSize={['lg', 'xl', 'xl']} fontFamily={'body'} mb={2}>
                  <Flex justify='center' gap={2}>
                    {member?.fullName || registerResult.fullName}{' '}
                    {register?.isArrived && (
                      <Tooltip hasArrow rounded='md' label='Đã về chùa'>
                        <span>
                          <MdVerified color='green' />
                        </span>
                      </Tooltip>
                    )}
                  </Flex>
                </Heading>
                {isRegisterPopup && (
                  <Heading mb={2} as='h5' fontSize={{ base: 'xs', sm: 'md', md: 'md' }}>
                    <Tag colorScheme={'green'} rounded='md'>
                      Cảm ơn huynh đệ đã đăng ký công quả. Ban nhân sự sẽ liên hệ huynh đệ trong
                      thời gian sớm nhất ạ
                    </Tag>
                  </Heading>
                )}
                {hotline && (
                  <Text bgColor={'pink.100'} rounded='md' mb={2}>
                    Mọi thắc mắc xin liên hệ: Ban Nhân Sự -
                    <Link
                      ms={'1'}
                      fontWeight={'bold'}
                      colorScheme={'green'}
                      href={`tel:${hotline}`}
                    >
                      {hotline}
                    </Link>
                  </Text>
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
                        subTitle: previewInfo.ctnId || ctnName,
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
          {isShowRegisterInfo && (
            <>
              <Button
                isLoading={isDownloading}
                disabled={isDownloading}
                variant='ghost'
                onClick={() => onImageDownload(fullName || '')}
                mr={3}
              >
                {isDownloading ? 'Đang tải xuống...' : 'Tải về máy'}
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
