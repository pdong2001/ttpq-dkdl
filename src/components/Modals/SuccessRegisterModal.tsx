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
} from "@chakra-ui/react";

import QRCode from "react-qr-code";


export default function SuccessRegisterModal({ LinkQrCode = 'https://dangkydaile.vn/user/1', isOpen = true }) {
  const { onClose } = useDisclosure();

  const onImageDownload = () => {
    const svg: any = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };


  const copyLinkQR = () => {
    let eleAlert: any = document.getElementById('box-alert');
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(LinkQrCode);
    } else {
      document.execCommand("copy", true, LinkQrCode);
    }
    eleAlert.style.display = 'block';
    setTimeout(() => {
      eleAlert.style.display = 'none';
    }, 1000);
  }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đăng ký thành công</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p='6'>
              <Box display='flex' alignItems='baseline'>
                <QRCode
                  id="QRCode"
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={LinkQrCode}
                  viewBox={`0 0 256 256`}
                />
              </Box>
              <Box display='flex' style={{ marginTop: 10 }} alignItems='baseline'>
                <Input value={LinkQrCode} disabled variant='filled' placeholder='Filled' />
                <Button colorScheme='grey' onClick={copyLinkQR} variant='outline'>Copy</Button>
              </Box>
              <Box id='box-alert' style={{ display: 'none' }}>
                <Alert status='success'>
                  <AlertIcon />
                  <Box>
                    <AlertDescription>
                      Coppied
                    </AlertDescription>
                  </Box>
                </Alert>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onImageDownload} style={{ marginRight: 10 }}>Tải mã QR</Button>
            <Button colorScheme="yellow" mr={3} onClick={onClose}>
              Thông tin đăng ký
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}