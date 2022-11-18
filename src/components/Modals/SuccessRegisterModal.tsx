import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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
} from '@chakra-ui/react';
import _ from 'lodash';
import { MdContentCopy } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { useAppSelector } from '~/hooks/reduxHook';

import { TableComponent, LeaderComponent } from '~/components/Register';
import { mapSuccessData } from '~/components/Register/bindingData';
import { REGISTER_INFO_TITLE } from '~/configs/register';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    LinkQrCode: `${PATH_URL}/register-info/${registerResult.register.id}`,
    fullName: registerResult.fullName,
  };

  const { infosSuccess, LinkQrCode } = dataSuccess;

  const onImageDownload = () => {
    const svg: any = document.getElementById('QRCode');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'QRCode';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
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
        <ModalHeader>
          <Heading mb={3} as='h5' size='md'>
            Cảm ơn huynh đệ đã đăng ký!
          </Heading>
          <Heading mb={3} as='h5' size='sm'>
            Dạ, sẽ có huynh đệ phụ trách liên hệ lại sau ạ!
          </Heading>
          <Divider />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GridItem colSpan={{ base: 3, md: 5, lg: 4 }}>
            <Box textAlign={'center'}>
              <Avatar size={'2xl'} src={avatar} mb={4} pos={'relative'} />
              <Heading fontSize={'2xl'} fontFamily={'body'} mb={4}>
                {fullName}
              </Heading>
              <Box>{TableComponent(infosSuccess, REGISTER_INFO_TITLE)}</Box>
              {_.get(previewInfo, 'leader', null) && LeaderComponent(_.get(previewInfo, 'leader'))}
              <Box>
                <Divider />
                <Box w='100%' p={3} textAlign={'center'}>
                  <QRCode
                    id='QRCode'
                    size={256}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={LinkQrCode}
                    viewBox={`0 0 256 256`}
                  />
                </Box>
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
                <Box id='box-alert' style={{ display: 'none' }}>
                  <Alert status='success'>
                    <AlertIcon />
                    <Box>
                      <AlertDescription>Coppied</AlertDescription>
                    </Box>
                  </Alert>
                </Box>
              </Box>
            </Box>
          </GridItem>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={onImageDownload} style={{ marginRight: 10 }}>
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
