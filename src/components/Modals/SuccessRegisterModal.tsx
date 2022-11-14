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
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Text,
  HStack,
  Tag,
  Divider,
} from '@chakra-ui/react';
import _ from 'lodash';
import { MdContentCopy, MdDepartureBoard, MdLocationCity } from 'react-icons/md';

import QRCode from 'react-qr-code';
import { useAppSelector } from '~/hooks/reduxHook';

export default function SuccessRegisterModal() {
  const registerInfo = useAppSelector((state) => state.registerInfo.data);
  const mapTitles = {
    hoTen: 'Họ Và Tên',
    soDienThoai: 'Số điện thoại',
    cccd: 'Căn cước công dân',
    diaDiemXuatPhat: 'Địa điểm xuất phát',
    thoiGianXuatPhat: 'Thời gian xuất phát',
    thoiGianTroVe: 'Thời gian trở về',
  };

  const dataSuccess = {
    infos: {
      soDienThoai: '0994324224',
      cccd: '001093442424',
      diaDiemXuatPhat: 'Bến xe buýt Trường ĐH Nông Lâm TP. HCM',
      thoiGianXuatPhat: '08:00 01-12-2022',
      thoiGianTroVe: '15:00 05-12-2022',
    },
    group: {
      cccdNhomTruong: '00109342343432',
      tenNhomTruong: 'Lương Thai Tam',
    },
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    hinhThucDangKy: '1',
    LinkQrCode: 'https://dangkydaile.vn/user/1',
    isOpen: true,
    hoTen: 'Đăng Duy Thanh',
  };

  const { infos, LinkQrCode, isOpen, avatar, hoTen, group } = dataSuccess;
  const { onClose } = useDisclosure();

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
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Đăng ký thành công</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <GridItem colSpan={{ base: 3, md: 5, lg: 4 }}>
            <Box textAlign={'center'}>
              <Avatar size={'2xl'} src={avatar} mb={4} pos={'relative'} />
              <Heading fontSize={'2xl'} fontFamily={'body'} mb={4}>
                {hoTen}
              </Heading>
              <TableContainer>
                <Table variant='simple' colorScheme={'gray'}>
                  <Tbody>
                    {_.map(infos, (info, key) => {
                      return (
                        <Tr>
                          <Td pr={0} pl={{ base: 5, sm: 7, md: 5 }}>
                            <Text as='b'>{mapTitles[key]}</Text>
                          </Td>
                          <Td pl={0} pr={{ base: 5, sm: 7, md: 5 }}>
                            {info}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              <Divider marginTop='5' />
              <Stack spacing='30px' textAlign={'left'} p={5}>
                <Box>
                  <HStack>
                    <MdLocationCity />
                    <Text as='b'>Tên nhóm trưởng</Text>
                  </HStack>
                  <Tag colorScheme={'pink'}>{group.tenNhomTruong}</Tag>
                </Box>
                <Box>
                  <HStack>
                    <MdDepartureBoard />
                    <Text as='b'>CCCD nhóm trưởng</Text>
                  </HStack>
                  <Box mt={1}>
                    <Tag colorScheme={'blue'}>{group.cccdNhomTruong}</Tag>
                  </Box>
                </Box>
              </Stack>
              <Box>
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
