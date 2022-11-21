import { ArrowForwardIcon } from '@chakra-ui/icons';
import cover from '~/assets/cover.jpg';
import React, { useRef } from 'react'
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
  GridItem,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  Divider,
  Center,
} from '@chakra-ui/react';
import _ from 'lodash';
import { MdContentCopy } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { useAppSelector } from '~/hooks/reduxHook';

import { TableComponent, LeaderComponent, OtherInfo } from '~/components/Register';
import { mapSuccessData } from '~/components/Register/bindingData';
import { REGISTER_INFO_TITLE } from '~/configs/register';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as htmlToImage from 'html-to-image';


const PATH_URL = window.location.origin;

export default function SuccessRegisterModal() {

  const registerResult = useAppSelector((state) => state.register.data);
  const previewInfo = useAppSelector((state) => state.previewInfo.data);
  const { avatar, fullName, infos } = mapSuccessData(previewInfo);
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const dataSuccess = {
    infosSuccess: {
      phoneNumber: _.get(infos, 'phoneNumber', ''),
      identityCard: _.get(infos, 'identityCard', ''),
      email: _.get(infos, 'email', ''),
    },
    avatar: registerResult.avatarPath,
    LinkQrCode: `${PATH_URL}/register-info/${registerResult.register?.id}`,
    fullName: registerResult.fullName,
  };

  const { infosSuccess, LinkQrCode } = dataSuccess;

  const onImageDownload = async (fullName) => {
    function coverName(string) {
      return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const svg: any = document.getElementById('download-image');
    const dataUrl = await htmlToImage.toPng(svg);

    // download image
    const link = document.createElement('a');
    link.download = `${coverName(fullName)}_thong-tin-dang-ky.png`;
    link.href = dataUrl;
    link.click();
  };

  const copyLinkQR = () => {
    let eleAlert: any = document.getElementById('box-alert');
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
  const onClose = () => {
    setOpen(false);
    history.push('/');
    history.go(0);
  };
  return (
    <Modal isOpen={open} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>
          <Heading pt={0} as='h5' size='md'>
            Cảm ơn huynh đệ đã đăng ký!
          </Heading>
          {/* <Divider /> */}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody id='download-image' p={1} background={'#FFFFFF'}>
          <GridItem colSpan={{ base: 3, md: 5, lg: 4 }}>
            <Box>
              <Box position={'relative'} style={{ paddingBottom: 20 }}>
                <Box
                  backgroundImage={`url(${cover})`}
                  backgroundPosition={{ base: 'center' }}
                  backgroundRepeat='no-repeat'
                  backgroundSize='cover'
                  transitionDuration={'2s'}
                  width={'100%'}
                  height={'250px'}
                >
                </Box>
                <Box textAlign={'center'}>
                  <Avatar size={'2xl'} src={avatar} mb={4} position={'absolute'}
                    backgroundColor={'#c7ced6'}
                    style={{ bottom: 10, top: 160 }}
                    right={{ base: '33.5%', sm: '37%', }}
                  />
                </Box>
              </Box>
              <Box p={7}>
                <Box textAlign={'center'}>
                  <Heading fontSize={'2xl'} fontFamily={'body'} mb={4}>
                    {'Phạm văn duy'}
                  </Heading>
                  <Heading mb={3} as='h5' fontSize={{ base: 'xs', sm: 'md', md: 'lg' }} color={'red'}>
                    Dạ, sẽ có huynh đệ phụ trách liên hệ lại sau ạ!
                  </Heading>
                </Box>
                <Divider borderBottomWidth={'8px'} />
                <Box>
                  {TableComponent(infosSuccess, REGISTER_INFO_TITLE)}
                </Box>
                <Divider borderBottomWidth={'8px'} />
                <Box>
                  <Box w='60%' pt={3} float={'left'}>
                    {_.get(previewInfo, 'leader', false) ?
                      OtherInfo({ isLeader: true, title: _.get(previewInfo, 'leader.religiousName', ''), subTitle: _.get(previewInfo, 'leader.phoneNumber', '') }) :
                      OtherInfo({ isLeader: false, title: _.get(infos, 'religiousName'), subTitle: _.get(infos, 'organizationStructureId') })}
                  </Box>
                  <Box w='40%' pt={3} textAlign={'center'} float={'right'}>
                    <QRCode
                      id='QRCode'
                      size={256}
                      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                      value={LinkQrCode}
                      viewBox={`0 0 256 256`}
                    />
                  </Box>
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
          </GridItem>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={() => onImageDownload(fullName || '')} style={{ marginRight: 10 }}>
            Tải mã QR
          </Button>
          <Button
            colorScheme='yellow'
            onClick={() => {
              window.location.href = LinkQrCode;
            }}
          >
            Thông tin đăng ký
            <ArrowForwardIcon pl={1} />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
